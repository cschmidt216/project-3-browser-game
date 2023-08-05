import React, { useState, useContext, useEffect } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { AuthContext } from '../utils/authContext';
import BattleCard from '../components/battleCard';
import { Button, Feed } from 'semantic-ui-react';
import { handleAttack, applyStatBoosts } from '../utils/gameLogic';


function Home() {
  const { user, selectedCharacter } = useContext(AuthContext);

  const { loading, error, data, refetch } = useQuery(GET_CHARACTER, {
    variables: { characterId: selectedCharacter },
    skip: !selectedCharacter
  });

  const [getRandomOpponent, { called: opponentCalled, loading: opponentLoading, data: opponentData }] = useLazyQuery(FIND_RANDOM_OPPONENT, {
    fetchPolicy: 'network-only'
  });

  const [userCharacter, setUserCharacter] = useState();
  const [opponentCharacter, setOpponentCharacter] = useState();
  const [gameMessages, setGameMessages] = useState([]);
  const [userCanAct, setUserCanAct] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState();

  useEffect(() => {
    if (user) {
      setWelcomeMessage(`Welcome, ${user.username}!`);
    } else {
      setWelcomeMessage(null); 
    }
  }, [user]);

  useEffect(() => {
    if (data?.getCharacterById) {
      const characterWithBoosts = applyStatBoosts(data.getCharacterById);
      setUserCharacter(characterWithBoosts);
    }
  }, [data]);
  
  useEffect(() => {
    if (opponentData?.findRandomOpponent) {
      const opponentWithBoosts = applyStatBoosts(opponentData.findRandomOpponent);
      setOpponentCharacter(opponentWithBoosts);
    }
  }, [opponentData]);

  const handleOpponentAttack = (move) => {
    handleAttack(
      opponentCharacter,
      userCharacter,
      setOpponentCharacter,
      setUserCharacter,
      move,
      setGameMessages,
      () => {},
      null 
    );
    setUserCanAct(true);
  };
  
  const [gameReset, setGameReset] = useState(false);

  // Reset function
  const resetGame = async () => {
    console.log('Reset game called');
    setUserCharacter(null);
    setOpponentCharacter(null);
    setGameMessages([]);
    setUserCanAct(false); // Reset userCanAct
    setGameReset(true);
    if (refetch) {
      try {
        const { data } = await refetch();
        if (data?.getCharacterById) {
          const characterWithBoosts = applyStatBoosts(data.getCharacterById);
          setUserCharacter(characterWithBoosts);
          setGameReset(false);
        }
      } catch (error) {
        console.error("Error in refetching data: ", error);
      }
    }
  };
  

  
  const handleUserAttack = (move) => {
    if (userCanAct) {
      handleAttack(
        userCharacter, 
        opponentCharacter,
        setUserCharacter, 
        setOpponentCharacter, 
        move, 
        setGameMessages, 
        handleOpponentAttack,
        resetGame 
      );
      setUserCanAct(false);
    }
  };

const renderContent = () => {
  if (!user) {
    return <p>Please log in or sign up to continue.</p>;
  }

  if (!selectedCharacter) {
    return <p>Please select a character before continuing.</p>;
  }

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error.message}</p>; 

  return (
    <div>
      {userCharacter && 
        <BattleCard className="battleCard userCard" character={userCharacter} isUserCard={true} onAttack={handleUserAttack} userCanAct={userCanAct} setUserCanAct={setUserCanAct} />
      }
    </div>
  );
};

const renderOpponent = () => {
  if (!opponentCharacter && opponentCalled && opponentLoading) {
    return <p>Loading...</p>;
  }
  else if (opponentCharacter) {
    return <BattleCard className="battleCard opponentCard" character={opponentCharacter} isUserCard={false} />;
  }
};

  return (
    <div className="gameContainer">
      <h1>{welcomeMessage}</h1> 
      <div className="battleArea" style={{display: 'flex', justifyContent: 'space-around'}}>
        {renderContent()}
        {user && selectedCharacter && renderOpponent()}
      </div>
      {user && selectedCharacter && (
        <>
          {!opponentCharacter &&
            <Button 
            variant="contained" 
            color="primary"
            className="battleButton"
            onClick={() => {
              getRandomOpponent({ variables: { userId: user._id } });
              setUserCanAct(true);
              setWelcomeMessage(`Good Luck, ${user.username}!`);
              setGameReset(false); // Reset gameReset here
            }}
          >
            Find Battle
          </Button>
          }
          <Feed className="feedContainer">
            {gameMessages.map((message, index) => (
              <Feed.Event key={index}>
                <Feed.Content>
                  <Feed.Summary>
                    {message}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>
        </>
      )}
    </div>
  );
}


const GET_CHARACTER = gql`
  query getCharacter($characterId: ID!) {
    getCharacterById(characterId: $characterId) {
      _id
      createdAt
      name
      health
      strength
      defense
      speed
      moves {
        _id
        name
        description
        uses
        damage
        accuracy
        modifier
        healthboost
        strengthboost
        defenseboost
        speedboost
      }
    }
  }
`;
const FIND_RANDOM_OPPONENT = gql`
  query FindRandomOpponent($userId: ID!) {
    findRandomOpponent(userId: $userId) {
      _id
      createdAt
      name
      health
      strength
      defense
      speed
      moves {
        _id
        name
        description
        uses
        damage
        accuracy
        modifier
        healthboost
        strengthboost
        defenseboost
        speedboost
      }
    }
  }
`;

export default Home;
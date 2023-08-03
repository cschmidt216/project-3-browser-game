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
      const { data } = await refetch();
      if (data?.getCharacterById) {
        const characterWithBoosts = applyStatBoosts(data.getCharacterById);
        setUserCharacter(characterWithBoosts);
      }
    }
  };
  
  // useEffect hook to handle game reset
  useEffect(() => {
    if (gameReset) {
      refetch();
      setGameReset(false);
    }
  }, [gameReset, refetch]);
  
  const handleUserAttack = (move) => {
    if (userCanAct) {
      handleAttack(
        userCharacter, 
        opponentCharacter, 
        setOpponentCharacter, 
        move, 
        setGameMessages, 
        handleOpponentAttack,
        resetGame 
      );
      setUserCanAct(false);
    }
  };

  useEffect(() => {
    console.log('User character:', userCharacter);
}, [userCharacter]);

  
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
        <h1>Welcome, {user.username}!</h1>
        {userCharacter && <BattleCard character={userCharacter} isUserCard={true} onAttack={handleUserAttack} userCanAct={userCanAct} setUserCanAct={setUserCanAct} />}
      </div>
    );
  };

  const renderOpponent = () => {
    if (opponentCalled && !opponentLoading && opponentData) {
      return <BattleCard character={opponentCharacter} isUserCard={false} />;
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      {renderContent()}
      {user && selectedCharacter && 
        <>
      {user && selectedCharacter && !opponentCharacter &&
        <>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => {
            getRandomOpponent({ variables: { userId: user._id } });
            setUserCanAct(true);
          }}
        >
          Find Battle
        </Button>
      </>
      }
          {renderOpponent()}
        </>
      }
            <Feed>
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
    </div>
  );
}


const GET_CHARACTER = gql`
  query getCharacter($characterId: ID!) {
    getCharacterById(characterId: $characterId) {
      _id
      createdAt
      name
      stat1
      stat2
      stat3
      stat4
      stat5
      stat6
      moves {
        _id
        name
        description
        uses
        damage
        accuracy
        modifier
        stat1boost
        stat2boost
        stat3boost
        stat4boost
        stat5boost
        stat6boost
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
      stat1
      stat2
      stat3
      stat4
      stat5
      stat6
      moves {
        _id
        name
        description
        uses
        damage
        accuracy
        modifier
        stat1boost
        stat2boost
        stat3boost
        stat4boost
        stat5boost
        stat6boost
      }
    }
  }
`;

export default Home;
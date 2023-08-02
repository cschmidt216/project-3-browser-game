import React, { useState, useContext} from 'react';
import { Form, Button,  Card, } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../utils/authContext';
import MoveCard from '../components/moveCard';

function CharacterCreation() {
  const context = useContext(AuthContext);
  const Navigate = useNavigate(); 
  
  const [characterValues, setCharacterValues] = useState({
    name: '',
    shape: '',
    style: '',
    moves: [],
  });

  const [selectedMoves, setSelectedMoves] = useState([]); 

  React.useEffect(() => {
    setCharacterValues(prevValues => ({ ...prevValues, moves: selectedMoves }));
  }, [selectedMoves]);

  const { loading, data } = useQuery(GET_ALL_MOVES);  

  const onChange = (event, { name, value }) => {
    setCharacterValues({ ...characterValues, [name]: value });
  };

  const onMovesChange = (moveId) => {
    if (selectedMoves.includes(moveId)) {
      // Deselect the move
      setSelectedMoves(selectedMoves.filter((id) => id !== moveId));
      setCharacterValues(prevValues => ({
        ...prevValues,
        moves: prevValues.moves.filter((id) => id !== moveId),
      }));
    } else if (selectedMoves.length < 4) {
      // Select the move (up to four moves)
      setSelectedMoves([...selectedMoves, moveId]);
      setCharacterValues(prevValues => ({
        ...prevValues,
        moves: [...prevValues.moves, moveId],
      }));
    }
  };

  const ID = context.user._id;

  const [createCharacter] = useMutation(CREATE_CHARACTER, {
    variables: {
      characterInput: {
        name: characterValues.name,
        moves: characterValues.moves,
        shape: characterValues.shape,
        style: characterValues.style,
        user: ID,
        stat1: 100,
        stat2: 10,
        stat3: 10,
        stat4: 10,
        stat5: 10,
        stat6: 10,
      },

    },
    update: (_, result) => {
      console.log('Update after character creation:', result); // log the result after update
    },
    onCompleted: (data) => {
      // Handle the completion of character creation if needed
      console.log('Character created (in onCompleted):', data.createCharacter); // log the created character
    },
    onError: (error) => {
      // Handle any errors that occur during character creation
      console.error('Error creating character (in onError):', error.message); // log the error message
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    if (!context.user) {
      console.error("User is not authenticated");
      return;
    }
    createCharacter({
      variables: {
        characterInput: {
          ...characterValues,
          user: ID,
        },
      },
    })
      .then(response => {
        console.log('Character created:', response); // log the response if successful
        Navigate('/characters'); // navigate to the characters page
      })
      .catch(error => {
        console.log('Error creating character:', error); // log the error if there's a failure
      });
};

  if (loading) return 'Loading...';
  if (!data || !data.getAllMoves) return 'No Moves Data...';

  return (
    <div>
        <Form onSubmit={onSubmit} noValidate>
            <h1>Create Character</h1>
            <Form.Input 
                label="Name"
                placeholder="Name..."
                name="name"
                value={characterValues.name}
                onChange={onChange}
            />
            <Form.Select
              label="Shape"
              placeholder="Character Shape..."
              name="shape"
              options={[
                { key: '1', text: 'Shape 1', value: 'Shape 1' },
                { key: '2', text: 'Shape 2', value: 'Shape 2' },
                { key: '3', text: 'Shape 3', value: 'Shape 3' },
              ]}
            value={characterValues.shape}
            onChange={onChange}
            />
            <Form.Select
            label="Style"
            placeholder="Character Style..."
            name="style"
            options={[
              { key: '1', text: 'Style 1', value: 'Style 1' },
              { key: '2', text: 'Style 2', value: 'Style 2' },
              { key: '3', text: 'Style 3', value: 'Style 3' },
            ]}
            value={characterValues.style}
            onChange={onChange}
            />
        </Form>
        <h3>Moves:</h3>
        <Card.Group>
            {data.getAllMoves.map((move) => (
              <MoveCard
                key={move._id}
                move={move}
                selected={selectedMoves.includes(move._id)}
                onClick={() => onMovesChange(move._id)}
              />
            ))}
        </Card.Group>
        <Button primary onClick={onSubmit}>
            Select Moves and Create Character
        </Button>
    </div>
  );
}

const CREATE_CHARACTER = gql`
  mutation createCharacter($characterInput: CharacterInput!) {
    createCharacter(characterInput: $characterInput) {
      _id
      name
      moves {
        _id
        name
        description
        uses
      }
      shape
      style
      user
    }
  }
`;

const GET_ALL_MOVES = gql`
  query getAllMoves {
    getAllMoves {
      _id
      name
      description
      uses
    }
  }
`;



export default CharacterCreation;
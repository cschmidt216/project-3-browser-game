import React, {useContext, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid, Button, Card } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import CharacterCard from '../components/CharacterCard';
import { AuthContext } from '../utils/authContext'; // Import AuthContext

function Characters() {
    const context = useContext(AuthContext); // Initialize AuthContext
    const { loading, error, data, refetch} = useQuery(GET_CHARACTERS, {
    variables: { userId: context.user ? context.user._id : null },
    });

    useEffect(() => {
        refetch();
    }, []);

    const characters = data?.getAllCharacters; // Extract the characters from the data object
    const navigate = useNavigate(); // Initialize useNavigate hook
    const handleSubmit = () => {
        navigate('/create'); 
    };

    if (loading) return <p>Loading...</p>; // You can replace this with a spinner or other loading indicator if you prefer
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Grid columns={3} divided>
            <Card.Group>
                {characters && characters.length > 0 ? (
                    characters.map(character => (
                        <CharacterCard
                            key={character._id}
                            character={character}
                            onInspect={() => console.log(`Inspecting character: ${character._id}`)} // replace this with your inspection handler
                        />
                    ))
                ) : (
                    <p>No characters found.</p>
                )}
            </Card.Group>
            <Button inverted color='purple' onClick={handleSubmit}>
                Create a new character!
            </Button>
        </Grid>
    );
}

const GET_CHARACTERS = gql`
  query Query($userId: ID!) {
    getAllCharacters(userId: $userId) {
      _id
      createdAt
      name
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

export default Characters;
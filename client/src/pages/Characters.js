import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import CharacterCard from '../components/CharacterCard';

function Characters() {
    const { loading, data } = useQuery(GET_CHARACTERS, {
        variables: { userId: localStorage.getItem('userId') }, // Pass the userId variable to the query
    });
    const characters = data?.characters; // Extract the characters from the data object
    const navigate = useNavigate(); // Initialize useNavigate hook
    const handleSubmit = () => {
        navigate('/create'); 
    };

    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <h1>Characters</h1>
                <Button inverted color='purple' onClick={handleSubmit}>
                    Create a new character!
                </Button>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading...</h1>
                ) : characters && characters.length > 0 ? ( // Check if characters array is not empty
                    characters.map(character => (
                        <Grid.Column key={character.id} style={{ marginBottom: 20 }}>
                            <CharacterCard character={character} />
                        </Grid.Column>
                    ))
                ) : (
                    <p>No characters found.</p> // Display a message if characters array is empty
                )}
            </Grid.Row>
        </Grid>
    );
}

const GET_CHARACTERS = gql`
  query Query($userId: ID!) {
    getAllCharacters(userId: $userId) {
      _id
      createdAt
      name
    }
  }
`;

export default Characters;
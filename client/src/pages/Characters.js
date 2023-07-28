import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import CharacterCard from '../components/CharacterCard';

function Characters() {
    const { loading, data: {getCharacters: characters} } = useQuery(GET_CHARACTERS);
    
    // eslint-disable-next-line no-undef
    if (data) console.log(data);
    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <h1>Characters</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    loading ? (  <h1>Loading...</h1>
                ) : (
                    characters && characters.map(character => (
                        <Grid.Column key={character.id} style= {{ marginBottom: 20}}>
                            <CharacterCard character={character} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
        
    )
}

const GET_CHARACTERS = gql`
    {
        query getCharacters {
        characters {
            id
            name
        }
    }
    }`
export default Characters;
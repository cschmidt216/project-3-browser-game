import React from 'react';
import {Card, Button} from 'semantic-ui-react';
import moment from 'moment';
//import { Link } from 'react-router-dom';


function CharacterCard({character: {name, id, username, createdAt}}) {
   function seeCharacter() {
        window.location.href = `/characters/${id}`;
    }
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {username}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={seeCharacter}>
                    <Button color='purple' basic>
                        Details
                    </Button>
                </Button>  
            </Card.Content>
        </Card>
    )};

export default CharacterCard;
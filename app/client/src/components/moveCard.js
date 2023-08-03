import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function MoveCard({ move, selected, onClick }) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{move.name}</Card.Header>
        <Card.Description>{move.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button color={selected ? 'green' : 'grey'} onClick={onClick}>
          {selected ? 'Selected' : 'Select'}
        </Button>
      </Card.Content>
    </Card>
  );
}

export default MoveCard;
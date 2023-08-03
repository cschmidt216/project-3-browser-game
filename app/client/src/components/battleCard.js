import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function BattleCard({ character, isUserCard, onAttack }) {
  if (!character) {
    return <p>Loading...</p>; 
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>{character.name}</Card.Header>
        <Card.Description>
          <p>Stats:</p>
          <ul>
            <li>Stat 1: {character.stat1}</li>
            <li>Stat 2: {character.stat2}</li>
            <li>Stat 3: {character.stat3}</li>
            <li>Stat 4: {character.stat4}</li>
            <li>Stat 5: {character.stat5}</li>
            <li>Stat 6: {character.stat6}</li>
          </ul>
          <p>Moves:</p>
          {character.moves.map((move) => (
            <Button 
              key={move._id} 
              disabled={!isUserCard}
              onClick={() => isUserCard && onAttack(move)}
            >
              {move.name} ({move.uses})
            </Button>
          ))}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default BattleCard;
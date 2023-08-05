import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function BattleCard({ character, isUserCard, onAttack, userCanAct, className }) {
  if (!character) {
    return <p>Loading...</p>; 
  }

  return (
    <Card className={className}>
      <Card.Content>
        <Card.Header>{character.name}</Card.Header>
        <Card.Description>
          <p>Stats:</p>
          <ul>
            <li>Health: {character.health}</li>
            <li>Strength: {character.strength}</li>
            <li>Defense: {character.defense}</li>
            <li>Speed: {character.speed}</li>
          </ul>
          <p>Moves:</p>
          <div className="movesContainer">
            {character.moves.map((move) => (
              <Button 
                key={move._id} 
                disabled={!isUserCard || !userCanAct || move.uses === 0} 
                onClick={() => isUserCard && onAttack(move)}
                className='moveButton'
              >
                {move.name}
              </Button>
            ))}
          </div>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default BattleCard;
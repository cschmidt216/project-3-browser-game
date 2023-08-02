import React, { useState, useEffect } from 'react';
import { Card, Button } from 'semantic-ui-react';

function BattleCard({ character, isUserCard, onAttack }) {
  const [characterStats, setCharacterStats] = useState({
    stat1: character.stat1,
    stat2: character.stat2,
    stat3: character.stat3,
    stat4: character.stat4,
    stat5: character.stat5,
    stat6: character.stat6
  });

  useEffect(() => {
    let stat1 = character.stat1;
    let stat2 = character.stat2;
    let stat3 = character.stat3;
    let stat4 = character.stat4;
    let stat5 = character.stat5;
    let stat6 = character.stat6;

    character.moves.forEach(move => {
      stat1 += move.stat1boost;
      stat2 += move.stat2boost;
      stat3 += move.stat3boost;
      stat4 += move.stat4boost;
      stat5 += move.stat5boost;
      stat6 += move.stat6boost;
    });

    setCharacterStats({
      stat1,
      stat2,
      stat3,
      stat4,
      stat5,
      stat6
    });
  }, [character]);

  return (
    <Card>
      <Card.Content>
        <Card.Header>{character.name}</Card.Header>
        <Card.Description>
          <p>Stats:</p>
          <ul>
            <li>Stat 1: {characterStats.stat1}</li>
            <li>Stat 2: {characterStats.stat2}</li>
            <li>Stat 3: {characterStats.stat3}</li>
            <li>Stat 4: {characterStats.stat4}</li>
            <li>Stat 5: {characterStats.stat5}</li>
            <li>Stat 6: {characterStats.stat6}</li>
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
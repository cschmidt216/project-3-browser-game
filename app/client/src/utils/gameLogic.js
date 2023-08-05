export function aiTurn(character) {
  // For now, AI simply chooses a random move.
  const randomMoveIndex = Math.floor(Math.random() * character.moves.length);
  return character.moves[randomMoveIndex];
}

export function applyStatBoosts(character) {
  let statBoostedCharacter = { ...character };
  character.moves.forEach((move) => {
    statBoostedCharacter.health += move.healthboost;
    statBoostedCharacter.strength += move.strengthboost;
    statBoostedCharacter.defense += move.defenseboost;
    statBoostedCharacter.speed += move.speedboost;
  });

  return statBoostedCharacter;
  }

  export function handleAttack(
    character,
    opponentCharacter,
    setCharacter,
    setOpponentCharacter,
    move,
    setGameMessages,
    handleOpponentAttack,
    gameOverCallback
  ) {
    // Bypass the accuracy check for certain moves
    const guaranteedMoves = [3, 4, 6, 9];
    const bypassAccuracyCheck = guaranteedMoves.includes(move.modifier);
  
    const randomValue = Math.random();
    const accuracyCheck = (randomValue <= (move.accuracy - opponentCharacter.speed) / 100) || bypassAccuracyCheck;
  
    if (accuracyCheck) {
      const rawDamage = move.damage + character.strength;
      const defenseFactor = opponentCharacter.defense > rawDamage ? rawDamage : opponentCharacter.defense;
      let finalDamage = rawDamage - defenseFactor;
  
      let characterModifier = false;
      switch (move.modifier) {
        case 1:
          opponentCharacter.strength = Math.max(opponentCharacter.strength - 4, 0);
          characterModifier = true;
          break;
        case 2:
          finalDamage += character.speed;
          break;
        case 3:
          finalDamage = 0;
          character.defense = Math.max(character.defense + 4, 0);
          characterModifier = true;
          break;
        case 4:
          finalDamage = 0;
          character.health = Math.max(character.health + 10, 0);
          characterModifier = true;
          break;
        case 5:
          character.strength = Math.max(character.strength - 3, 0);
          character.defense = Math.max(character.defense - 3, 0);
          character.speed = Math.max(character.speed - 3, 0);
          characterModifier = true;
          break;
        case 6:
          finalDamage = 0;
          character.strength = Math.max(character.strength + 4, 0);
          characterModifier = true;
          break;
        case 7:
          opponentCharacter.defense = Math.max(opponentCharacter.defense - 4, 0);
          characterModifier = true;
          break;
        case 8:
          opponentCharacter.speed = Math.max(opponentCharacter.speed - 4, 0);
          characterModifier = true;
          break;
        case 9:
          finalDamage = 0;
          character.speed = Math.max(character.speed + 4, 0);
          characterModifier = true;
          break;
        default:
          break;
      }
  
      opponentCharacter.health = Math.max(opponentCharacter.health - finalDamage, 0);
  
      setOpponentCharacter({ ...opponentCharacter });
  
      if (characterModifier) {
        setCharacter({ ...character });
      }
  
      const newMessage = `${character.name} used ${move.name}, dealing ${finalDamage} damage.`;
  
      // Limit the messages to 5 most recent ones
      setGameMessages((gameMessages) => {
        const updatedMessages = [...gameMessages, newMessage];
        while (updatedMessages.length > 5) {
          updatedMessages.shift(); // remove the first message if there are more than 5
        }
        return updatedMessages;
      });
  
    } else {
      const newMessage = `${character.name} used ${move.name}, but it missed.`;
  
      // Limit the messages to 5 most recent ones
      setGameMessages((gameMessages) => {
        const updatedMessages = [...gameMessages, newMessage];
        while (updatedMessages.length > 5) {
          updatedMessages.shift(); // remove the first message if there are more than 5
        }
        return updatedMessages;
      });
    }
  
    if (opponentCharacter.health <= 0 || character.health <= 0) {
      let gameOverMessage = `Game over, ${character.name}'s health reached 0. Resetting in 5 seconds.`;
      if (opponentCharacter.health <= 0) {
        gameOverMessage = `Game over, ${opponentCharacter.name}'s health reached 0. Resetting in 5 seconds.`;
      }
  
      // Limit the messages to 5 most recent ones
      setGameMessages((gameMessages) => {
        const updatedMessages = [...gameMessages, gameOverMessage];
        while (updatedMessages.length > 5) {
          updatedMessages.shift(); // remove the first message if there are more than 5
        }
        return updatedMessages;
      });
  
      if (gameOverCallback) {
        setTimeout(gameOverCallback, 5000);
      }
      return;
    }
  
    const aiMove = aiTurn(opponentCharacter);
    setTimeout(() => handleOpponentAttack(aiMove), 1000);
  }
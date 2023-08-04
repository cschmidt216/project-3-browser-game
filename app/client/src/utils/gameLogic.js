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
    setOpponentCharacter, 
    move, 
    setGameMessages, 
    handleOpponentAttack,
    gameOverCallback // <-- Add this line
  ) {
    // Calculate damage based on character's strength, move's damage and opponent's defense
    const rawDamage = move.damage + character.strength;
    const defenseFactor = opponentCharacter.defense > rawDamage ? rawDamage : opponentCharacter.defense;
    const finalDamage = rawDamage - defenseFactor;

    // Subtract damage from opponent's health
    const updatedOpponentCharacter = { ...opponentCharacter };
    updatedOpponentCharacter.health -= finalDamage;

    
  
    // Update the opponent character's health
    setOpponentCharacter(updatedOpponentCharacter);
  
    // Add game message
    const newMessage = `${character.name} used ${move.name}, dealing ${finalDamage} damage.`;
    setGameMessages((gameMessages) => [...gameMessages, newMessage]);
  
    // Check for game over after the state update
    if (updatedOpponentCharacter.health <= 0 || character.health <= 0) {
      if (updatedOpponentCharacter.health <= 0) {
        const gameOverMessage = `Game over, ${updatedOpponentCharacter.name}'s health reached 0. Resetting in 5 seconds.`;
        setGameMessages((gameMessages) => [...gameMessages, gameOverMessage]);
      } else {
        const gameOverMessage = `Game over, ${character.name}'s health reached 0. Resetting in 5 seconds.`;
        setGameMessages((gameMessages) => [...gameMessages, gameOverMessage]);
      }
              
      // If game over, call the callback function after 5 seconds
      if (gameOverCallback) {
        setTimeout(gameOverCallback, 5000);
      }
      return; // Skip the AI turn and other actions
    }
  
    // AI turn
    const aiMove = aiTurn(updatedOpponentCharacter);
    setTimeout(() => handleOpponentAttack(aiMove), 1000); // Simulate delay for AI turn
  }
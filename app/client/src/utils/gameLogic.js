export function aiTurn(character) {
  // For now, AI simply chooses a random move.
  const randomMoveIndex = Math.floor(Math.random() * character.moves.length);
  return character.moves[randomMoveIndex];
}

export function applyStatBoosts(character) {
  let statBoostedCharacter = { ...character };
  character.moves.forEach((move) => {
    statBoostedCharacter.stat1 += move.stat1boost;
    statBoostedCharacter.stat2 += move.stat2boost;
    statBoostedCharacter.stat3 += move.stat3boost;
    statBoostedCharacter.stat4 += move.stat4boost;
    statBoostedCharacter.stat5 += move.stat5boost;
    statBoostedCharacter.stat6 += move.stat6boost;
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
      // Subtract damage from opponent's health
      const updatedOpponentCharacter = { ...opponentCharacter };
      updatedOpponentCharacter.stat1 -= move.damage;
    
      // Update the opponent character's health
      setOpponentCharacter(updatedOpponentCharacter);
    
      // Add game message
      const newMessage = `${character.name} used ${move.name}, dealing ${move.damage} damage.`;
      setGameMessages((gameMessages) => [...gameMessages, newMessage]);
    
      // Check for game over after the state update
      if (updatedOpponentCharacter.stat1 <= 0 || character.stat1 <= 0) {
        if (updatedOpponentCharacter.stat1 <= 0) {
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
export function aiTurn(character) {
    // For now, AI simply chooses a random move.
    const randomMoveIndex = Math.floor(Math.random() * character.moves.length);
    return character.moves[randomMoveIndex];
  }
  
  export function handleAttack(
    character, 
    opponentCharacter, 
    setOpponentCharacter, 
    move, 
    setGameMessages, 
    handleOpponentAttack
  ) {
    // Subtract damage from opponent's health
    const updatedOpponentCharacter = { ...opponentCharacter };
    updatedOpponentCharacter.stat1 -= move.damage;
    setOpponentCharacter(updatedOpponentCharacter);
  
    // Add game message
    const newMessage = `${character.name} used ${move.name}, dealing ${move.damage} damage.`;
    setGameMessages((gameMessages) => [...gameMessages, newMessage]);
  
    // AI turn
    const aiMove = aiTurn(updatedOpponentCharacter);
    setTimeout(() => handleOpponentAttack(aiMove), 1000); // Simulate delay for AI turn
  }
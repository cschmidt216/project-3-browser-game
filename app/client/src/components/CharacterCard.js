import React, { useContext, useState } from 'react';
import { Card, Button, Modal } from 'semantic-ui-react';
import { AuthContext } from '../utils/authContext';
import { applyStatBoosts } from '../utils/gameLogic';

function CharacterCard({ character, deleteCharacter }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { selectCharacter } = useContext(AuthContext);
  const characterWithBoosts = applyStatBoosts(character);

  const handleDelete = () => {
    deleteCharacter({ variables: { characterId: character._id } });
    setModalOpen(false);
  };

  const handleSelect = () => {
    selectCharacter(character._id);
  };
  const colorMap = {
    "1": "red",
    "2": "blue",
    "3": "yellow",
  };
  
  const shapeMap = {
    "1": "0%",  // For square
    "2": "50%", // For circle
    "3": "25%", // For triangle
  }

  let characterColor = colorMap[character.style];
  let characterShape = shapeMap[character.shape];

  return (
    <Card style={{backgroundColor: characterColor, borderRadius: characterShape}}>
      <Card.Content>
        <Card.Header>{character.name}</Card.Header>
        <Card.Meta>Created At: {new Date(parseInt(character.createdAt)).toLocaleDateString()}</Card.Meta>
        <Modal
          onClose={() => setModalOpen(false)}
          onOpen={() => setModalOpen(true)}
          open={modalOpen}
          trigger={<Button>Inspect</Button>}
        >
          <Modal.Header>{character.name}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Created At: {new Date(parseInt(character.createdAt)).toLocaleDateString()}</p>
              <p>Stats:</p>
                <ul>
                  <li>Health: {characterWithBoosts.health}</li>
                  <li>Strength: {characterWithBoosts.strength}</li>
                  <li>Defense: {characterWithBoosts.defense}</li>
                  <li>Speed: {characterWithBoosts.speed}</li>
                </ul>
                
              <p>Moves:</p>
              <ul>
                {character.moves && character.moves.length > 0 ? (
                  character.moves.map((move) => (
                    <li key={move._id}>{move.name}: {move.description}</li>
                  ))
                ) : (
                  <p>No moves found.</p>
                )}
              </ul>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={handleDelete}>
              Delete
            </Button>
            <Button color='black' onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
        <Button onClick={handleSelect}>Select</Button> {/* New Button */}
      </Card.Content>
    </Card>
  );
}

export default CharacterCard;
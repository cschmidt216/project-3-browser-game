import React, { useContext, useState } from 'react';
import { Card, Button, Modal } from 'semantic-ui-react';
import { AuthContext } from '../utils/authContext';

function CharacterCard({ character }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { selectCharacter } = useContext(AuthContext);

  const handleSelect = () => {
    selectCharacter(character._id);
  };

  return (
    <Card>
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
              <p>Moves:</p>
              <ul>
                {character.moves && character.moves.length > 0 ? (
                  character.moves.map((move) => (
                    <li key={move._id}>{move.name}</li>
                  ))
                ) : (
                  <p>No moves found.</p>
                )}
              </ul>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
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
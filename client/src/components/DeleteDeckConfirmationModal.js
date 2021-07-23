import axios from "axios";
import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";

const DeleteDeckConfirmationModel = (props) => {
  const { user } = useContext(AuthContext);
  const { closeDeleteDeckModal, subject, deck, getDecks } = props;

  const deleteDeck = async () => {
    try {
      await axios.delete(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}`
      );
      getDecks();
    } catch (error) {
      console.log(error);
    } finally {
      closeDeleteDeckModal();
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Header className="modal-header">
          <Modal.Title>Update Note</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeDeleteDeckModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <h3>Are you sure you want to delete this deck: {deck.name}?</h3>
            <h5>
              Deleting this subject will also delete all flashcards within...
            </h5>
          </div>
          <Button onClick={closeDeleteDeckModal}>Cancel</Button>
          <Button
            className="modal-button"
            style={{
              background: "#ece0d1",
              borderColor: "#ece0d1",
              color: "black",
            }}
            onClick={deleteDeck}
          >
            Delete
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteDeckConfirmationModel;

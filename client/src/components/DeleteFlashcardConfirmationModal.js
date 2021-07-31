import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const DeleteFlashcardConfirmationModal = (props) => {
  const { user } = useContext(AuthContext);
  const { closeDeleteFlashcardModal, subject, deck, flashcard, getFlashcards } =
    props;

  const deleteFlashcard = async () => {
    try {
      await axios.delete(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}/flashcards/${flashcard.id}`
      );
      getFlashcards();
    } catch (error) {
      console.log(error);
    } finally {
      closeDeleteFlashcardModal();
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Header className="modal-header">
          <Modal.Title>Delete Flashcard</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeDeleteFlashcardModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <h3>
              Are you sure you want to delete this flashcard: {flashcard.name}?
            </h3>
            <h5>Once deleted, you will not be able to recover it...</h5>
          </div>
          <div className="modal-button-container">
            <Button
              style={{
                background: "#ece0d1",
                borderColor: "#ece0d1",
                color: "black",
              }}
              onClick={closeDeleteFlashcardModal}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: " #4a2c2a",
                border: "none",
                fontWeight: "bold",
              }}
              onClick={deleteFlashcard}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteFlashcardConfirmationModal;

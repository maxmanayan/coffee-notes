import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";

const UpdateFlashcardModal = (props) => {
  const { user } = useContext(AuthContext);
  const { closeUpdateFlashcardModal, subject, deck, flashcard, getFlashcards } =
    props;
  const [front, setFront] = useState(flashcard.front);
  const [back, setBack] = useState(flashcard.back);

  const updateFlashcard = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}/flashcards/${flashcard.id}`,
        {
          front: front,
          back: back,
          starred: flashcard.starred,
        }
      );
      getFlashcards();
    } catch (error) {
      console.log(error);
    } finally {
      closeUpdateFlashcardModal();
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Header className="modal-header">
          <Modal.Title>Update Note</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeUpdateFlashcardModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={updateFlashcard}>
            <Form.Group className="modal-body">
              <Form.Control
                className="modal-body"
                as="textarea"
                name="front"
                placeholder="Front"
                value={front}
                onChange={(e) => setFront(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="modal-body">
              <Form.Control
                className="modal-body"
                as="textarea"
                name="back"
                placeholder="Back"
                value={back}
                onChange={(e) => setBack(e.target.value)}
              />
            </Form.Group>
            <Button
              className="modal-button"
              style={{
                background: "#ece0d1",
                borderColor: "#ece0d1",
                color: "black",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateFlashcardModal;

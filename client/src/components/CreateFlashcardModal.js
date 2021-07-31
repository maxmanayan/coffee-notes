import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { AuthContext } from "../providers/AuthProvider";

const CreateFlashcardModal = (props) => {
  const { user } = useContext(AuthContext);
  const { closeCreateFlashcardModal, subject, deck, getFlashcards } = props;
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);

  const createFlashcard = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}/flashcards`,
        {
          front: front,
          back: back,
          starred: false,
        }
      );
      getFlashcards();
    } catch (error) {
      console.log(error);
    } finally {
      closeCreateFlashcardModal();
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Create New Flashcard</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeCreateFlashcardModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createFlashcard}>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="front"
                placeholder="Front of Card"
                value={front}
                onChange={(e) => setFront(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="back"
                placeholder="Back of Card"
                value={back}
                onChange={(e) => setBack(e.target.value)}
              />
            </Form.Group>
            <Button
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

export default CreateFlashcardModal;

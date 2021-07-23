import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";

const UpdateDeckModal = (props) => {
  const { user } = useContext(AuthContext);
  const { closeUpdateDeckModal, subject, deck, getDecks } = props;
  const [name, setName] = useState(deck.name);
  const [description, setDescription] = useState(deck.description);

  const editDeck = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}`,
        {
          name: name,
          description: description,
          starred: deck.starred,
        }
      );
      getDecks();
    } catch (error) {
      console.log(error);
    } finally {
      closeUpdateDeckModal();
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Header className="modal-header">
          <Modal.Title>Update Note</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeUpdateDeckModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={editDeck}>
            <Form.Group className="modal-body">
              <Form.Control
                className="modal-body"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="modal-body">
              <Form.Control
                className="modal-body"
                as="textarea"
                name="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default UpdateDeckModal;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { AuthContext } from "../providers/AuthProvider";

const CreateDeckModal = (props) => {
  const { user } = useContext(AuthContext);
  const { closeCreateDeckModal, getDecks, subject } = props;
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const createDeck = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/users/${user.id}/subjects/${subject.id}/decks`, {
        name: name,
        description: description,
        starred: false,
      });
      getDecks();
    } catch (error) {
      console.log(error);
    } finally {
      closeCreateDeckModal();
    }
  };
  return (
    <div>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Create New Deck</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeCreateDeckModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createDeck}>
            <Form.Group>
              <Form.Control
                name="name"
                placeholder="Deck Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default CreateDeckModal;

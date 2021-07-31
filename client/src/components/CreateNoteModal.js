import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { AuthContext } from "../providers/AuthProvider";

const CreateNoteModal = (props) => {
  const { user } = useContext(AuthContext);
  const { closeCreateNoteModal, getTodoNotes } = props;
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const createNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/users/${user.id}/notes`, {
        title: title,
        body: info,
        completed: false,
      });
      getTodoNotes();
    } catch (error) {
      console.log(error);
    } finally {
      closeCreateNoteModal();
    }
  };

  return (
    <>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Create New Note</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeCreateNoteModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createNote}>
            <Form.Group>
              <Form.Control
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="info"
                placeholder="Try to summarize your task in one sentence!"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
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
    </>
  );
};

export default CreateNoteModal;

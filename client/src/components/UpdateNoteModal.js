import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { AuthContext } from "../providers/AuthProvider";

const UpdateNoteModal = (props) => {
  const { user } = useContext(AuthContext);
  const {
    closeUpdateNoteModal,
    updateNote,
    getTodoNotes,
    getCompletedNotes,
    displayNote,
    note,
  } = props;
  const [id, setId] = useState(updateNote.id);
  const [title, setTitle] = useState(updateNote.title);
  const [info, setInfo] = useState(updateNote.body);
  const [completed, setCompleted] = useState(updateNote.completed);

  const editNote = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(`/api/users/${user.id}/notes/${id}`, {
        title: title,
        body: info,
        completed: completed,
      });
      getTodoNotes();
      getCompletedNotes();
      displayNote(note.id);
    } catch (error) {
      console.log(error);
    } finally {
      closeUpdateNoteModal();
    }
  };

  return (
    <>
      <Modal show={true}>
        <Modal.Header className="modal-header">
          <Modal.Title>Update Note</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeUpdateNoteModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={editNote}>
            <Form.Group className="modal-body">
              <Form.Control
                className="modal-body"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="modal-body">
              <Form.Control
                className="modal-body"
                as="textarea"
                name="info"
                placeholder="Info"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
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
    </>
  );
};

export default UpdateNoteModal;

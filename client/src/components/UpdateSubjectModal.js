import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";

const UpdateSubjectModal = (props) => {
  const { user } = useContext(AuthContext);
  const { closeUpdateSubjectModal, subject, getSubjects } = props;
  const [name, setName] = useState(subject.name);
  const [description, setDescription] = useState(subject.description);

  const editSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user.id}/subjects/${subject.id}`, {
        name: name,
        description: description,
        starred: subject.starred,
      });
      getSubjects();
    } catch (error) {
      console.log(error);
    } finally {
      closeUpdateSubjectModal();
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Header className="modal-header">
          <Modal.Title>Update Note</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeUpdateSubjectModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={editSubject}>
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

export default UpdateSubjectModal;

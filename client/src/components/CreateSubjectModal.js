import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";

const CreateSubjectModal = (props) => {
  const { user } = useContext(AuthContext);
  const { closeCreateSubjectModal, getSubjects } = props;
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const createSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/users/${user.id}/subjects`, {
        name: name,
        description: description,
        starred: false,
      });
      getSubjects();
    } catch (error) {
      console.log(error);
    } finally {
      closeCreateSubjectModal();
    }
  };
  return (
    <div>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Create New Subject</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeCreateSubjectModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createSubject}>
            <Form.Group>
              <Form.Control
                name="name"
                placeholder="Subject Name"
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

export default CreateSubjectModal;

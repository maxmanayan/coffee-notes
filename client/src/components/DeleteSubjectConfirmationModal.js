import axios from "axios";
import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";

const DeleteSubjectConfirmationModel = (props) => {
  const { user } = useContext(AuthContext);
  const { closeDeleteSubjectModal, subject, getSubjects } = props;

  const deleteSubject = async () => {
    try {
      await axios.delete(`/api/users/${user.id}/subjects/${subject.id}`);
      getSubjects();
    } catch (error) {
      console.log(error);
    } finally {
      closeDeleteSubjectModal();
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Header className="modal-header">
          <Modal.Title>Update Note</Modal.Title>
          <div style={{ cursor: "pointer" }}>
            <Icon.X onClick={closeDeleteSubjectModal} size={20} />
          </div>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <h3>
              Are you sure you want to delete this subject: {subject.name}?
            </h3>
            <h5>
              Deleting this subject will also delete all decks, flashcards, and
              files within...
            </h5>
          </div>
          <Button onClick={closeDeleteSubjectModal}>Cancel</Button>
          <Button
            className="modal-button"
            style={{
              background: "#ece0d1",
              borderColor: "#ece0d1",
              color: "black",
            }}
            onClick={deleteSubject}
          >
            Delete
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteSubjectConfirmationModel;

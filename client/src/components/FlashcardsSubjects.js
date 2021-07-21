import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import CreateSubjectModal from "./CreateSubjectModal";
import * as Icon from "react-bootstrap-icons";

const FlashcardsSubjects = (props) => {
  const { user } = useContext(AuthContext);
  const [subjects, setSubjects] = useState(null);
  const [showCreateSubjectModal, setShowCreateSubjectModal] = useState(false);

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/subjects`);
      setSubjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateSubjectModal = () => {
    setShowCreateSubjectModal(true);
  };
  const closeCreateSubjectModal = () => {
    setShowCreateSubjectModal(false);
  };

  const renderSubjects = () => {
    return subjects.map((subject) => {
      return (
        <div className="flashcards-subjects-card">
          <h4>{subject.name}</h4>
          <h4>{subject.description}</h4>
        </div>
      );
    });
  };
  return (
    <div className="flashcards-subjects">
      <div className="flashcards-subjects-header">
        <h1>Subjects</h1>
        <div className="flashcards-subjects-header-icon">
          <Icon.PlusSquare onClick={openCreateSubjectModal} size={30}>
            New Subject
          </Icon.PlusSquare>
        </div>
      </div>
      <div className="flashcards-subjects-container">
        {!subjects && (
          <div>
            <h3>Create a Subject!</h3>
          </div>
        )}
        {subjects && renderSubjects()}
      </div>
      {showCreateSubjectModal && (
        <CreateSubjectModal
          closeCreateSubjectModal={closeCreateSubjectModal}
          getSubjects={getSubjects}
        />
      )}
    </div>
  );
};

export default FlashcardsSubjects;

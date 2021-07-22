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

  const starSubject = async (subject) => {
    try {
      await axios.put(`/api/users/${user.id}/subjects/${subject.id}`, {
        name: subject.name,
        description: subject.description,
        starred: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getSubjects();
    }
  };

  const unStarSubject = async (subject) => {
    try {
      await axios.put(`/api/users/${user.id}/subjects/${subject.id}`, {
        name: subject.name,
        description: subject.description,
        starred: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getSubjects();
    }
  };

  const openCreateSubjectModal = () => {
    setShowCreateSubjectModal(true);
  };
  const closeCreateSubjectModal = () => {
    setShowCreateSubjectModal(false);
  };

  const renderStarredSubjects = () => {
    return subjects.map((subject) => {
      if (subject.starred === true) {
        return (
          <div className="flashcards-subjects-card">
            <div className="flashcards-subjects-card-star-container">
              <Icon.StarFill
                onClick={() => unStarSubject(subject)}
                size={20}
                className="flashcards-subjects-card-star-filled"
              />
            </div>
            <div className="flashcards-subjects-card-text">
              <h3>{subject.name}</h3>
              <h6>{subject.description}</h6>
            </div>
          </div>
        );
      }
    });
  };

  const renderUnStarredSubjects = () => {
    return subjects.map((subject) => {
      if (subject.starred === false) {
        return (
          <div className="flashcards-subjects-card">
            <div className="flashcards-subjects-card-star-container">
              <Icon.Star
                onClick={() => starSubject(subject)}
                size={20}
                className="flashcards-subjects-card-star"
              />
            </div>
            <div className="flashcards-subjects-card-text">
              <h3>{subject.name}</h3>
              <h6>{subject.description}</h6>
            </div>
          </div>
        );
      }
    });
  };
  return (
    <div className="flashcards-subjects">
      <div className="flashcards-subjects-header">
        <h1>Subjects</h1>
        <div className="flashcards-subjects-header-icon">
          <Icon.PlusSquare onClick={openCreateSubjectModal} size={30} />
        </div>
      </div>
      <div className="flashcards-subjects-container">
        {!subjects && (
          <div>
            <h3>Create a Subject!</h3>
          </div>
        )}
        {subjects && renderStarredSubjects()}
        {subjects && renderUnStarredSubjects()}
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

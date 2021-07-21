import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import CreateSubjectModal from "./CreateSubjectModal";

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
  return (
    <div>
      <h1>FlashcardsSubjects</h1>
      <div>
        <span>{JSON.stringify(subjects, null, 2)}</span>
      </div>
      <Button onClick={openCreateSubjectModal}>New Subject</Button>
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

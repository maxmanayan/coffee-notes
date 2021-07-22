import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";
import CreateDeckModal from "./CreateDeckModal";

const FlashcardsDecks = (props) => {
  const { user } = useContext(AuthContext);
  const { switchViewBox, subject } = props;
  const [decks, setDecks] = useState(null);
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);

  useEffect(() => {
    getDecks();
  }, []);

  const getDecks = async () => {
    try {
      let res = await axios.get(
        `/api/users/${user.id}/subjects/${subject.id}/decks`
      );
      setDecks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateDeckModal = () => {
    setShowCreateDeckModal(true);
  };
  const closeCreateDeckModal = () => {
    setShowCreateDeckModal(false);
  };

  return (
    <div className="flashcards-decks">
      <div className="flashcards-decks-header">
        <Button onClick={() => switchViewBox("subjects", null)}>Back</Button>
        <h1>Decks</h1>
        <div className="flashcards-subjects-header-icon">
          <Icon.PlusSquare onClick={openCreateDeckModal} size={30} />
        </div>
      </div>
      {subject && <span>{JSON.stringify(subject, null, 2)}</span>}
      {decks && <span>{JSON.stringify(decks, null, 2)}</span>}
      {showCreateDeckModal && (
        <CreateDeckModal
          closeCreateDeckModal={closeCreateDeckModal}
          getDecks={getDecks}
          subject={subject}
        />
      )}
    </div>
  );
};

export default FlashcardsDecks;

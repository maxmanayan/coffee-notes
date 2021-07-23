import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import CreateFlashcardModal from "./CreateFlashcardModal";
import * as Icon from "react-bootstrap-icons";

const FlashcardsCards = (props) => {
  const { user } = useContext(AuthContext);
  const { switchViewBox, subject, deck } = props;
  const [flashcards, setFlashcards] = useState(null);
  const [showCreateFlashcardModal, setShowCreateFlashcardModal] =
    useState(false);

  useEffect(() => {
    getFlashcards();
  }, []);

  const getFlashcards = async () => {
    try {
      let res = await axios.get(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}/flashcards`
      );
      setFlashcards(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateFlashcardModal = () => {
    setShowCreateFlashcardModal(true);
  };
  const closeCreateFlashcardModal = () => {
    setShowCreateFlashcardModal(false);
  };

  return (
    <div>
      <div>
        <Button onClick={() => switchViewBox("decks", subject, null)}>
          Back
        </Button>
        <h1>{deck.name} Flashcards</h1>
        <div className="flashcards-subjects-header-icon">
          <Icon.PlusSquare onClick={openCreateFlashcardModal} size={30} />
        </div>
      </div>
      <div>
        {flashcards && <span>{JSON.stringify(flashcards, null, 2)}</span>}
      </div>

      {showCreateFlashcardModal && (
        <CreateFlashcardModal
          closeCreateFlashcardModal={closeCreateFlashcardModal}
          subject={subject}
          deck={deck}
          getFlashcards={getFlashcards}
        />
      )}
    </div>
  );
};

export default FlashcardsCards;

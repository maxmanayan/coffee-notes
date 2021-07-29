import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import CreateFlashcardModal from "./CreateFlashcardModal";
import * as Icon from "react-bootstrap-icons";
import FlashcardsCardsIndividual from "./FlashcardsCardsIndividual";

const FlashcardsCardsContainer = (props) => {
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

  const renderStarredFlashcardFronts = () => {
    return flashcards.map((flashcard) => {
      if (flashcard.starred) {
        return (
          <FlashcardsCardsIndividual
            key={flashcard.id}
            subject={subject}
            deck={deck}
            flashcard={flashcard}
            getFlashcards={getFlashcards}
          />
        );
      }
    });
  };

  const renderUnStarredFlashcardFronts = () => {
    return flashcards.map((flashcard) => {
      if (!flashcard.starred) {
        return (
          <FlashcardsCardsIndividual
            key={flashcard.id}
            subject={subject}
            deck={deck}
            flashcard={flashcard}
            getFlashcards={getFlashcards}
          />
        );
      }
    });
  };

  const openCreateFlashcardModal = () => {
    setShowCreateFlashcardModal(true);
  };
  const closeCreateFlashcardModal = () => {
    setShowCreateFlashcardModal(false);
  };

  return (
    <div className="flashcards-cards">
      <div className="flashcards-cards-header">
        <Button
          style={{
            background: " #4a2c2a",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={() => switchViewBox("decks", subject, null)}
        >
          Back
        </Button>
        <h1>{deck.name} Flashcards</h1>
        <div className="flashcards-subjects-header-icon">
          <Icon.PlusSquare onClick={openCreateFlashcardModal} size={30} />
        </div>
      </div>
      <div className="flashcards-cards-container">
        {flashcards && flashcards.length === 0 && (
          <h3>Create New Flashcards</h3>
        )}
        {flashcards && renderStarredFlashcardFronts()}
        {flashcards && renderUnStarredFlashcardFronts()}
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

export default FlashcardsCardsContainer;

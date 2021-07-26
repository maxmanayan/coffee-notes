import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import UpdateFlashcardModal from "./UpdateFlashcardModal";
import DeleteFlashcardConfirmationModal from "./DeleteFlashcardConfirmationModal";

const FlashcardsCardsIndividual = (props) => {
  const { user } = useContext(AuthContext);
  const { subject, deck, flashcard, getFlashcards } = props;
  const [showFront, setShowFront] = useState(true);
  const [showUpdateFlashcardModal, setShowUpdateFlashcardModal] =
    useState(false);
  const [updateFlashcard, setUpdateFlashcard] = useState(null);
  const [showDeleteFlashcardModal, setShowDeleteFlashcardModal] =
    useState(false);
  const [deleteFlashcard, setDeleteFlashcard] = useState(null);

  const starFlashcard = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}/flashcards/${flashcard.id}`,
        {
          front: flashcard.front,
          back: flashcard.back,
          starred: true,
        }
      );
      getFlashcards();
    } catch (error) {
      console.log(error);
    }
  };

  const unStarFlashcard = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}/flashcards/${flashcard.id}`,
        {
          front: flashcard.front,
          back: flashcard.back,
          starred: false,
        }
      );
      getFlashcards();
    } catch (error) {
      console.log(error);
    }
  };

  const openUpdateFlashcardModal = (flashcard) => {
    setShowUpdateFlashcardModal(true);
    setUpdateFlashcard(flashcard);
  };
  const closeUpdateFlashcardModal = () => {
    setShowUpdateFlashcardModal(false);
    setUpdateFlashcard(null);
  };

  const openDeleteFlashcardModal = (flashcard) => {
    setShowDeleteFlashcardModal(true);
    setDeleteFlashcard(flashcard);
  };
  const closeDeleteFlashcardModal = () => {
    setShowDeleteFlashcardModal(false);
    setDeleteFlashcard(null);
  };

  return (
    <div className="flashcards-individual-card-block">
      <div className="flashcards-individual-card">
        <div className="flashcards-subjects-card-icon-container">
          <div className="flashcards-subjects-card-icon-container-left">
            <Icon.X
              onClick={() => openDeleteFlashcardModal(flashcard)}
              className="flashcards-subjects-card-delete"
              size={20}
            />
            <Icon.PencilSquare
              onClick={() => openUpdateFlashcardModal(flashcard)}
              className="flashcards-subjects-card-edit"
              size={20}
            />
          </div>
          <div>{showFront ? <h6>front</h6> : <h6>back</h6>}</div>
          {flashcard.starred ? (
            <Icon.StarFill
              onClick={unStarFlashcard}
              size={20}
              className="flashcards-subjects-card-star-filled"
            />
          ) : (
            <Icon.Star
              onClick={starFlashcard}
              size={20}
              className="flashcards-subjects-card-star"
            />
          )}
        </div>
        <div>
          {showFront ? <h4>{flashcard.front}</h4> : <h4>{flashcard.back}</h4>}
        </div>
      </div>
      <div className="flashcards-individual-card-flip">
        <Icon.ArrowRepeat onClick={() => setShowFront(!showFront)} size={30} />
      </div>

      {showUpdateFlashcardModal && (
        <UpdateFlashcardModal
          closeUpdateFlashcardModal={closeUpdateFlashcardModal}
          subject={subject}
          deck={deck}
          flashcard={flashcard}
          getFlashcards={getFlashcards}
        />
      )}

      {showDeleteFlashcardModal && (
        <DeleteFlashcardConfirmationModal
          closeDeleteFlashcardModal={closeDeleteFlashcardModal}
          subject={subject}
          deck={deck}
          flashcard={flashcard}
          getFlashcards={getFlashcards}
        />
      )}
    </div>
  );
};

export default FlashcardsCardsIndividual;

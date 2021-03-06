import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";
import CreateDeckModal from "./CreateDeckModal";
import UpdateDeckModal from "./UpdateDeckModal";
import DeleteDeckConfirmationModel from "./DeleteDeckConfirmationModal";

const FlashcardsDecks = (props) => {
  const { user } = useContext(AuthContext);
  const { switchViewBox, subject } = props;
  const [decks, setDecks] = useState(null);
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);
  const [showUpdateDeckModal, setShowUpdateDeckModal] = useState(false);
  const [updateDeck, setUpdateDeck] = useState(null);
  const [showDeleteDeckModal, setShowDeleteDeckModal] = useState(false);
  const [deleteDeck, setDeleteDeck] = useState(null);

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

  const starDeck = async (deck) => {
    try {
      await axios.put(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}`,
        {
          name: deck.name,
          description: deck.description,
          starred: true,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      getDecks();
    }
  };

  const unStarDeck = async (deck) => {
    try {
      await axios.put(
        `/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}`,
        {
          name: deck.name,
          description: deck.description,
          starred: false,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      getDecks();
    }
  };

  const renderStarredDecks = () => {
    return decks.map((deck) => {
      if (deck.starred) {
        return (
          <div className="flashcards-decks-card">
            <div className="flashcards-subjects-card-icon-container">
              <div className="flashcards-subjects-card-icon-container-left">
                <Icon.X
                  onClick={() => openDeleteDeckModal(deck)}
                  className="flashcards-subjects-card-delete"
                  size={20}
                />
                <Icon.PencilSquare
                  onClick={() => openUpdateDeckModal(deck)}
                  className="flashcards-subjects-card-edit"
                  size={20}
                />
              </div>
              <Icon.StarFill
                onClick={() => unStarDeck(deck)}
                size={20}
                className="flashcards-subjects-card-star-filled"
              />
            </div>
            <div className="flashcards-decks-card-text">
              <h3 className="flashcards-decks-card-text-header">{deck.name}</h3>
              <h5 className="flashcards-decks-card-text-subheader">
                {deck.description}
              </h5>
            </div>
            <div className="flashcards-decks-card-button">
              <Button
                style={{
                  background: " #4a2c2a",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => switchViewBox("flashcards", subject, deck)}
              >
                Study Flashcards
              </Button>
            </div>
          </div>
        );
      }
    });
  };

  const renderUnStarredDecks = () => {
    return decks.map((deck) => {
      if (!deck.starred) {
        return (
          <div className="flashcards-decks-card">
            <div className="flashcards-subjects-card-icon-container">
              <div className="flashcards-subjects-card-icon-container-left">
                <Icon.X
                  onClick={() => openDeleteDeckModal(deck)}
                  className="flashcards-subjects-card-delete"
                  size={20}
                />
                <Icon.PencilSquare
                  onClick={() => openUpdateDeckModal(deck)}
                  className="flashcards-subjects-card-edit"
                  size={20}
                />
              </div>
              <Icon.Star
                onClick={() => starDeck(deck)}
                size={20}
                className="flashcards-subjects-card-star"
              />
            </div>
            <div className="flashcards-decks-card-text">
              <h3 className="flashcards-decks-card-text-header">{deck.name}</h3>
              <h5 className="flashcards-decks-card-text-subheader">
                {deck.description}
              </h5>
            </div>
            <div className="flashcards-decks-card-button">
              <Button
                style={{
                  background: " #4a2c2a",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => switchViewBox("flashcards", subject, deck)}
              >
                Study Flashcards
              </Button>
            </div>
          </div>
        );
      }
    });
  };

  const openCreateDeckModal = () => {
    setShowCreateDeckModal(true);
  };
  const closeCreateDeckModal = () => {
    setShowCreateDeckModal(false);
  };

  const openUpdateDeckModal = (deck) => {
    setShowUpdateDeckModal(true);
    setUpdateDeck(deck);
  };
  const closeUpdateDeckModal = () => {
    setShowUpdateDeckModal(false);
    setUpdateDeck(null);
  };

  const openDeleteDeckModal = (deck) => {
    setShowDeleteDeckModal(true);
    setDeleteDeck(deck);
  };
  const closeDeleteDeckModal = () => {
    setShowDeleteDeckModal(false);
    setDeleteDeck(null);
  };

  return (
    <div className="flashcards-decks">
      <div className="flashcards-decks-header">
        <Button
          style={{
            background: " #4a2c2a",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={() => switchViewBox("subjects", null, null)}
        >
          Back
        </Button>
        <h1>{subject.name} Decks</h1>
        <div className="flashcards-subjects-header-icon">
          <Icon.PlusSquare onClick={openCreateDeckModal} size={30} />
        </div>
      </div>
      <div className="flashcards-decks-card-container">
        {decks && decks.length === 0 && (
          <div className="flashcards-empty-state">
            <h1>Create a New Deck</h1>
            <div className="flashcards-subjects-header-icon">
              <Icon.PlusSquare onClick={openCreateDeckModal} size={30} />
            </div>
          </div>
        )}
        {decks && renderStarredDecks()}
        {decks && renderUnStarredDecks()}
      </div>

      {showCreateDeckModal && (
        <CreateDeckModal
          closeCreateDeckModal={closeCreateDeckModal}
          getDecks={getDecks}
          subject={subject}
        />
      )}
      {showUpdateDeckModal && (
        <UpdateDeckModal
          closeUpdateDeckModal={closeUpdateDeckModal}
          subject={subject}
          deck={updateDeck}
          getDecks={getDecks}
        />
      )}
      {showDeleteDeckModal && (
        <DeleteDeckConfirmationModel
          closeDeleteDeckModal={closeDeleteDeckModal}
          subject={subject}
          deck={deleteDeck}
          getDecks={getDecks}
        />
      )}
    </div>
  );
};

export default FlashcardsDecks;

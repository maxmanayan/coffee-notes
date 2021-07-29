import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import DeleteDeckConfirmationModel from "./DeleteDeckConfirmationModal";
import UpdateDeckModal from "./UpdateDeckModal";
import * as Icon from "react-bootstrap-icons";

const FlashcardsAllDecks = (props) => {
  const { user } = useContext(AuthContext);
  const { search, setSearch, switchViewBox } = props;
  const [subjects, setSubjects] = useState([]);
  const [allDecks, setAllDecks] = useState([]);
  const [subject, setSubject] = useState([]);
  const [showUpdateDeckModal, setShowUpdateDeckModal] = useState(false);
  const [updateDeck, setUpdateDeck] = useState(null);
  const [showDeleteDeckModal, setShowDeleteDeckModal] = useState(false);
  const [deleteDeck, setDeleteDeck] = useState(null);

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/subjects`);
      setSubjects(res.data);
      loopSubjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loopSubjects = (subjects) => {
    subjects.forEach((subject) => {
      getAllDecks(subject);
    });
  };

  const getAllDecks = async (subject) => {
    try {
      let res = await axios.get(
        `/api/users/${user.id}/subjects/${subject.id}/decks`
      );
      setAllDecks((allDecks) => [...allDecks, ...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // const loopAllDecks = (allDecks) => {
  //   allDecks.forEach(deck => {
  //     getAllDecks
  //   })
  // }

  // const getAllFlashcards = async () => {
  //   try {
  //     let res = await axios.get(`/api/users/${user.id}/subjects/${subject.id}/decks/${deck.id}/flashcards`)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const renderStarredDecks = () => {
    return allDecks
      .filter((deck) => {
        if (
          deck.name.toLowerCase().includes(search.toLowerCase()) ||
          deck.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return deck;
        }
      })
      .map((deck) => {
        let subjectObj = subjects.filter((subject) => {
          if (subject.id === deck.subject_id) return subject;
        });
        if (deck.starred) {
          return (
            <div className="flashcards-decks-card">
              <div className="flashcards-subjects-card-icon-container">
                <div className="flashcards-subjects-card-icon-container-left">
                  {/* <Icon.X
                    onClick={() => openDeleteDeckModal(deck)}
                    className="flashcards-subjects-card-delete"
                    size={20}
                  />
                  <Icon.PencilSquare
                    onClick={() => openUpdateDeckModal(deck)}
                    className="flashcards-subjects-card-edit"
                    size={20}
                  /> */}
                  <h6>in {subjectObj[0].name}</h6>
                </div>
                <Icon.StarFill
                  onClick={() => unStarDeck(deck, ...subjectObj)}
                  size={20}
                  className="flashcards-subjects-card-star-filled"
                />
              </div>
              <div className="flashcards-decks-card-text">
                <h3 className="flashcards-decks-card-text-header">
                  {deck.name}
                </h3>
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
                  onClick={() => switchToFlashcard(deck, ...subjectObj)}
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
    return allDecks
      .filter((deck) => {
        if (
          deck.name.toLowerCase().includes(search.toLowerCase()) ||
          deck.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return deck;
        }
      })
      .map((deck) => {
        let subjectObj = subjects.filter((subject) => {
          if (subject.id === deck.subject_id) return { ...subject };
        });
        if (!deck.starred) {
          return (
            <div className="flashcards-decks-card">
              <div className="flashcards-subjects-card-icon-container">
                <div className="flashcards-subjects-card-icon-container-left">
                  {/* <Icon.X
                    onClick={() => openDeleteDeckModal(deck)}
                    className="flashcards-subjects-card-delete"
                    size={20}
                  />
                  <Icon.PencilSquare
                    onClick={() => openUpdateDeckModal(deck)}
                    className="flashcards-subjects-card-edit"
                    size={20}
                  /> */}
                  <h6>in {subjectObj[0].name}</h6>
                </div>
                <Icon.Star
                  onClick={() => starDeck(deck, ...subjectObj)}
                  size={20}
                  className="flashcards-subjects-card-star"
                />
              </div>
              <div className="flashcards-decks-card-text">
                <h3 className="flashcards-decks-card-text-header">
                  {deck.name}
                </h3>
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
                  onClick={() => switchToFlashcard(deck, ...subjectObj)}
                >
                  Study Flashcards
                </Button>
              </div>
            </div>
          );
        }
      });
  };

  const switchToFlashcard = (deck, subject) => {
    setSearch("");
    switchViewBox("flashcards", subject, deck);
  };

  const starDeck = async (deck, subject) => {
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
      setAllDecks([]);
      getSubjects();
    }
  };

  const unStarDeck = async (deck, subject) => {
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
      setAllDecks([]);
      getSubjects();
    }
  };

  const openUpdateDeckModal = (deck) => {
    setShowUpdateDeckModal(true);
    setUpdateDeck(deck);
    setSubject(
      ...subjects.filter((subject) => {
        if (subject.id === deck.subject_id) return subject;
      })
    );
  };
  const closeUpdateDeckModal = () => {
    setShowUpdateDeckModal(false);
    setUpdateDeck(null);
    setSubject(null);
    setAllDecks([]);
    getSubjects();
  };

  const openDeleteDeckModal = (deck) => {
    setShowDeleteDeckModal(true);
    setDeleteDeck(deck);
    setSubject(
      ...subjects.filter((subject) => {
        if (subject.id === deck.subject_id) return subject;
      })
    );
  };
  const closeDeleteDeckModal = () => {
    setShowDeleteDeckModal(false);
    setDeleteDeck(null);
    setSubject(null);
    setAllDecks([]);
    getSubjects();
  };

  return (
    <div>
      <h1>Searching Decks...</h1>
      <div className="flashcards-decks-card-container">
        {allDecks && renderStarredDecks()}
        {allDecks && renderUnStarredDecks()}
      </div>

      {showUpdateDeckModal && (
        <UpdateDeckModal
          closeUpdateDeckModal={closeUpdateDeckModal}
          subject={subject}
          deck={updateDeck}
          getAllDecks={getAllDecks}
        />
      )}
      {showDeleteDeckModal && (
        <DeleteDeckConfirmationModel
          closeDeleteDeckModal={closeDeleteDeckModal}
          subject={subject}
          deck={deleteDeck}
          getAllDecks={getAllDecks}
        />
      )}
    </div>
  );
};

export default FlashcardsAllDecks;

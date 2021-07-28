import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";

const FlashcardsAllDecks = (props) => {
  const { user } = useContext(AuthContext);
  const { search, setSearch, switchViewBox } = props;
  const [subjects, setSubjects] = useState([]);

  const [allDecks, setAllDecks] = useState([]);

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

  const renderDecks = () => {
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
        if (!deck) {
          return (
            <div>
              <h1>No Decks</h1>
            </div>
          );
        }
        return (
          <div className="flashcards-decks-card">
            <div className="flashcards-subjects-card-icon-container">
              {/* <div className="flashcards-subjects-card-icon-container-left">
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
              /> */}
            </div>
            <div>
              <h3>{deck.name}</h3>
              <h5>{deck.description}</h5>
            </div>
            <div>
              <Button
                onClick={() =>
                  // switchViewBox(
                  //   "flashcards",
                  //   ...subjects.filter((subject) => {
                  //     if (subject.id === deck.subject_id) return subject;
                  //   }),
                  //   deck
                  // )
                  switchToFlashcard(deck)
                }
              >
                Study Flashcards
              </Button>
            </div>
          </div>
        );
      });
  };

  const switchToFlashcard = (deck) => {
    setSearch("");
    switchViewBox(
      "flashcards",
      ...subjects.filter((subject) => {
        if (subject.id === deck.subject_id) return subject;
      }),
      deck
    );
  };

  return (
    <div>
      <h1>Searching Decks...</h1>
      <div className="flashcards-decks-card-container">
        {allDecks && renderDecks()}
      </div>
    </div>
  );
};

export default FlashcardsAllDecks;

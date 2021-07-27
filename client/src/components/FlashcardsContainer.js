import React, { useContext, useReducer, useState } from "react";
import { ArrowUpSquareFill } from "react-bootstrap-icons";
import { AuthContext } from "../providers/AuthProvider";
import FlashcardsCardsContainer from "./FlashcardsCardsContainer";
import FlashcardsDecks from "./FlashcardsDecks";
import FlashcardsSearchBar from "./FlashcardsSearchBar";
import FlashcardsSubjects from "./FlashcardsSubjects";

const FlashcardsContainer = () => {
  const { user } = useContext(AuthContext);
  const [screen, setScreen] = useState("subjects");
  const [search, setSearch] = useState(null);
  const [subject, setSubject] = useState(null);
  const [deck, setDeck] = useState(null);

  const switchViewBox = (screenType, subject, deck) => {
    setScreen(screenType);
    setSubject(subject);
    setDeck(deck);
  };

  return (
    <div className="flashcards-container">
      <h1>Flashcards</h1>
      {/* <div className="flashcards-searchbar">
        <FlashcardsSearchBar search={search} setSearch={setSearch} />
      </div> */}
      <div className="flashcards-viewbox">
        {screen === "subjects" && (
          <FlashcardsSubjects switchViewBox={switchViewBox} key={user.id} />
        )}
        {screen === "decks" && (
          <FlashcardsDecks
            switchViewBox={switchViewBox}
            subject={subject}
            key={subject.id}
          />
        )}
        {screen === "flashcards" && (
          <FlashcardsCardsContainer
            switchViewBox={switchViewBox}
            subject={subject}
            deck={deck}
          />
        )}
      </div>
    </div>
  );
};

export default FlashcardsContainer;

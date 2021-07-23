import React, { useState } from "react";
import FlashcardsCardsContainer from "./FlashcardsCardsContainer";
import FlashcardsDecks from "./FlashcardsDecks";
import FlashcardsSubjects from "./FlashcardsSubjects";

const FlashcardsContainer = () => {
  const [screen, setScreen] = useState("subjects");
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
      <div className="flashcards-searchbar">
        <h3>[Search Bar Here]</h3>
      </div>
      <div className="flashcards-viewbox">
        {screen === "subjects" && (
          <FlashcardsSubjects switchViewBox={switchViewBox} />
        )}
        {screen === "decks" && (
          <FlashcardsDecks switchViewBox={switchViewBox} subject={subject} />
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

import React, { useState } from "react";
import FlashcardsDecks from "./FlashcardsDecks";
import FlashcardsSubjects from "./FlashcardsSubjects";

const FlashcardsContainer = () => {
  const [screen, setScreen] = useState("subjects");
  const [data, setData] = useState(null);

  const switchViewBox = (screenType, dataType) => {
    setScreen(screenType);
    setData(dataType);
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
          <FlashcardsDecks switchViewBox={switchViewBox} subject={data} />
        )}
      </div>
    </div>
  );
};

export default FlashcardsContainer;

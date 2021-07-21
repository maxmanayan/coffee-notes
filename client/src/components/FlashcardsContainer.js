import React from "react";
import FlashcardsSubjects from "./FlashcardsSubjects";

const FlashcardsContainer = () => {
  return (
    <div className="flashcards-container">
      <h1>FlashcardsContainer</h1>
      <div>
        <h3>Search Bar Here</h3>
      </div>
      <div>
        <FlashcardsSubjects />
      </div>
    </div>
  );
};

export default FlashcardsContainer;

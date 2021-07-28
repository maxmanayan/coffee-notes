import React from "react";

const FlashcardsSearchBar = (props) => {
  const { search, setSearch, setScreen } = props;

  const startSearchFilter = (e) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setScreen("subjects");
    } else {
      setScreen("allDecks");
    }
  };
  return (
    <div className="flashcards-searchbar-container">
      <input
        className="flashcards-searchbar"
        placeholder="Search for a deck..."
        value={search}
        onChange={startSearchFilter}
      />
    </div>
  );
};

export default FlashcardsSearchBar;

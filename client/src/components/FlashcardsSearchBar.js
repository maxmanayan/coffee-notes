import React from "react";

const FlashcardsSearchBar = (props) => {
  const { setSearch } = props;
  return (
    <div>
      <input
        placeholder="Search for a deck..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default FlashcardsSearchBar;

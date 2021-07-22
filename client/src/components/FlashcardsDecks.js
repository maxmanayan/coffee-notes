import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";

const FlashcardsDecks = (props) => {
  const { user } = useContext(AuthContext);
  const { switchViewBox, subject } = props;

  return (
    <div>
      <h1>Decks</h1>
      <Button onClick={() => switchViewBox("subjects", null)}>Back</Button>
      {subject && <span>{JSON.stringify(subject, null, 2)}</span>}
    </div>
  );
};

export default FlashcardsDecks;

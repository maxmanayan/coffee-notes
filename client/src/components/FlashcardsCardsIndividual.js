import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";

const FlashcardsCardsIndividual = (props) => {
  const { user } = useContext(AuthContext);
  const { flashcard } = props;
  const [showFront, setShowFront] = useState(true);

  return (
    <div className="flashcards-individual-card">
      <div>
        {showFront && <h4>{flashcard.front}</h4>}

        {!showFront && <h4>{flashcard.back}</h4>}
      </div>
      <div>
        <Icon.ArrowRepeat onClick={() => setShowFront(!showFront)} />
      </div>
    </div>
  );
};

export default FlashcardsCardsIndividual;

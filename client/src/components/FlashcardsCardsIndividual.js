import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import * as Icon from "react-bootstrap-icons";

const FlashcardsCardsIndividual = (props) => {
  const { user } = useContext(AuthContext);
  const { flashcard } = props;
  const [showFront, setShowFront] = useState(true);

  return (
    <div className="flashcards-individual-card-block">
      <div className="flashcards-individual-card">
        <div className="flashcards-subjects-card-icon-container">
          <div className="flashcards-subjects-card-icon-container-left">
            <Icon.X
              onClick={() => console.log("delete clicked")}
              className="flashcards-subjects-card-delete"
              size={20}
            />
            <Icon.PencilSquare
              onClick={() => console.log("edit clicked")}
              className="flashcards-subjects-card-edit"
              size={20}
            />
          </div>
          <Icon.Star
            onClick={() => console.log("star clicked")}
            size={20}
            className="flashcards-subjects-card-star"
          />
        </div>
        <div>
          {showFront && <h4>{flashcard.front}</h4>}

          {!showFront && <h4>{flashcard.back}</h4>}
        </div>
      </div>
      <div className="flashcards-individual-card-flip">
        <Icon.ArrowRepeat onClick={() => setShowFront(!showFront)} size={30} />
      </div>
    </div>
  );
};

export default FlashcardsCardsIndividual;

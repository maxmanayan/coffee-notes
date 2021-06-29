import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="no-match">
      <div className="no-match-text-container">
        <h1 className="no-match-text">
          The Page You Are Looking For Doesn't Exist!
        </h1>
        <Link className="no-match-link" to="/home">
          <h1> Return Home</h1>
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;

import React, { useState } from "react";

const YoutubeSelection = (props) => {
  const { embedID, setEmbedID } = props;

  return (
    <>
      <h1 className="yt-selection-header">Study Music</h1>
      <h3 className="yt-selection-subheader">Genres</h3>
      <div className="yt-genre-container">
        <h5
          className={`${embedID === null ? "yt-genre-active" : "yt-genre"}`}
          onClick={() => setEmbedID(null)}
        >
          No Music
        </h5>
        <h5
          className={`${
            embedID === "_3IphE64yRA" ? "yt-genre-active" : "yt-genre"
          }`}
          onClick={() => setEmbedID("7P9e9xTI_oA")}
        >
          Classical
        </h5>
        <h5
          className={`${
            embedID === "5qap5aO4i9A" ? "yt-genre-active" : "yt-genre"
          }`}
          onClick={() => setEmbedID("5qap5aO4i9A")}
        >
          Lofi
        </h5>
        {/* <h5
          className={`${
            embedID === "Mk0EcgzqnDw" ? "yt-genre-active" : "yt-genre"
          }`}
          onClick={() => setEmbedID("Mk0EcgzqnDw")}
        >
          Jazz
        </h5> */}
        <h5
          className={`${
            embedID === "P8j-_MOSrec" ? "yt-genre-active" : "yt-genre"
          }`}
          onClick={() => setEmbedID("YymhpFhQ0Gw")}
        >
          Ghibli
        </h5>
        {/* <h5
          className={`${
            embedID === "djHloBCSF5g" ? "yt-genre-active" : "yt-genre"
          }`}
          onClick={() => setEmbedID("djHloBCSF5g")}
        >
          Rainfall
        </h5> */}
        <h5
          className={`${
            embedID === "HMnatoiMdjA" ? "yt-genre-active" : "yt-genre"
          }`}
          onClick={() => setEmbedID("HMnatoiMdjA")}
        >
          Nature
        </h5>
      </div>
    </>
  );
};

export default YoutubeSelection;

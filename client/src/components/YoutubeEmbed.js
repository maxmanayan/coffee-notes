import React, { useState } from "react";
import YoutubeSelection from "./YoutubeSelection";

const YoutubeEmbed = () => {
  const [embedID, setEmbedID] = useState(null);

  return (
    <div className="yt-embed">
      <div>
        <YoutubeSelection embedID={embedID} setEmbedID={setEmbedID} />
      </div>
      {embedID && (
        <div className="yt-iframe-container">
          <iframe
            className="yt-iframe"
            src={`https://www.youtube.com/embed/${embedID}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      )}
      {!embedID && (
        <div className="yt-embed-empty-state">
          <h1>Play Some Background Music!</h1>
          <h3>Select a Genre Above</h3>
        </div>
      )}
    </div>
  );
};

export default YoutubeEmbed;

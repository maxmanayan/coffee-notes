import React, { useState } from "react"
import YoutubeSelection from "./YoutubeSelection"

const YoutubeEmbed = () => {
  const [ embedID, setEmbedID ] = useState(null)

  return(
    <div className="yt-embed">
      <div>
        <YoutubeSelection setEmbedID={setEmbedID} />
      </div>
      {embedID && 
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${embedID}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      }
      {!embedID && 
        <h1>Select a Genre Above!</h1>
      }
    </div>
  )
}

export default YoutubeEmbed
import React, { useState } from "react"

const YoutubeSelection = (props) => {
  const [ genrePicked, setGenrePicked ] = useState(null)
  const { setEmbedID } = props

  return(
    <>
      <h1>Study Music!</h1>
      <h2>Genres</h2>
      <div className='yt-genre-container'>
        <h5 className={`yt-genre`} onClick={() => setEmbedID(null)}>No Music</h5>
        <h5 className={`yt-genre`} onClick={() => setEmbedID('_3IphE64yRA')} >Classical</h5>
        <h5 className={`yt-genre`} onClick={() => setEmbedID('5qap5aO4i9A')} >Lofi</h5>
        <h5 className={`yt-genre`} onClick={() => setEmbedID('VWPRIe4ft10')} >Rainfall</h5>
      </div>
    </>
  )
}

export default YoutubeSelection
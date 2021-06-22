import React, { useState } from "react"

const YoutubeSelection = (props) => {
  const { embedID, setEmbedID } = props

  return(
    <>
      <h1 className='yt-selection-header'>Study Music</h1>
      <h3 className='yt-selection-subheader'>Genres</h3>
      <div className='yt-genre-container'>
        <h5 className={`${embedID === null ? 'yt-genre-active' : 'yt-genre'}`} onClick={() => setEmbedID(null)}>No Music</h5>
        <h5 className={`${embedID === '_3IphE64yRA' ? 'yt-genre-active' : 'yt-genre'}`} onClick={() => setEmbedID('_3IphE64yRA')} >Classical</h5>
        <h5 className={`${embedID === '5qap5aO4i9A' ? 'yt-genre-active' : 'yt-genre'}`} onClick={() => setEmbedID('5qap5aO4i9A')} >Lofi</h5>
        <h5 className={`${embedID === '52mx7rgZD8g' ? 'yt-genre-active' : 'yt-genre'}`} onClick={() => setEmbedID('52mx7rgZD8g')} >Jazz</h5>
        <h5 className={`${embedID === 'VWPRIe4ft10' ? 'yt-genre-active' : 'yt-genre'}`} onClick={() => setEmbedID('VWPRIe4ft10')} >Rainfall</h5>
        <h5 className={`${embedID === 'P8j-_MOSrec' ? 'yt-genre-active' : 'yt-genre'}`} onClick={() => setEmbedID('P8j-_MOSrec')} >Ghibli</h5>
      </div>
    </>
  )
}

export default YoutubeSelection
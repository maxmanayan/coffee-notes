import React from 'react';
import * as Icon from 'react-bootstrap-icons';

const SideBar = () => {
  return(
    <div className='sidebar'>
      <div className='sidebar-icon-notes'>
        <Icon.ListCheck size={50} />
      </div>
      <div className='sidebar-icon-music'>
        <Icon.MusicNoteBeamed size={50} />
      </div>
    </div>
  )
}

export default SideBar
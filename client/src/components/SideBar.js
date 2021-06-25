import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-scroll';

const SideBar = () => {
  return(
    <div className='sidebar'>
      <Link
        activeClass="active"
        to="home-notes"
        smooth={true}
        offset={-80}
        duration={100}
      >
        <div className='sidebar-icon-notes'>
          <Icon.ListCheck size={50} />
        </div>
      </Link>
      <Link
        activeClass="active"
        to="home-music"
        smooth={true}
        offset={30}
        duration={100}
      >
        <div className='sidebar-icon-music'>
          <Icon.MusicNoteBeamed size={50} />
        </div>
      </Link>
      <Link
        activeClass="active"
        to="home-quote"
        smooth={true}
        offset={30}
        duration={100}
      >
        <div className='sidebar-icon-quote'>
          <Icon.ChatQuote size={48} />
        </div>
      </Link>
    </div>
  )
}

export default SideBar
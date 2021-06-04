import React from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import AboutComingSoon from '../components/AboutComingSoon';
import AboutCreator from '../components/AboutCreator';
import AboutWebsite from '../components/AboutWebsite';

const About = () => {
  return(
    <div className='about'>
      <h1 className='about-header'>About</h1>
      <div className='about-button-container'>
        <div className='about-icon-website'>
          {/* <Link to='about-website'> */}
            <Icon.TvFill color='#090804' size={200}/>
            <h3 className='about-icon-text'>Coffee Notes</h3>
          {/* </Link> */}
        </div>
        <div className='about-icon-creator'>
          <Icon.PersonFill color='#090804' size={200}/>
          <h3 className='about-icon-text'>The Developer</h3>
        </div>
        <div className='about-icon-coming-soon'>
          <Icon.ForwardFill color='#090804' size={200}/>
          <h3 className='about-icon-text'>Future Features</h3>
        </div>
      </div>
      <div>
        <AboutWebsite />
        <AboutCreator />
        <AboutComingSoon />
      </div>
    </div>
  )
}

export default About
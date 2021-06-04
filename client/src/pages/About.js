import React from 'react';
import { Button } from 'react-bootstrap';
import AboutComingSoon from '../components/AboutComingSoon';
import AboutCreator from '../components/AboutCreator';
import AboutWebsite from '../components/AboutWebsite';

const About = () => {
  return(
    <div className='about'>
      <h1>About</h1>
      <div>
        <Button>Coffee Notes</Button>
        <Button>Max Manayan</Button>
        <Button>Future Features</Button>
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
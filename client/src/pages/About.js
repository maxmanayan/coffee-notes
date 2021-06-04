import React from 'react';
import AboutComingSoon from '../components/AboutComingSoon';
import AboutCreator from '../components/AboutCreator';
import AboutWebsite from '../components/AboutWebsite';

const About = () => {
  return(
    <div className='about'>
      <h1>About</h1>
      <div>
        <AboutWebsite />
        <AboutCreator />
        <AboutComingSoon />
      </div>
    </div>
  )
}

export default About
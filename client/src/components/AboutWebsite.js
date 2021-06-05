import React from 'react';
import { Image } from 'react-bootstrap';
import dash from '../images/coffee-notes-dash.jpg'

const AboutWebsite = () => {
  return(
    <div id='about-website' className='about-website'>
      <h1 className='about-website-header'>About Coffee Notes</h1>
      <Image src={dash} style={{height: '50vh', borderRadius: '5px'}} />
      <div className='about-website-text-container'>
        <h3 className='about-website-text'>The Best Parts of a Cafe... To Go!</h3>
        <p className='about-website-text'>
          Coffee Notes is an app built to improve task organization.
          Inspired by the greatest drink on the face of the Earth,
          the design of this app is meant to establish a calm, focused mood
          in its users. Those who use Coffee Notes are encouraged to take advantage
          of the drag and drop notes and built-in checklist. 
        </p>
      </div>
    </div>
  )
}

export default AboutWebsite
import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import maxPic from '../images/max.jpeg'

const AboutCreator = () => {
  return(
    <div id='about-creator' className='about-creator'>
      <h1 className='about-creator-header'>About the Developer</h1>
      <Row className='about-creator-content'>
        <Col sm={12} md={{span: 5, offset: 1}}>
          <h2 className='about-creator-text'>Max Manayan</h2>
          <h5 className='about-creator-text'>
            Hello, I am a full stack developer who loves building applications 
            to help others! I love learning about new tech and improving my craft 
            whenever I get the chance!
          </h5>
          <h5 className='about-creator-text'>
            If you have any suggestions to improve this app, or any features you 
            would like to see added, click the link below and connect with me!
          </h5>
          <h5 className='about-creator-text'>
            Important Info:
          </h5>
          <h6 className='about-creator-text'>
            Favorite Language: JavaScript
          </h6>
          <h6 className='about-creator-text'>
            Favorite Cafe: The Barista Parlor in Nashville, TN
          </h6>
          <h6 className='about-creator-text'>
            What I Drank While Building This: Starbucks Pikes Place Roast
          </h6>
          <a className='about-creator-link' target='_blank' href='https://maxmanayan.netlify.app/'>
           Checkout my other projects!
          </a>
        </Col>
        <Col sm={12} md={6}>
          <Image src={maxPic} style={{width: '30vw', borderRadius: '5px'}} />
        </Col>
      </Row>
    </div>
  )
}

export default AboutCreator
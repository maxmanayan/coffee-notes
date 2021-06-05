import React from 'react';
import { Col, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const AboutComingSoon = () => {
  return(
    <div id='about-coming-soon' className='about-coming-soon'>
      <h1 className='about-coming-soon-header'>Coming Soon...</h1>
      <div>
        <div className='about-coming-soon-content'>
          {/* <Col xs={12} md={{span: 12, offset: 5}}> */}
            <Row className='about-coming-soon-row'>
              <Col xs={12} md={{span: 1, offset: 3}}>
                <Icon.UiChecksGrid color='#090804' size={75} />
              </Col>
              <Col xs={12} md={5}>
                <h3 className='about-coming-soon-text'>Smoother Drag and Drop Function</h3>
              </Col>
            </Row>
            <Row className='about-coming-soon-row'>
              <Col xs={12} md={{span: 1, offset: 3}}>
                <Icon.ClockFill color='#090804' size={75} />
              </Col>
              <Col xs={12} md={5}>
                <h3 className='about-coming-soon-text'>World Clock and Timer</h3>
              </Col>
            </Row>
            <Row className='about-coming-soon-row'>
              <Col xs={12} md={{span: 1, offset: 3}}>
                <Icon.Earbuds color='#090804' size={75} />
              </Col>
              <Col xs={12} md={5}>
                <h3 className='about-coming-soon-text'>Study Playlist to Help You Focus!</h3>
              </Col>
            </Row>
            <Row className='about-coming-soon-row'>
              <Col xs={12} md={{span: 1, offset: 3}}>
                <Icon.PersonSquare color='#090804' size={75} />
              </Col>
              <Col xs={12} md={5}>
                <h3 className='about-coming-soon-text'>Greater Customization of User Profile</h3>
              </Col>
            </Row>
            <Row className='about-coming-soon-row'>
              <Col xs={12} md={{span: 1, offset: 3}}>
                <Icon.EmojiLaughingFill color='#090804' size={75} />
              </Col>
              <Col xs={12} md={5}>
                <h3 className='about-coming-soon-text'>Daily Motivational Quotes</h3>
              </Col>
            </Row>
          {/* </Col> */}
        </div>
        <div>
          <a className='about-coming-soon-link' 
             target='_blank' 
             href='https://maxmanayan.netlify.app/connect'
          >
            Make a Suggestion!
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutComingSoon
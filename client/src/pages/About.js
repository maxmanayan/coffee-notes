import React from "react";
import { Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-scroll";
import AboutComingSoon from "../components/AboutComingSoon";
import AboutCreator from "../components/AboutCreator";
import AboutWebsite from "../components/AboutWebsite";

const About = () => {
  return (
    <div className="about">
      <h1 className="about-header">About</h1>
      <Col xs={12} md={12}>
        <div className="about-button-container">
          <Link
            activeClass="active"
            to="about-website"
            spy={true}
            smooth={true}
            offset={0}
            duration={300}
          >
            <div className="about-icon-website">
              <Icon.TvFill color="#090804" size={200} />
              <h3 className="about-icon-text">Coffee Notes</h3>
            </div>
          </Link>
          <Link
            activeClass="active"
            to="about-creator"
            spy={true}
            smooth={true}
            offset={0}
            duration={300}
          >
            <div className="about-icon-creator">
              <Icon.PersonFill color="#090804" size={200} />
              <h3 className="about-icon-text">The Developer</h3>
            </div>
          </Link>
          <Link
            activeClass="active"
            to="about-coming-soon"
            spy={true}
            smooth={true}
            offset={0}
            duration={300}
          >
            <div className="about-icon-coming-soon">
              <Icon.ForwardFill color="#090804" size={200} />
              <h3 className="about-icon-text">Future Features</h3>
            </div>
          </Link>
        </div>
      </Col>
      <div>
        <AboutWebsite />
        <AboutCreator />
        <AboutComingSoon />
      </div>
    </div>
  );
};

export default About;

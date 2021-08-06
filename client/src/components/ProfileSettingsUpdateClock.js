import React from "react";
import { Form } from "react-bootstrap";

const ProfileSettingsUpdateClock = (props) => {
  return (
    <div>
      <div className="user-profile-clock-toggle">
        <h3>Clock</h3>
        <div className="user-profile-clock-switch">
          <label className="clock-switch">
            <input
              type="checkbox"
              onClick={() => console.log("switch clicked")}
            />
            <span className="clock-switch-slider"></span>
          </label>
        </div>
      </div>
      <div className="user-profile-clock-form">
        <Form>
          <div className="user-profile-clock-form-radios">
            <h6>Clock Type</h6>
            <div>
              <Form.Check
                inline
                label="12 hour"
                name="group1"
                type="radio"
                id="inline-radio-1"
              />
              <Form.Check
                inline
                label="24 hour"
                name="group1"
                type="radio"
                id="inline-radio-2"
              />
            </div>
          </div>
          <div className="user-profile-clock-form-checkbox">
            <h6>Show seconds</h6>
            <Form.Check name="group1" type="checkbox" id="checkbox" />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfileSettingsUpdateClock;

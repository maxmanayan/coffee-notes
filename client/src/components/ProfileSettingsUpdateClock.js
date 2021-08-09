import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";

const ProfileSettingsUpdateClock = (props) => {
  const { user } = useContext(AuthContext);

  const [clock, setClock] = useState(null);

  useEffect(() => {
    getClock();
  }, []);

  const getClock = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/clocks`);
      setClock(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createClock = async (e) => {
    e.preventDefault();
    try {
      if (clock.length === 0) {
        console.log("no clock created yet");
        await axios.post(`/api/users/${user.id}/clocks`, {
          show: true,
          format: "h:mm:ss A",
          ticking: true,
          timezone: null,
        });
      } else {
        console.log("Already a clock here");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="user-profile-clock-toggle">
        <h3>Clock</h3>
        <div className="user-profile-clock-switch">
          <label className="clock-switch">
            <input type="checkbox" onClick={createClock} />
            <span className="clock-switch-slider"></span>
          </label>
        </div>
        {clock ? (
          <span>{JSON.stringify(clock, null, 2)}</span>
        ) : (
          <p>No Clock</p>
        )}
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

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";

const ProfileSettingsUpdateClock = (props) => {
  const { user } = useContext(AuthContext);

  const [clock, setClock] = useState(null);
  const [show, setShow] = useState(clock && clock.show ? true : false);
  const [format, setFormat] = useState(clock && clock.format);
  const [ticking, setTicking] = useState(clock && clock.ticking);

  useEffect(() => {
    getClock();
  }, []);

  const getClock = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/clocks`);
      setClock(res.data[0]);
      setShow(res.data[0].show);
      setFormat(res.data[0].format);
      setTicking(res.data[0].ticking);
    } catch (error) {
      console.log(error);
    }
  };

  const showClock = async (e) => {
    e.preventDefault();
    try {
      if (!clock) {
        console.log("no clock created yet");
        await axios.post(`/api/users/${user.id}/clocks`, {
          show: true,
          format: "h:mm:ss A",
          ticking: true,
          timezone: null,
        });
      } else {
        await axios.put(`/api/users/${user.id}/clocks/${clock.id}`, {
          show: !clock.show,
          format: clock.format,
          ticking: clock.ticking,
          timezone: clock.timezone,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      getClock();
      // window.location.reload();
    }
  };

  const changeFormat = async (e) => {
    e.preventDefault();
    try {
      console.log("in changeFormat", format);
      await axios.put(`/api/users/${user.id}/clocks/${clock.id}`, {
        show: clock.show,
        format: clock.format === "h:mm:ss A" ? "HH:mm:ss" : "h:mm:ss A",
        ticking: clock.ticking,
        timezone: clock.timezone,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getClock();
      // window.location.reload();
    }
  };

  const changeTicking = async (e) => {
    e.preventDefault();
    try {
      console.log("in changeFormat", format);
      await axios.put(`/api/users/${user.id}/clocks/${clock.id}`, {
        show: clock.show,
        format: clock.format,
        ticking: !clock.ticking,
        timezone: clock.timezone,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getClock();
      // window.location.reload();
    }
  };

  return (
    <div>
      <div className="user-profile-clock-toggle">
        <h3>Clock</h3>
        <Form>
          <div className="user-profile-clock-form-checkbox">
            <Form.Check
              checked={show}
              name="group1"
              type="checkbox"
              id="checkbox"
              value={show}
              onChange={(e) => {
                // setShow(!show);
                showClock(e);
              }}
            />
          </div>
        </Form>
        {clock ? (
          <span>{JSON.stringify(clock, null, 2)}</span>
        ) : (
          <p>No Clock</p>
        )}
      </div>
      {show && (
        <div className="user-profile-clock-form">
          <Form>
            <div className="user-profile-clock-form-radios">
              <h6>Clock Type</h6>
              <div>
                <Form.Check
                  checked={format === "h:mm:ss A" ? true : false}
                  inline
                  label="12 hour"
                  name="group1"
                  type="radio"
                  id="inline-radio-1"
                  value={format}
                  onChange={(e) => {
                    // setFormat("h:mm:ss A");
                    changeFormat(e);
                  }}
                />
                <Form.Check
                  checked={format === "HH:mm:ss" ? true : false}
                  inline
                  label="24 hour"
                  name="group1"
                  type="radio"
                  id="inline-radio-2"
                  value={format}
                  onChange={(e) => {
                    // setFormat("HH:mm:ss");
                    changeFormat(e);
                  }}
                />
              </div>
            </div>
            <div className="user-profile-clock-form-checkbox">
              <h6>Show seconds</h6>
              <Form.Check
                checked={ticking}
                name="group1"
                type="checkbox"
                id="secondsCheckbox"
              />
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsUpdateClock;

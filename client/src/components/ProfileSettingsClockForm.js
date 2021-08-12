import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import WorldClock from "./WorldClock";

const ProfileSettingsClockForm = (props) => {
  const { user } = useContext(AuthContext);

  const [clock, setClock] = useState(null);
  const [refreshClock, setRefreshClock] = useState(false);

  useEffect(() => {
    getClock();
  }, []);

  const getClock = async () => {
    console.log("getting CLock");
    try {
      let res = await axios.get(`/api/users/${user.id}/clocks`);
      setClock(res.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshClock(false);
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
    }
  };

  const changeFormat = async (e) => {
    e.preventDefault();
    setRefreshClock(true);
    try {
      await axios.put(`/api/users/${user.id}/clocks/${clock.id}`, {
        show: clock.show,
        format: `${clock.format.includes("h:mm") ? "HH:mm" : "h:mm"}${
          clock.format.includes(":ss") ? ":ss" : ""
        }${clock.format.includes("h:mm") ? "" : " A"}`,
        ticking: clock.ticking,
        timezone: clock.timezone,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getClock();
    }
  };

  const changeSeconds = async (e) => {
    e.preventDefault();
    setRefreshClock(true);
    try {
      await axios.put(`/api/users/${user.id}/clocks/${clock.id}`, {
        show: clock.show,
        format: clock.format.includes(":ss")
          ? clock.format.replace(":ss", "")
          : clock.format.endsWith("A")
          ? clock.format.replace(" ", ":ss ")
          : clock.format + ":ss",
        ticking: clock.ticking,
        timezone: clock.timezone,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getClock();
    }
  };

  const renderClock = () => {
    return <WorldClock />;
  };

  return (
    <div>
      <div className="user-profile-clock-toggle">
        <h3>Clock</h3>
        <Form>
          <div className="user-profile-clock-form-checkbox">
            <Form.Check
              checked={clock && clock.show}
              name="group1"
              type="checkbox"
              id="checkbox"
              onChange={(e) => {
                showClock(e);
              }}
            />
          </div>
        </Form>
      </div>
      {clock && clock.show && (
        <div className="user-profile-clock-form">
          <Form>
            <div className="user-profile-clock-form-radios">
              <h6>Clock Type</h6>
              <div>
                <Form.Check
                  checked={
                    clock && clock.format.includes("h:mm") ? true : false
                  }
                  inline
                  label="12 hour"
                  name="group1"
                  type="radio"
                  id="inline-radio-1"
                  onChange={(e) => {
                    changeFormat(e);
                  }}
                />
                <Form.Check
                  checked={
                    clock && clock.format.includes("HH:mm") ? true : false
                  }
                  inline
                  label="24 hour"
                  name="group1"
                  type="radio"
                  id="inline-radio-2"
                  onChange={(e) => {
                    changeFormat(e);
                  }}
                />
              </div>
            </div>
            <div className="user-profile-clock-form-checkbox">
              <h6>Show seconds</h6>
              <Form.Check
                checked={clock && clock.format.includes(":ss") ? true : false}
                name="group1"
                type="checkbox"
                id="secondsCheckbox"
                onChange={(e) => changeSeconds(e)}
              />
            </div>
          </Form>
        </div>
      )}
      {!refreshClock && clock && clock.show && (
        <div className="clock-form-sample-container">
          <h4>Your Clock Will Be Updated To:</h4>
          {renderClock()}
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsClockForm;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../providers/AuthProvider";
import Clock from "react-live-clock";
import WorldClock from "./WorldClock";

const ProfileSettingsUpdateClock = (props) => {
  const { user } = useContext(AuthContext);

  const [clock, setClock] = useState(null);

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
      renderClock();

      // window.location.reload();
    }
  };

  const changeFormat = async (e) => {
    e.preventDefault();
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
      renderClock();

      // window.location.reload();
    }
  };

  const changeSeconds = async (e) => {
    e.preventDefault();
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
      renderClock();
      // window.location.reload();
    }
  };

  const renderClock = () => {
    return <WorldClock key={clock.id} clock={clock} />;
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
        {clock ? (
          <span>{JSON.stringify(clock, null, 2)}</span>
        ) : (
          <p>No Clock</p>
        )}
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
      <div className="world-clock">{clock && clock.show && renderClock()}</div>
    </div>
  );
};

export default ProfileSettingsUpdateClock;

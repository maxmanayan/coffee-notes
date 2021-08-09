import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const SettingsContext = React.createContext();

export const SettingsConsumer = SettingsContext.Consumer;

const SettingsProvider = (props) => {
  const { user } = useContext(AuthContext);
  const [clock, setClock] = useState(null);
  const [show, setShow] = useState(clock && clock.show ? true : false);
  const [format, setFormat] = useState(clock && clock.format);

  const worldClock = {
    show: false,
    format: "h:mm:ss A",
    ticking: true,
  };

  const getClock = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/clocks`);
      setClock(res.data[0]);
      setShow(res.data[0].show);
      setFormat(res.data[0].format);
    } catch (error) {
      console.log(error);
    }
  };

  const changeWorldClock = (format = "HH:mm:ss", ticking = true) => {
    console.log("changing world clock");
    // setWorldClock({ format: format, ticking: ticking });
  };

  return (
    <SettingsContext.Provider
      value={{
        worldClock,
        show,
        format,
        changeWorldClock: changeWorldClock,
        getClock: getClock,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

import axios from "axios";
import React, { useState } from "react";

export const SettingsContext = React.createContext();

export const SettingsConsumer = SettingsContext.Consumer;

const SettingsProvider = (props) => {
  // const [worldClock, setWorldClock] = useState({
  //   format: "HH:mm:ss",
  //   ticking: false,
  // });

  const worldClock = {
    show: false,
    format: "h:mm:ss A",
    ticking: true,
  };

  const changeWorldClock = (format = "HH:mm:ss", ticking = true) => {
    console.log("changing world clock");
    // setWorldClock({ format: format, ticking: ticking });
  };

  return (
    <SettingsContext.Provider
      value={{ worldClock, changeWorldClock: changeWorldClock }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

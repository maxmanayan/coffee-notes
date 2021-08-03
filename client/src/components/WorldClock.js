import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Clock from "react-live-clock";
import { SettingsContext } from "../providers/SettingsProvider";

const WorldClock = (props) => {
  const { worldClock, changeWorldClock } = useContext(SettingsContext);
  // const [format, setFormat] = useState(worldClock.format)

  return (
    <div className="world-clock">
      {/* <Button onClick={() => changeWorldClock("h:mm:ss A", true)}>
        Change
      </Button>
      <h3>World Clock</h3> */}
      <Clock
        format={worldClock.format}
        ticking={worldClock.ticking}
        timezone={null}
      />
    </div>
  );
};

export default WorldClock;

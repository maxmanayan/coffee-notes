import React from "react";
import Clock from "react-live-clock";

const WorldClock = (props) => {
  return (
    <div>
      <h3>World Clock</h3>
      <Clock format={"HH:mm:ss"} ticking={true} />
    </div>
  );
};

export default WorldClock;

import React, { useContext, useState } from "react";
import Clock from "react-live-clock";

const WorldClock = (props) => {
  return (
    <div className="world-clock">
      <Clock format={"h:mm:ss A"} ticking={true} timezone={null} />
    </div>
  );
};

export default WorldClock;

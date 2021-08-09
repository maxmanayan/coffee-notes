import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Clock from "react-live-clock";
import { AuthContext } from "../providers/AuthProvider";

const WorldClock = (props) => {
  const { user } = useContext(AuthContext);
  const [clock, setClock] = useState(null);

  useEffect(() => {
    getClock();
  }, []);

  const getClock = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/clocks`);
      setClock(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="world-clock">
      {clock && clock.show && (
        <Clock
          format={clock.format}
          ticking={clock.ticking}
          timezone={clock.timezone}
        />
      )}
    </div>
  );
};

export default WorldClock;

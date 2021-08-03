import axios from "axios";
import React from "react";

export const SettingsContext = React.createContext();

export const SettingsConsumer = SettingsContext.Consumer;

const SettingsProvider = (props) => {
  return <SettingsContext.Provider>{props.children}</SettingsContext.Provider>;
};

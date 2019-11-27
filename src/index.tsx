import "./index.css";
import React from "react";
import { render } from "react-dom";
import { Provider, themes } from "@stardust-ui/react";
import App from "./App";

render(
  <Provider theme={themes.teams}>
    <App />
  </Provider>,
  document.getElementById("root")
);

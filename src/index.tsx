import "./index.css";
import React from "react";
import { render } from "react-dom";
import * as Fluent from "./fluent-ui-react/packages/react/dist/umd/stardust-ui-react.min";
import App from "./App";

render(
  <Fluent.Provider theme={Fluent.themes.teams}>
    <App />
  </Fluent.Provider>,
  document.getElementById("root")
);

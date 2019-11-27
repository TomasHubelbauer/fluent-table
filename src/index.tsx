import "./index.css";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import {
  Provider,
  themes
} from "./fluent-ui-react/packages/react/dist/commonjs";

render(
  <Provider theme={themes!.teams}>
    <App />
  </Provider>,
  document.getElementById("root")
);

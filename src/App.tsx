import "./App.css";
import React from "react";
import * as Fluent from "./fluent-ui-react/packages/react/dist/umd/stardust-ui-react.min";

export default function App() {
  return (
    <Fluent.Table
      header={["a", "b", "c"]}
      rows={[
        [1, 2, 3],
        [4, 5, 6]
      ]}
    />
  );
}

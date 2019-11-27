import "./App.css";
import React from "react";
import { Table } from "@stardust-ui/react";

export default function App() {
  return (
    <Table
      header={["a", "b", "c"]}
      rows={[
        [1, 2, 3],
        [4, 5, 6]
      ]}
    />
  );
}

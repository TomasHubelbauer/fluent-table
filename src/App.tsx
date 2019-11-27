import "./App.css";
import React from "react";
import { Table, TableRow } from "@stardust-ui/react";

export default function App() {
  const header = ["a", "b", "c"];
  const rows = [
    [1, 2, 3],
    [4, 5, 6]
  ];

  return (
    <div className="App">
      <Table>
        <TableRow header items={header} />
        {rows.map((row, index) => (
          <TableRow key={index} items={row} />
        ))}
      </Table>
    </div>
  );
}

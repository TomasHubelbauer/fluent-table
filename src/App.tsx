import "./App.css";
import React from "react";
import FilteringTable from "./FilteringTable";
import SortingTable from "./SortingTable";

export default function App() {
  return (
    <div className="App">
      <h1>Fluent Table Tools</h1>
      <FilteringTable />
      <SortingTable />
    </div>
  );
}

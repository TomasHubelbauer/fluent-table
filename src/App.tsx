import "./App.css";
import React from "react";
import FilteringTable from "./FilteringTable";
import SortingTable from "./SortingTable";
import EmbeddingTable from "./EmbeddingTable";
import SearchingTable from "./SearchingTable";
import SelectingTable from "./SelectingTable";
import ActioningTable from "./ActioningTable";
import LoadingTable from "./LoadingTable";
import RespondingTable from "./RespondingTable";

export default function App() {
  return (
    <div className="App">
      <h1>Fluent Table Tools</h1>
      <FilteringTable />
      <SortingTable />
      <EmbeddingTable />
      <SearchingTable />
      <SelectingTable />
      <ActioningTable />
      <LoadingTable />
      <RespondingTable />
    </div>
  );
}

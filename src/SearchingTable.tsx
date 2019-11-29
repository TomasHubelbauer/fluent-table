import React, { useState, ChangeEventHandler } from "react";
import { data, keys, columns } from "./types";
import { Table, TableRow, TableCell } from "@stardust-ui/react";

export default function SearchingTable() {
  const style = `
#SearchingTable input {
  display: block;
}
`;

  const [search, setSearch] = useState("");

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = event =>
    setSearch(event.currentTarget.value);

  const rows = !search
    ? data
    : data.filter(row => {
        for (const key of keys) {
          if (row[key].toUpperCase().includes(search.toUpperCase().trim())) {
            return true;
          }
        }

        return false;
      });

  return (
    <div id="SearchingTable">
      <h2>
        <a href="#SearchingTable">Searching Table</a>
      </h2>
      <p>
        This example demonstrates a Fluent Table equipped with a search bar. The
        search bar can sit within the table or outside of it. The implementation
        of search is left to the user. In this instance, rows where any cell
        includes the search strings are returned.
      </p>
      <a href="https://github.com/TomasHubelbauer/fluent-table-tools/blob/master/src/SearchingTable.tsx">
        Source code on GitHub
      </a>
      <style>{style}</style>
      <Table>
        <input value={search} onChange={handleSearchInputChange} />
        <TableRow header>
          {keys.map(key => (
            <TableCell key={key}>{columns[key]}</TableCell>
          ))}
        </TableRow>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {keys.map(key => (
              <TableCell key={key}>{row[key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

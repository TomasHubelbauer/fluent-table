import React, { useState, ChangeEventHandler } from "react";
import { Key, data, keys, columns } from "./types";
import { Table, TableRow, TableCell } from "@stardust-ui/react";

export default function FilteringTable() {
  const style = `
#FilteringTable input {
  margin-left: auto;
}
`;

  const [filter, setFilter] = useState<{ [column in Key]?: string }>({});

  const handleFilterInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    // TODO: Consider removing if the value is empty which would give rise to
    // the possibility to allow reordering the keys in the filter object and
    // define the filter order that way. The filter order in the UI could be
    // displayed by showing a number next to each filter input which shows
    // the position of that column in the filter object keys and thus its
    // filter order
    setFilter({
      ...filter,
      [event.currentTarget.dataset.key as Key]: event.currentTarget.value
    });
  };

  const rows = data.filter(row => {
    for (const key of Object.keys(filter) as Key[]) {
      if (!row[key].toUpperCase().includes(filter[key]!.toUpperCase().trim())) {
        return false;
      }
    }

    return true;
  });

  return (
    <div id="FilteringTable">
      <h2>
        <a href="#FilteringTable">Filtering Table</a>
      </h2>
      <p>
        This example demonstrates how to use the rich content capabilities of
        the Fluent Table component to attach filtering funnels to each column
        using any sort of rich content and update the table based on changing
        the filter values.
      </p>
      <p>
        A way to improve would be to provide a way to define the order of the
        filters, currently, they are always evaluated in the column order.
      </p>
      <a href="https://github.com/TomasHubelbauer/fluent-table-tools/blob/master/src/FilteringTable.tsx">
        Source code on GitHub
      </a>
      <style>{style}</style>
      <Table>
        <TableRow header>
          {keys.map(key => (
            <TableCell key={key}>
              {columns[key]}
              <input
                value={filter[key] || ""}
                data-key={key}
                onChange={handleFilterInputChange}
                placeholder="ᗊ"
              />
            </TableCell>
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

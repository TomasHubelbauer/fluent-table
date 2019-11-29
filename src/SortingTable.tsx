import React, { useState, ChangeEventHandler } from "react";
import { Key, data, keys, columns } from "./types";
import { Table, TableRow, TableCell } from "@stardust-ui/react";

export default function SortingTable() {
  const style = `
#SortingTable input {
  margin-left: auto;
  visibility: hidden;
}

#SortingTable input::after {
  content: '-';
  cursor: pointer;
  outline: 1px solid silver;
  padding: 0 1ex;
  visibility: visible;
}

#SortingTable input[data-order="ascending"]::after {
  content: '↓';
}

#SortingTable input[data-order="descending"]::after {
  content: '↑';
}

#SortingTable input[data-order]::after {
  background: silver;
  font-weight: bold;
}
`;

  // undefined = default, true = ascending, false = descending
  const [sort, setSort] = useState<{ [column in Key]?: boolean }>({});

  const handleSortInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    setSort({
      [event.currentTarget.value as Key]: event.currentTarget.checked
    });
  };

  const sortKey =
    Object.keys(sort).length === 0 ? undefined : (Object.keys(sort)[0] as Key);
  const rows = !sortKey
    ? data
    : data.sort((a, b) =>
        (sort[sortKey] ? a : b)[sortKey].localeCompare(
          (sort[sortKey] ? b : a)[sortKey]
        )
      );

  /*.filter(row => {
    for (const key of Object.keys(filter) as Key[]) {
      if (!row[key].toUpperCase().includes(filter[key]!.toUpperCase().trim())) {
        return false;
      }
    }

    return true;
  });*/

  return (
    <div id="SortingTable">
      <h2>
        <a href="#SortingTable">Sorting Table</a>
      </h2>
      <p>
        This example demonstrates a sort toggle integration using the Fluent
        Table rich content capabilities. The default sort is undefined, upon
        interacting with the sort toggle, the sort alternates between ascending
        and descending and advancing to a different toggle moves the sort to the
        value of that respective toggle.
      </p>
      <a href="https://github.com/TomasHubelbauer/fluent-table-tools/blob/master/src/SortingTable.tsx">
        Source code on GitHub
      </a>
      <style>{style}</style>
      <Table>
        <TableRow header>
          {keys.map(key => (
            <TableCell key={key}>
              {columns[key]}
              <input
                type="checkbox"
                value={key}
                checked={Boolean(sort[key]) /* Make it always controlled */}
                data-order={
                  sort[key] !== undefined
                    ? sort[key]
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                onChange={handleSortInputChange}
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

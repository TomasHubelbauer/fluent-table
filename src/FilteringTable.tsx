import React, { useState, ChangeEventHandler } from "react";
import { Table, TableRow, TableCell } from "@stardust-ui/react";

type Row = {
  firstName: string;
  lastName: string;
  occupation: string;
};

type Key = keyof Row;

type Columns = { [key in Key]: Row[key] };

const data: Row[] = [
  { firstName: "Tom", lastName: "Hubelbauer", occupation: "Programmer" },
  { firstName: "John", lastName: "Doe", occupation: "Maker" }
];

export default function FilteringTable() {
  const columns: Columns = {
    firstName: "First name",
    lastName: "Last name",
    occupation: "Occupation"
  };

  const keys = Object.keys(columns) as Key[];
  const style = `
.FilteringTable input {
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
    <div className="FilteringTable">
      <h2>Filtering Table</h2>
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
      <Table>
        <style>{style}</style>
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

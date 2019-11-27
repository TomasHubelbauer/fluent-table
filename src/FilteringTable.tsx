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
input {
  margin-left: auto;
}
`;

  const [filter, setFilter] = useState<{ [column in Key]?: string }>({});

  const handleFilterInputChange: ChangeEventHandler<HTMLInputElement> = event => {
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
    <Table>
      <style scoped>{style}</style>
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
  );
}

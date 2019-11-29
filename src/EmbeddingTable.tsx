import React, { ReactChild } from "react";
import { Row, keys, columns } from "./types";
import {
  Table,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  Checkbox
} from "@stardust-ui/react";

export default function EmbeddingTable() {
  type RichRow = { [key in keyof Row]: ReactChild };
  const rows: RichRow[] = [
    {
      firstName: <Button>Tom</Button>,
      lastName: <Button>Hubelbauer</Button>,
      occupation: <Button>Programmer</Button>
    },
    {
      firstName: <Dropdown placeholder="…" items={["Tom"]} />,
      lastName: <Dropdown placeholder="…" items={["Hubelbauer"]} />,
      occupation: <Dropdown placeholder="…" items={["Programmer"]} />
    },
    {
      firstName: <Checkbox label="Tom" />,
      lastName: "Hubelbauer",
      occupation: "Programmer"
    },
    {
      firstName: <Checkbox label="John" />,
      lastName: "Doe",
      occupation: "Maker"
    }
  ];

  return (
    <div id="EmbeddingTable">
      <h2>
        <a href="#EmbeddingTable">Embedding Table</a>
      </h2>
      <p>
        This example demonstrates including rich content in the Fluent Table
        component. Any valid React child can be made the content of a header or
        a body cell. This includes complex components originating from Fluent or
        others.
      </p>
      <p>
        Fluent components Button, Dropdown and Checkbox are demonstrated as
        possible types of rich content.
      </p>
      <a href="https://github.com/TomasHubelbauer/fluent-table-tools/blob/master/src/EmbeddingTable.tsx">
        Source code on GitHub
      </a>
      <Table>
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

import React, { useEffect, useState } from "react";
import { data, keys, columns } from "./types";
import { Table, TableRow, TableCell } from "@stardust-ui/react";
import calculateBreakpoints, {
  Column,
  Breakpoint
} from "./calculateBreakpoints";

const _columns: Column[] = [
  { weight: 3, ratio: 1, limit: 150 },
  { weight: 2, ratio: 3, limit: 350 },
  { weight: 0, ratio: 2, limit: 100 }
];

export default function RespondingTable() {
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>();

  // Generate the stylesheet once and for all
  useEffect(() => {
    const breakpoints = Array.from(calculateBreakpoints(_columns, { _: 16 }));
    setBreakpoints(breakpoints);
  }, []);

  return (
    <div id="RespondingTable">
      <h2>
        <a href="#RespondingTable">Responding Table</a>
      </h2>
      <p>
        This example demonstrates a Fluent Table which respoonds to the viewport
        changes by hiding and showing columns based on whether they fit on the
        screen. The order in which they disappear an reappear is determined by
        each columns priority.
      </p>
      <p>
        This is done using CSS media queries and not using JavaScript. Resize
        the window to observe the effect in action.
      </p>
      <p>
        <a href="https://github.com/TomasHubelbauer/html-responsive-table">
          The responsivity repo
        </a>
      </p>
      <a href="https://github.com/TomasHubelbauer/fluent-table-tools/blob/master/src/RespondingTable.tsx">
        Source code on GitHub
      </a>
      {breakpoints &&
        breakpoints.map((breakpoint, index) => (
          <p key={index}>
            At viewport {breakpoint.viewport}, table {breakpoint.table},{" "}
            {breakpoint.columns
              .map(
                (column, index) =>
                  `${columns[keys[index]]} becomes ${column.state}${
                    column.state === "visible" ? ` (${column.size}px)` : ""
                  }`
              )
              .join(", ")}
          </p>
        ))}
      <style>
        {_columns
          .map(
            (c, i) =>
              `#RespondingTable .ui-table__cell:nth-child(${i + 1}) { flex: ${
                c.ratio
              }; }`
          )
          .join("\n")}
        {breakpoints &&
          breakpoints.map(
            breakpoint => `
/* Viewport ${breakpoint.viewport} | Table ${
              breakpoint.table
            } | ${breakpoint.columns
              .map(
                (column, index) =>
                  `${columns[keys[index]]} ${column.state}${
                    column.state === "visible" ? ` (${column.size}px)` : ""
                  }`
              )
              .join(" | ")} */
@media (max-width: ${breakpoint.viewport}px) {
  ${breakpoint.columns
    .map(
      (column, index) =>
        `#RespondingTable .ui-table__cell:nth-child(${index + 1}) { display: ${
          column.state === "visible" ? "initial" : "none"
        }; }`
    )
    .join("\n  ")}
}
`
          )}
      </style>
      <Table>
        <TableRow header>
          {keys.map(key => (
            <TableCell key={key}>{columns[key]}</TableCell>
          ))}
        </TableRow>
        {data.map((row, index) => (
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

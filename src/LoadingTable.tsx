import React, { useState, ChangeEventHandler, useRef } from "react";
import { data, Key, keys, columns } from "./types";
import { Table, TableRow, TableCell, Loader } from "@stardust-ui/react";

type Op = { index: number; key: Key; value: string };

export default function LoadingTable() {
  const style = `
#LoadingTable input {
  flex: 1;
}
`;

  const [rows, setRows] = useState(data);
  const op = useRef<Op>();
  const [, forceUpdate] = useState();

  const handleCellInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const index = Number(event.currentTarget.dataset.index);
    const key = event.currentTarget.dataset.key! as Key;
    const value = event.currentTarget.value;
    const _op = { index, key, value };
    op.current = _op;

    // Force an UI update so that the UI sees there's an operation going on now
    forceUpdate(Date.now());

    window.setTimeout(() => {
      // Ignore superseded operation
      if (!op.current || op.current !== _op) {
        return;
      }

      const currentOp = op.current;

      // Update the data with the new value
      const _rows = rows.map((row, index) =>
        index === currentOp.index
          ? { ...row, [currentOp.key]: currentOp.value }
          : row
      );

      // Clear the current op
      op.current = undefined;
      setRows(_rows);
    }, Math.random() * 1000);
  };

  return (
    <div id="LoadingTable">
      <h2>
        <a href="#LoadingTable">Loading Table</a>
      </h2>
      <p>
        This example demonstrates a Fluent Table which loads its data
        asynchronously. The rows are editable and changes to them are persisted
        immediately asynchronously, the loading indicator is displayed when the
        change is being persisted.
      </p>
      <a href="https://github.com/TomasHubelbauer/fluent-table-tools/blob/master/src/LoadingTable.tsx">
        Source code on GitHub
      </a>
      <style>{style}</style>
      <Table>
        <TableRow header>
          {keys.map(key => (
            <TableCell key={key}>{columns[key]}</TableCell>
          ))}
        </TableRow>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {keys.map(key => {
              let selfOp: Op | undefined;
              if (
                op.current &&
                op.current.index === index &&
                op.current.key === key
              ) {
                selfOp = op.current;
              }

              return (
                <TableCell key={key}>
                  {
                    <>
                      <input
                        disabled={op.current && !selfOp}
                        value={selfOp ? selfOp.value : row[key]}
                        data-index={index}
                        data-key={key}
                        onChange={handleCellInputChange}
                      />
                      {selfOp && <Loader />}
                    </>
                  }
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

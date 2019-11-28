import React, { useEffect, useState, MouseEventHandler } from "react";
import { data, keys, columns, Key } from "./types";
import { Table, TableRow, TableCell } from "@stardust-ui/react";
import calculateBreakpoints, {
  Column,
  Breakpoint,
  Breakpoints
} from "./calculateBreakpoints";

type Resize = {
  index: number;
  key: string;
  origin: number;
};

const _breakpoints: Breakpoints = { _: 16 };

export default function ResizingTable() {
  const style = `
#ResizingTable {
  user-select: none;
}

#ResizingTable .handle {
  background: silver;
  cursor: ew-resize;
  display: inline-block;
  margin-left: auto;
  width: 2em;
}
`;

  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>();
  const [_columns, setColumns] = useState<Column[]>([
    { weight: 3, ratio: 1, limit: 150 },
    { weight: 2, ratio: 3, limit: 350 },
    { weight: 0, ratio: 2, limit: 100 }
  ]);

  // Generate the stylesheet once and for all
  useEffect(() => {
    const breakpoints = Array.from(
      calculateBreakpoints(_columns, _breakpoints)
    );
    setBreakpoints(breakpoints);
  }, [_columns]);

  const [resize, setResize] = useState<Resize>();

  const handleResizeHandleMouseDown: MouseEventHandler<HTMLSpanElement> = event => {
    const index = Number(event.currentTarget.dataset.index);
    const key = event.currentTarget.dataset.key! as Key;
    setResize({ index, key, origin: event.pageX });
  };

  const handleResizeHandleMouseMove: MouseEventHandler<HTMLSpanElement> = event => {
    if (event.buttons !== 1) {
      return;
    }

    const index = Number(event.currentTarget.dataset.index);
    const key = event.currentTarget.dataset.key! as Key;
    if (!resize || resize.index !== index || resize.key !== key) {
      setResize(undefined);
      return;
    }

    // TODO: Make this account for `limit` so that the total table size
    // remains the same and doesn't change the media queries
    // TODO: Calculate stop points so we cannot resize past the limit
    // TODO: Make this work even when there are columns which are not
    // visible, probably by calculating visible columns upon click and
    // working with that set of columns
    // TODO: Figure out how to avoid the cursor being faster then the
    // handle and losing grip - mouse move doesn't seem to work past the
    // bounds of the element (maybe it needs to be focusable for that?)
    // so either find a way to make them so or use mouse move on the row
    const keyIndex = keys.indexOf(key);
    const size = window.innerWidth - _breakpoints._;
    const ratio = _columns.reduce((a, c) => a + c.ratio, 0);
    const sizeLeft = size * (_columns[keyIndex].ratio / ratio);
    const sizeRight = size * (_columns[keyIndex + 1].ratio / ratio);
    const sizeTotal = sizeLeft + sizeRight;
    const ratioLeft = _columns[keyIndex].ratio;
    const ratioRight = _columns[keyIndex + 1].ratio;
    const ratioTotal = ratioLeft + ratioRight;
    const delta = event.pageX - resize.origin; // event.movementX;
    const goalLeft = sizeLeft + delta;
    const goalRight = sizeRight - delta;
    const newRatioLeft = (goalLeft / sizeTotal) * ratioTotal;
    const newRatioRight = (goalRight / sizeTotal) * ratioTotal;
    const newColumns = _columns.map(c => ({ ...c }));
    newColumns[keyIndex].ratio = newRatioLeft;
    newColumns[keyIndex + 1].ratio = newRatioRight;
    setColumns(newColumns);
    setResize({ ...resize, origin: event.pageX });
  };

  const handleResizeHandleMouseUp = () => setResize(undefined);

  return (
    <div id="ResizingTable">
      <h2>
        <a href="#ResizingTable">Resizing Table</a>
      </h2>
      <p>
        In addition to the above, tables can have resize handles which dictate
        their sizes against one another. There's also an alternative strategy
        where resizing a column makes the whole table grow. We want a mix of the
        two ideally, grow until reached the available size and then adjust
        within (or scroll horizontally if that's allowed). Right now this demo
        shows only the full-screen table resizing.
      </p>
      <p>
        This demo is a little quirky and will be improved with time. It doesn't
        work in breakpoints where not all columns are shown and the cursos loses
        grip of the handle sometimes. Both is easily fixable.
      </p>
      <p>
        <a href="https://github.com/TomasHubelbauer/html-responsive-table">
          The responsivity repo
        </a>
      </p>
      <style>
        {style}
        {_columns
          .map(
            (c, i) =>
              `#ResizingTable .ui-table__cell:nth-child(${i + 1}) { flex: ${
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
        `#ResizingTable .ui-table__cell:nth-child(${index + 1}) { display: ${
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
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {keys.map((key, cellIndex) => (
              <TableCell key={key}>
                <>
                  {row[key]}
                  {cellIndex < keys.length - 1 && (
                    <span
                      className="handle"
                      data-index={rowIndex}
                      data-key={key}
                      onMouseDown={handleResizeHandleMouseDown}
                      onMouseMove={handleResizeHandleMouseMove}
                      onMouseUp={handleResizeHandleMouseUp}
                    />
                  )}
                </>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

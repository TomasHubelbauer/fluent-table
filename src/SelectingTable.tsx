import React, { useRef, useState } from "react";
import { data, keys, columns } from "./types";
import {
  Table,
  TableRow,
  TableCell,
  Checkbox,
  ComponentEventHandler,
  CheckboxProps,
  RadioGroupItem,
  RadioGroupItemProps
} from "@stardust-ui/react";

export default function SelectingTable() {
  const [multiselect, setMultiselect] = useState(true);

  const handleMultiselectCheckboxChange: ComponentEventHandler<CheckboxProps> = (
    _event,
    data
  ) => {
    if (multiselect) {
      const [sole] = Array.from(current.entries());
      current.clear();
      if (sole) {
        current.set(sole[0], sole[1]);
      }
    }

    setMultiselect(data!.checked!);
  };

  const { current } = useRef(new Map<number, boolean>());
  const [, forceUpdate] = useState();

  const handleSelectionCheckboxChange: ComponentEventHandler<CheckboxProps> = (
    event,
    data
  ) => {
    current.set(Number(event.currentTarget.dataset.index), data!.checked!);
    forceUpdate(Date.now());
  };

  const handleSelectionRadioGroupItemClick: ComponentEventHandler<RadioGroupItemProps> = event => {
    current.clear();
    current.set(Number(event.currentTarget.dataset.index), true);
    forceUpdate(Date.now());
  };

  return (
    <div id="SelectingTable">
      <h2>
        <a href="#SelectingTable">Selecting Table</a>
      </h2>
      <p>
        This example demonstrates a Fluent Table where each row is adorned with
        a checkbox or a radio in its first cell. This is to enable selecting
        single or multiple items.
      </p>
      <a href="https://github.com/TomasHubelbauer/fluent-table-tools/blob/master/src/SelectingTable.tsx">
        Source code on GitHub
      </a>
      <Table>
        <Checkbox
          label="Multiselect?"
          toggle
          checked={multiselect}
          onChange={handleMultiselectCheckboxChange}
        />
        <TableRow header>
          {keys.map(key => (
            <TableCell key={key}>{columns[key]}</TableCell>
          ))}
        </TableRow>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {keys.map((key, cellIndex) => (
              <TableCell key={key}>
                {cellIndex === 0 ? (
                  multiselect ? (
                    <Checkbox
                      label={row[key]}
                      checked={current.get(rowIndex)}
                      data-index={rowIndex}
                      onChange={handleSelectionCheckboxChange}
                    />
                  ) : (
                    <RadioGroupItem
                      label={row[key]}
                      checked={current.get(rowIndex)}
                      data-index={rowIndex}
                      onClick={handleSelectionRadioGroupItemClick}
                    />
                  )
                ) : (
                  row[key]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

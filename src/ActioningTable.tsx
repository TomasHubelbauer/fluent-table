import React, { useState } from "react";
import { data, keys, columns } from "./types";
import {
  Table,
  TableRow,
  TableCell,
  Button,
  Input,
  ComponentEventHandler,
  InputProps,
  ButtonProps
} from "@stardust-ui/react";

export default function ActioningTable() {
  const style = `
#ActioningTable button {
  margin-left: auto;
}

#ActioningTable input {
  display: block;
}
`;

  const [rows, setRows] = useState(data);

  const [firstNameDraft, setFirstNameDraft] = useState("");
  const handleFirstNameDraftInputChange: ComponentEventHandler<InputProps> = (
    _event,
    data
  ) => setFirstNameDraft(data!.value!.toString());

  const [lastNameDraft, setLastNameDraft] = useState("");
  const handleLastNameDraftInputChange: ComponentEventHandler<InputProps> = (
    _event,
    data
  ) => setLastNameDraft(data!.value!.toString());

  const [occupationDraft, setOccupationDraft] = useState("");
  const handleOccupationDraftInputChange: ComponentEventHandler<InputProps> = (
    _event,
    data
  ) => setOccupationDraft(data!.value!.toString());

  const handleAddButtonClick: ComponentEventHandler<ButtonProps> = () => {
    setRows([
      ...rows,
      {
        firstName: firstNameDraft,
        lastName: lastNameDraft,
        occupation: occupationDraft
      }
    ]);
    setFirstNameDraft("");
    setLastNameDraft("");
    setOccupationDraft("");
  };

  const handleRemoveButtonClick: ComponentEventHandler<ButtonProps> = event => {
    const index = Number(event.currentTarget.dataset.index);
    const _rows = [...rows];
    _rows.splice(index, 1);
    setRows(_rows);
  };

  return (
    <div id="ActioningTable">
      <h2>
        <a href="#ActioningTable">Actioning Table</a>
      </h2>
      <p>
        This example demonstrates a Fluent Table where each row is adorned with
        a contextual button, which for existing rows deletes the row and for the
        virtual new row persists the row into the collection.
      </p>
      <style>{style}</style>
      <Table>
        <TableRow header>
          {keys.map(key => (
            <TableCell key={key}>{columns[key]}</TableCell>
          ))}
        </TableRow>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {keys.map((key, cellIndex) => (
              <TableCell key={key}>
                {
                  <>
                    {row[key]}
                    {cellIndex === keys.length - 1 && (
                      <Button
                        data-index={rowIndex}
                        onClick={handleRemoveButtonClick}
                      >
                        -
                      </Button>
                    )}
                  </>
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
        <TableRow>
          <TableCell>
            <Input
              value={firstNameDraft}
              onChange={handleFirstNameDraftInputChange}
            />
          </TableCell>
          <TableCell>
            <Input
              value={lastNameDraft}
              onChange={handleLastNameDraftInputChange}
            />
          </TableCell>
          <TableCell>
            <Input
              value={occupationDraft}
              onChange={handleOccupationDraftInputChange}
            />
            <Button
              onClick={handleAddButtonClick}
              disabled={!firstNameDraft || !lastNameDraft || !occupationDraft}
            >
              +
            </Button>
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
}

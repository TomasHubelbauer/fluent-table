export type Row = {
  firstName: string;
  lastName: string;
  occupation: string;
};

export type Key = keyof Row;

export type Columns = { [key in Key]: Row[key] };

export const data: Row[] = [
  { firstName: "Tom", lastName: "Hubelbauer", occupation: "Programmer" },
  { firstName: "John", lastName: "Doe", occupation: "Maker" }
];

export const columns: Columns = {
  firstName: "First name",
  lastName: "Last name",
  occupation: "Occupation"
};

export const keys = Object.keys(columns) as Key[];

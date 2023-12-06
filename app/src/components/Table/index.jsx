/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

const Table = ({ list }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstname",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastname",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "department",
        header: "Department",
        size: 150,
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        size: 200,
      },
      {
        accessorKey: "street",
        header: "Street",
        size: 150,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
      {
        accessorKey: "zipCode",
        header: "Zip Code",
        size: 150,
      },
    ],
    []
  );

  // Check if the data is in the expected format
  if (!Array.isArray(list) || !list.every(item => typeof item === 'object')) {
    console.error('Data passed to Table is not an array of objects:', list);
    return <div>Error: Data format is incorrect</div>;
  }

  return <MaterialReactTable columns={columns} data={list} />;
};

export default Table;
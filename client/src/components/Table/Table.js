import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Columns } from "./Columns";

import "./Table.css";
const parseAppointment = (row) => {
  return {
    patient_id: row.original.patient_id,
    doctor_id: row.original.doctor_id,
    appointment_date_time: row.original.appointment_date_time,
  };
};
const Table = ({ tableDataState, setAppointmentToDelete }) => {
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => tableDataState, [tableDataState]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns,
        data: data,
      },
      useSortBy,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,
          {
            id: "delete",
            Header: "",
            Cell: ({ row }) => (
              <div
                onClick={(e) => {
                  setAppointmentToDelete(parseAppointment(row));
                }}
              >
                Delete
              </div>
            ),
          },
        ]);
      }
    );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // add here to sort
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted // add icon
                    ? column.isSortedDesc
                      ? " 🔽"
                      : " 🔼"
                    : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td> // grabs data from each row and renders in the browser
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

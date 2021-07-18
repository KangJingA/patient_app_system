import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Columns } from "./Columns";

import "./Table.css";
const Table = ({ tableDataState }) => {
  console.log(tableDataState)
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => tableDataState, [tableDataState]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns,
        data: data,
      },
      useSortBy
    );

  console.log(headerGroups);
  // thead: table head
  // tbody: table body
  // tr: table row -> put the cells in the rows
  // th: table header cell -> bold and centered by default
  // td: table data cell -> regular and left-aligned by default

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

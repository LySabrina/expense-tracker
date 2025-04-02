import { useState } from "react";
import TableData from "./TableData.js";
import TableHeader from "./TableHeader.js";
import { TABLE_TYPE } from "../constants/TABLE_TYPE.js";

function Table({
  tableHeaders,
  tableRows,
  updateTableRows,
  setSelectedRows,
  selectedRows,
  contextOpen,
  setContextOpen,
  setCoords,
  selectedHeaders,
  setSelectedHeaders,
  updateRemoveTag
}) {
  const selectRow = (rowIndex: number) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows((prevSelected) => {
        return prevSelected.filter((element) => {
          return element != rowIndex;
        });
      });
    } else {
      setSelectedRows((prevSelected) => [...prevSelected, rowIndex]);
    }
    setContextOpen(false);
  };

  const selectTableHeaders = (colIndex: number) => {
    if (selectedHeaders.includes(colIndex)) {
      setSelectedHeaders((prevSelected) => {
        return prevSelected.filter((element) => {
          return element != colIndex;
        });
      });
    } else {
      setSelectedHeaders((prevHeaders: number[]) => [...prevHeaders, colIndex]);
    }
  };

  const openContextMenu = (e) => {
    const xCord: number = e.clientX;
    const yCord: number = e.clientY;
    setCoords({
      xCord: xCord,
      yCord: yCord,
    });
    setContextOpen(true);
  };

  // const closeContextMenu = (e) => {

  // };

  return (
    <table className="w-full p-4">
      <thead>
        <tr>
          <TableHeader name={"#"} />
          {tableHeaders.map((elem, index) => (
            <TableHeader
              TYPE={elem.TYPE}
              name={elem.name}
              index={index}
              selectTableHeaders={selectTableHeaders}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`border-2 ${
              selectedRows.includes(rowIndex) && "bg-red-500"
            }`}
            onContextMenu={(e) => {
              openContextMenu(e);
              e.preventDefault();
            }}
          >
            <td className="border-2" onClick={() => selectRow(rowIndex)}>
              {rowIndex + 1}
            </td>
            {tableHeaders.map((header, index) => {
              // Find the value for the current row and header
              const value = row.values.find(
                (val) => val.key === header.name
              ).value;

              return (
                <TableData
                  value={value}
                  TYPE={header.TYPE}
                  rowIndex={rowIndex}
                  colName={header.name}
                  updateTableRows={updateTableRows}
                  isSelected={selectedHeaders.includes(index)}
                  updateRemoveTag={updateRemoveTag}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;

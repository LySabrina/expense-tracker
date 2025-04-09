import { createContext, useState } from "react";
import { TABLE_TYPE } from "@/constants/TABLE_TYPE.js";

export const TableContext = createContext();
// https://stackoverflow.com/questions/60866924/how-to-pass-multiple-states-through-react-context-api
export default function TableProvider({ children }) {
  const [tableHeaders, setTableHeader] = useState([
    {
      TYPE: TABLE_TYPE.STRING,
      name: "Product",
    },
    {
      TYPE: TABLE_TYPE.NUMBER,
      name: "Price",
    },
    {
      TYPE: TABLE_TYPE.TAG,
      name: "Genre",
    },
  ]);

  const [tableRows, setTableRows] = useState([
    {
      values: [
        {
          key: "Product",
          value: "Banana",
        },
        {
          key: "Price",
          value: 21,
        },
        {
          key: "Genre",
          value: "VIDEO GAME",
        },
      ],
    },
    {
      values: [
        {
          key: "Product",
          value: "Apple",
        },
        {
          key: "Price",
          value: 12,
        },
        {
          key: "Genre",
          value: "VIDEO GAME",
        },
      ],
    },
  ]);

  const addNewCol = (newCol) => {
    setTableHeader((prevHeaders) => {
      return [...prevHeaders, newCol];
    });
    const updatedTableRows = tableRows.map((element) => {
      const newRow = {
        key: newCol.name,
        value: "",
      };
      element.values.push(newRow);
      return element;
    });
    setTableRows(updatedTableRows);
  };

  const addNewRows = (num: number) => {
    const newInput = [];
    /**
     * Loop through the headers, create a key, and value that is emtpy
     */
    for (let i = 0; i < num; i++) {
      const newRow = {
        values: [],
      };

      tableHeaders.forEach((header) => {
        console.log(header);
        const colData = {
          key: header.name,
          value: "",
        };
        newRow.values.push(colData);
      });

      newInput.push(newRow);
    }

    setTableRows((prevRows) => [...prevRows, ...newInput]);
  };

  const updateTableRows = (
    colName: string,
    rowIndex: number,
    newValue: number
  ) => {
    setTableRows(() => {
      const newRows = tableRows.map((element, index) => {
        if (index === rowIndex) {
          const rows = element.values;
          rows.findIndex((row) => {
            if (row.key === colName) {
              row.value = newValue;
            }
          });
        }
        return element;
      });
      return newRows;
    });
  };
  // combining into one because either removeTableRows() or removeTableHeaders() will override each other setTableRows()
  /**
   * after removeTableHeaders() it moves the setState() into the queue
   * so these changes into the rows are not immediately seen inside removeTableRows(),
   * removeTableRows() is still looking at the old state so it will override or somehow make it undefined?
   *
   * Solution, combine both functions into one
   */
  const removeRowsHeaders = (selectedHeaders, selectedRows) => {
    const filterHeaders = tableHeaders.filter((element, index) => {
      if (!selectedHeaders.includes(index)) {
        return element;
      }
    });
    setTableHeader(filterHeaders);

    const filtered = tableRows
      .map((row) => {
        // const tds = row.values; // wrong, it will reference to the original array, so make a copy instead
        const tds = [...row.values];

        tds.map((col, index) => {
          if (selectedHeaders.includes(index)) {
            tds.splice(index, 1);
          }
        });
        console.log("tds", tds);
        return { values: tds };
      })
      .filter((row, index) => {
        if (!selectedRows.includes(index)) {
          return row;
        }
      });

    setTableRows(filtered);
  };

  
  return (
    <TableContext.Provider
      value={{
        tableHeaders: [tableHeaders, setTableHeader],
        tableRows: [tableRows, setTableRows],
        addNewCol: addNewCol,
        addNewRows: addNewRows,
        updateTableRows: updateTableRows,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

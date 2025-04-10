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
  const removeTableRows = (setSelectedRows, setContextOpen) => {
    setTableRows((prevRows) => {
      console.log("prevRows", prevRows);
      const filterRows = prevRows.filter((rows, index) => {
        if (!selectedRows.includes(index)) {
          return rows;
        }
      });
      console.log("Filter Rows - ", filterRows);
      setSelectedRows([]);
      setContextOpen(false);
    });
  };

  const removeTableHeaders = (setSelectedHeaders, setContextOpen) => {
    const filterHeaders = tableHeaders.filter((element, index) => {
      if (!selectedHeaders.includes(index)) {
        return element;
      }
    });
    setTableHeader(filterHeaders);

    /**
     * Some how this modifies the original array. THis is because using splice() will modify the original arrray
     * so make a copy
     */
    const filter = tableRows.map((row) => {
      // const tds = row.values; // wrong, it will reference to the original array, so make a copy instead
      const tds = [...row.values];
      tds.map((columns, index) => {
        if (selectedHeaders.includes(index)) {
          tds.splice(index, 1);
        }
      });
      return { values: tds };
    });
    console.log("filty", filter);

    setTableRows(filter);
    setSelectedHeaders([]);
    setContextOpen(false);
  };

   const updateRemoveTag = (tagName: string) => {
     /**
      * FIrst I need to loop thorugh col headers to find columns that are Tag type
      * So I am going to get the indexes of these columns. [2,3]
      * Then I am going to loop through the rows. Getting the column at the tag array column.
      * Check if the value is the tagName, then make the tag an eempty value
      */

     const tagIndexes = tableHeaders.map((element, index) => {
       if (element.TYPE === TABLE_TYPE.TAG) {
         return index;
       }
     });

     const updated = [...tableRows];
     updated.forEach((row) => {
       row.values.forEach((element, index) => {
         if (
           tagIndexes.includes(index) &&
           row.values[index].value === tagName
         ) {
           row.values[index].value = "";
           console.log("yah");
         }
       });
     });
     setTableRows(updated);
   };

  return (
    <TableContext.Provider
      value={{
        tableHeaders: [tableHeaders, setTableHeader],
        tableRows: [tableRows, setTableRows],
        addNewCol: addNewCol,
        addNewRows: addNewRows,
        updateTableRows: updateTableRows,
        removeRowsHeaders: removeRowsHeaders,
        removeTableRows: removeTableRows,
        removeTableHeaders: removeTableHeaders,
        updateRemoveTag : updateRemoveTag
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

import { useEffect, useRef, useState } from "react";
import ColForm from "./components/ColForm.tsx";
import Navbar from "./components/Navbar.tsx";
import Table from "./Table/Table.tsx";
import RowForm from "./components/RowForm.tsx";
import { TABLE_TYPE } from "./constants/TABLE_TYPE.js";

import TableContextMenu from "./Table/TableContextMenu.tsx";
import TagForm from "./components/TagForm.tsx";

/**
 * App component carries all the necessary data (ex. TableHeaders, TableRows)
 * These datas are inside the App parent because their children (Table and ColForm) needs these information.
 * Table will render the tableHeaders. ColForm will have a form that allows users to add a new column
 * @returns
 */

function App() {
  const [contextOpen, setContextOpen] = useState(false);
  const [coords, setCoords] = useState({
    xCord: 0,
    yCord: 0,
  });
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

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const newColBtn = useRef(null); // ref returns a JS Object with a key called current
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
  const openColForm = () => {
    newColBtn.current.showModal();
  };
  const closeColForm = () => {
    newColBtn.current.close();
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
  const removeRowsHeaders = () => {
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
    setSelectedHeaders([]);
    setSelectedRows([]);
    setContextOpen(false);
  };

  const removeTableRows = () => {
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

  const removeTableHeaders = () => {
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
        if (tagIndexes.includes(index) && row.values[index].value === tagName) {
          row.values[index].value = "";
          console.log("yah");
        }
      });
    });
    setTableRows(updated);
  };

  console.log("App Component - SelectedRows:", selectedRows);
  console.log("App Component - Selected Table Headers:", selectedHeaders);
  console.log("App Component - TableHeadrs:", tableHeaders);
  console.log("App Component - Table Rows[]", tableRows);

  return (
    <>
      <Navbar tableHeaders={tableHeaders} tableRows={tableRows} />
      <div className="flex flex-row p-2">
        <TableContextMenu
          contextOpen={contextOpen}
          coords={coords}
          removeTableRows={removeTableRows}
          removeTableHeaders={removeTableHeaders}
          removeRowsHeaders={removeRowsHeaders}
        />
        <Table
          tableHeaders={tableHeaders}
          tableRows={tableRows}
          updateTableRows={updateTableRows}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          contextOpen={contextOpen}
          setContextOpen={setContextOpen}
          setCoords={setCoords}
          selectedHeaders={selectedHeaders}
          setSelectedHeaders={setSelectedHeaders}
          updateRemoveTag={updateRemoveTag}
        />
        <button
          className="rounded p-2 
      border-solid
      border-2
      border-blue-btn
       hover:cursor-pointer"
          onClick={openColForm}
        >
          +
        </button>
      </div>

      <RowForm addNewRows={addNewRows} />

      <dialog ref={newColBtn} className="absolute top-1/2 ">
        <ColForm closeColForm={closeColForm} addNewCol={addNewCol} />
      </dialog>
    </>
  );
}

export default App;

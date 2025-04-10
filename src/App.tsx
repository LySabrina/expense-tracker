import { useContext, useEffect, useRef, useState } from "react";
import ColForm from "./components/ColForm.tsx";
import Navbar from "./components/Navbar.tsx";
import Table from "./Table/Table.tsx";
import RowForm from "./components/RowForm.tsx";
import { TABLE_TYPE } from "./constants/TABLE_TYPE.js";

import TableContextMenu from "./Table/TableContextMenu.tsx";
import TagForm from "./components/TagForm.tsx";
import { TableContext } from "./context/TableProvider.tsx";

/**
 * App component carries all the necessary data (ex. TableHeaders, TableRows)
 * These datas are inside the App parent because their children (Table and ColForm) needs these information.
 * Table will render the tableHeaders. ColForm will have a form that allows users to add a new column
 * @returns
 */

function App() {
  const table = useContext(TableContext);
  const [tableHeaders, setTableHeader] = table.tableHeaders;
  const [tableRows, setTableRows] = table.tableRows;
  const {
    addNewCol,
    addNewRows,
    removeRowsHeaders: tableRemoveRowHeaders,
    removeTableRows: tableRemoveRows,
    rmeoveTableHeaders: tableRemoveHeaders,
  } = table;

  const [contextOpen, setContextOpen] = useState(false);
  const [coords, setCoords] = useState({
    xCord: 0,
    yCord: 0,
  });

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const newColBtn = useRef(null); // ref returns a JS Object with a key called current

  const openColForm = () => {
    newColBtn.current.showModal();
  };
  const closeColForm = () => {
    newColBtn.current.close();
  };

  const removeRowsHeaders = () => {
    tableRemoveRowHeaders(selectedHeaders, selectedRows);
    setSelectedHeaders([]);
    setSelectedRows([]);
    setContextOpen(false);
  };

  const removeTableRows = () => {
    tableRemoveRows(setSelectedRows, setContextOpen);
  };

  const removeTableHeaders = () => {
    tableRemoveHeaders(setSelectedHeaders, setContextOpen);
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
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          contextOpen={contextOpen}
          setContextOpen={setContextOpen}
          setCoords={setCoords}
          selectedHeaders={selectedHeaders}
          setSelectedHeaders={setSelectedHeaders}
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

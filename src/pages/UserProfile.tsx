import { useContext } from "react";
import { TableContext } from "../context/TableProvider";

export default function UserProfile() {
  const table = useContext(TableContext);
  const [tableHeaders, setTableHeader] = table.tableHeaders;
  const [tableRows, setTableRows] = table.tableRows;
  return <div>
    
  </div>;
}

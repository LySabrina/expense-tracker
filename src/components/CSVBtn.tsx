import { useRef } from "react";
import DownloadBtn from "../../src/assets/download-solid-white.svg";

function CSVBtn({ tableHeaders, tableRows }) {
  /**
   * Information needed for CSV file
   * Column headeers separated by commas, no spaces
   * Each line with the information in the row
   *
   * Fetch the Column headers
   * Then fetch the rows
   */
  console.log("Tableheaders here: ", tableHeaders);
  console.log("TableRows here: ", tableRows);
  /**
   * Rows are array of objects.
   * Inside each object is a property called values.
   * Values is an array of objects again.
   */

  const href = useRef(null);

  const convertToCSV = () => {
    let csvContent = "";

    tableHeaders.forEach((header) => {
      csvContent += header.name + ",";
    });
    csvContent += "\n";

    tableRows.forEach((element) => {
      let line = "";
      element.values.forEach((row) => {
        line += row.value + ",";
      });
      csvContent += line + "\n";
    });
    const todayDate = new Date().toLocaleDateString();

    const file = new File([csvContent], `CSV_${todayDate}`, {
      type: "text/csv",
    });
    const objURL = URL.createObjectURL(file);
    console.log("convert to csv");
    href.current.href = objURL;
  };

  return (
    <button
      className="text-white hover:cursor-pointer w-10"
      onClick={convertToCSV}
      title="Download CSV File"
    >
      <a href={""} ref={href}>
        <img src={DownloadBtn} alt="Download CSV File"></img>
      </a>
    </button>
  );
}
export default CSVBtn;

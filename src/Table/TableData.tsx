import { useEffect, useRef, useState } from "react";
import { TABLE_TYPE } from "../constants/TABLE_TYPE.js";
import { TAGS } from "../constants/TAGS.js";
import TagForm from "../components/TagForm.js";
function TableData({
  TYPE,
  value,
  colName,
  rowIndex,
  updateTableRows,
  isSelected,
  updateRemoveTag,
}) {
  const [currValue, setCurrValue] = useState(value);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setCurrValue(value);
  }, [value]);

  /**
   * To update, we use th row index to get the {} (JS object) associate with this table data.
   * based on this table data get from index. We will
   * @param {*} e
   */
  const editData = (e) => {
    const value = e.target.value;
    console.log("selected value from TableData.tsx", value);
    setCurrValue(value);
    updateTableRows(colName, rowIndex, value);
  };

  /**
   * In addition to onBlur, meaning when user clicks off, we use enter to enter data and turn edit mode off
   * @param e
   * @returns
   */
  const handleEnterKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      setIsEdit(false);
    }
  };

  return (
    <td
      className={`p-2 border-2 ${isSelected && "bg-green-300"}`}
      onDoubleClick={() => {
        setIsEdit(true);
      }}
      onBlur={() => setIsEdit(false)}
      // when the user clicks off,
      //  then we turn off our edit, how to handle it if the TagForm is open?
      // BEcause users will select off the <select> to click on the input? Take off autofocus on select
    >
      {isEdit ? (
        TYPE === "tag" ? (
          <TagForm
            handleEnterKeyDown={handleEnterKeyDown}
            editData={editData}
            value={currValue}
            setIsEdit={setIsEdit}
            updateRemoveTag={updateRemoveTag}
          />
        ) : (
          // <select value={currValue} onChange={editData} autoFocus>
          //   {TAGS.map((element, index) => (
          //     <option value={element}>{element}</option>
          //   ))}
          // </select>
          <input
            type={TYPE}
            value={currValue}
            onChange={editData}
            onKeyDown={(e) => handleEnterKeyDown(e)}
            autoFocus
          />
        )
      ) : (
        <>{currValue}</>
      )}
    </td>
  );
}

export default TableData;

import { useState } from "react";

function RowForm({ addNewRows }) {
  const [numRows, setNumRows] = useState(1);

  const updateNumRows = (e) => {
    let value = e.target.value;
    setNumRows(value);
  };

  const handleOnKeyDown = (e) => {
    const key = e.key;
    if (key === "Backspace" || key === "ArrowLeft" || key === "ArrowRight") {
      return true;
    }

    /**
     * <= will convert the string into number to perform comparison
     */
    if (key <= 9 && key >= 0) {
      return true;
    }
    // if input was neither number or backspace, do not allow user to press the key
    e.preventDefault();
  };

  const checkValidNum = () => {
    if (numRows === "" || numRows <= 0) {
      return false;
    }
    return true;
  };

  const submitRows = () => {
    if (checkValidNum()) {
      addNewRows(numRows);
    }
  };

  return (
    <div>
      <button
        className="rounded p-2 
      border-solid
      border-2
      border-blue-btn
       hover:cursor-pointer"
       onClick={submitRows}
      >
        Add
      </button>
      <input
        type="number"
        name="numRows"
        id="numRows"
        value={numRows}
        placeholder="1"
        className="text-right"
        onChange={updateNumRows}
        min={1}
        max={100}
        onKeyDown={handleOnKeyDown}
      />
      <span>more rows on the bottom</span>
    </div>
  );
}

export default RowForm;

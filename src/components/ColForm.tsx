import { useState } from "react";
import { TABLE_TYPE } from "../constants/TABLE_TYPE.js";

function ColForm({ closeColForm, addNewCol }) {
  const [form, setForm] = useState({
    TYPE: "empty",
    name: "",
  });

  const [error, setError] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (form.name === "" || form.TYPE === "empty") {
      alert("Missing col name or type");
      return;
    }

    addNewCol(form);
    closeColForm();
    setForm({
      TYPE: "empty",
      name: "",
    });

    /**
     * error -->
     * form.name = ""
     * form.type = "empty"
     *
     * this might because it's happening in the one-render while doing setForm() will set in the next render
     * so the above error code keeps the form changes to initial state and adds to the header array
     */
  };

  const updateForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  return (
    <form onSubmit={submitForm} className="flex flex-col p-4 rounded gap-y-5">
      <input
        type="text"
        name="name"
        id="name"
        autoFocus
        placeholder="Enter Col Name"
        onChange={updateForm}
        value={form.name}
      />
      <select name="TYPE" id="type" onChange={updateForm} value={form.TYPE}>
        <option disabled value={"empty"}>
          --- select an option ---
        </option>
        {Object.keys(TABLE_TYPE).map((type) => {
          return <option value={TABLE_TYPE[type]}>{type}</option>;
        })}
      </select>

      <button
        className="rounded p-2 
      border-solid
      border-2  
      border-blue-btn
       hover:cursor-pointer"
      >
        Add Column
      </button>
      <button
        className="rounded p-2 
      border-solid
      border-2
      border-blue-btn
       hover:cursor-pointer"
        type="button"
        onClick={() => {
          setForm({
            TYPE: "empty",
            name: "",
          });
          closeColForm();
        }}
      >
        Cancel
      </button>
    </form>
  );
}
export default ColForm;

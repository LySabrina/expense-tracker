import { useEffect, useRef, useState } from "react";
import { TAGS, addNewTag as addTag, removeTag } from "../constants/TAGS.js";

function TagForm({
  handleEnterKeyDown,
  editData,
  setIsEdit,
  value,
  updateRemoveTag,
}) {
  const [newTag, setNewTag] = useState("");
  const menu = useRef(null);
  console.log('TagForm.tsx', value)
  const addNewTag = (e) => {
    const key = e.key;
    if (key === "Enter") {
      if (newTag === "") {
        alert("Empty Tag name");
        return;
      }
      // add this tag to a list of tag
      /**
       * Grab the list of tags, and add that value
       * Make sure to check if  the newly added tag is unique, if it isn't, warn user
       */
      if (TAGS.includes(newTag.toUpperCase())) {
        alert("Duplicate Tag");
        return;
      }
      addTag(newTag);
      setIsEdit(false);
    }
  };

  const remove = (e, tagName) => {
    e.stopPropagation();
    if (!TAGS.includes(tagName.toUpperCase())) {
      alert("Error in removing non-existing tag");
      return;
    }
    removeTag(tagName);
    updateRemoveTag(tagName);
    setIsEdit(false);
  };

  const editNewTag = (e) => {
    const value = e.target.value;
    setNewTag(value);
  };

  return (
    <div className="bg-blue-200 flex flex-col">
      <select
        value={value}
        onChange={(e) => {
          console.log('change?')
          editData(e);
        }}
        onKeyDown={handleEnterKeyDown}
        ref={menu}
        size={4}
      > 
        <option value="" disabled>Choose Tag Value:</option>
        {TAGS.map((element) => (
          <option
            value={element}
            onContextMenu={(e) => {
              remove(e, element);
            }}
          >
            {element}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={newTag}
        onChange={editNewTag}
        onKeyDown={addNewTag}
        placeholder="Enter new tag name then press Enter"
      />
      <span>Edit</span>
    </div>
  );
}
export default TagForm;

import { useState } from "react";

function TableHeader({ TYPE, name, index, selectTableHeaders }) {
  const handleOnClick = () => {
    selectTableHeaders(index);
  };
  return (
    <th
      className="bg-table-header hover:cursor-pointer"
      onClick={handleOnClick}
    >
      {name}
    </th>
  );
}
export default TableHeader;

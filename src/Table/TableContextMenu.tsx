import { useEffect, useRef } from "react";

function TableContextMenu({
  contextOpen,
  coords,
  removeTableRows,
  removeTableHeaders,
  removeRowsHeaders,
}) {
  const dialog = useRef(null);

  useEffect(() => {
    open();
  }, [contextOpen, coords]);

  const open = () => {
    if (contextOpen) {
      dialog.current.show();
    } else {
      dialog.current.close();
    }
  };
  return (
    <dialog
      ref={dialog}
      className={`absolute top-[${coords.yCord}px] left-[${coords.xCord}px]`}
    >
      <ul className="bg-red-300 p-2">
        <li className="">
          <button
            onClick={() => {
              removeRowsHeaders();
            }}
          >
            <span>-</span>
            Delete Rows
          </button>
        </li>
      </ul>
    </dialog>
  );
}
export default TableContextMenu;

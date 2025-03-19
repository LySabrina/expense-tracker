import { useEffect, useRef } from "react";

function ContextMenu({ contextOpen, coords, removeTableRows }) {
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
          <button onClick={removeTableRows}>
            <span>-</span>
            Delete Rows
          </button>
        </li>
      </ul>
    </dialog>
  );
}
export default ContextMenu;

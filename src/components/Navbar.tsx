import CSVBtn from "./CSVBtn";
import UserBlack from "../assets/user-solid-black.svg";

function Navbar({ tableHeaders, tableRows }) {
  return (
    <nav className="bg-dark-black p-2 flex justify-between">
      <div>
        <img src="#" alt="" />
        <h1 className="text-white">Expense Tracker</h1>
      </div>

      <div className="flex justify-between">
        <div className="text-white">
          <button className="hover:cursor-pointer">
            <img src={UserBlack} alt="Login" className="" />
            Login
          </button>
        </div>
        <CSVBtn tableHeaders={tableHeaders} tableRows={tableRows} />
      </div>
    </nav>
  );
}
export default Navbar;

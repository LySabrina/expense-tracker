import CSVBtn from "./CSVBtn";
import UserBlack from "../assets/user-solid-black.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function Navbar({ tableHeaders, tableRows }) {
  const auth = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = auth;
  
  return (
    <nav className="bg-dark-black p-2 flex justify-between">
      <div>
        <img src="#" alt="" />
        <h1 className="text-white">Expense Tracker</h1>
      </div>

      <div className="flex justify-between">
        <div className="text-white">
          <button className="hover:cursor-pointer">
            {isLoggedIn ? (
              <Link to={"/profile"}>
                <img src={UserBlack} alt="Login" className="w-10" />
              </Link>
            ) : (
              <Link to={"/login"}>
                <img src={UserBlack} alt="Login" className="" />
                Login
              </Link>
            )}
          </button>
        </div>
        <CSVBtn tableHeaders={tableHeaders} tableRows={tableRows} />
      </div>
    </nav>
  );
}
export default Navbar;

import CSVBtn from "./CSVBtn";
function Navbar({ tableHeaders, tableRows }) {
  return (
    <nav className="bg-dark-black p-2">
      <div>
        <img src="#" alt="" />
        <h1 className="text-white">Expense Tracker</h1>
      </div>
      <div></div>
      <CSVBtn tableHeaders={tableHeaders} tableRows={tableRows} />
    </nav>
  );
}
export default Navbar;

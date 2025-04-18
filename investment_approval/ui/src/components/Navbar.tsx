import { Link } from "react-router";

const Navbar = () => (
  <nav className="bg-blue-600 p-4 text-white flex gap-6">
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/submit">Submit</Link>
    <Link to="/requests">Requests</Link>
    <Link to="/audit">Audit</Link>
    <Link to="/">Logout</Link>
  </nav>
);

export default Navbar;

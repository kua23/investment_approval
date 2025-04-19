import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => navigate("/"));
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-blue-700 cursor-pointer"
      >
        Investment Approval
      </div>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-800 hover:text-blue-600"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/submit")}
          className="text-gray-800 hover:text-blue-600"
        >
          Submit Request
        </button>
        <button
          onClick={() => navigate("/requests")}
          className="text-gray-800 hover:text-blue-600"
        >
          Requests
        </button>
        <button
          onClick={() => navigate("/audit")}
          className="text-gray-800 hover:text-blue-600"
        >
          Audit Logs
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

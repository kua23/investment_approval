import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface StatusSummary {
  status: string;
  count: number;
}

const Dashboard = () => {
  const [summary, setSummary] = useState<StatusSummary[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/dashboard/status-summary", {
      credentials: "include", // 🧠 Send cookie (JSESSIONID)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setSummary(data))
      .catch(() => setError("You are not logged in or not authorized."));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {summary.map((item) => (
          <div
            key={item.status}
            className="bg-white p-4 rounded shadow text-center"
          >
            <p className="text-xl font-semibold">{item.status}</p>
            <p className="text-3xl">{item.count}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/submit")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
        <button
          onClick={() => navigate("/requests")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          View Requests
        </button>
        <button
          onClick={() => navigate("/audit")}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          View Audit Logs
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Request {
  requestId: number;
  title: string;
  description: string;
  amount: number;
  status: string;
  submittedAt: string;
  submittedBy: {
    employeeId: number;
    firstName: string;
    lastName: string;
  };
  comments?: string;
}

const RequestsTable = () => {
  const [managerId, setManagerId] = useState<number | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔁 Auto-fetch managerId from current session
  useEffect(() => {
    fetch("/api/employees/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setManagerId(data.employeeId))
      .catch(() => navigate("/"));
  }, []);

  // Fetch requests only after managerId is set
  useEffect(() => {
    if (!managerId) return;

    fetch(`/api/dashboard/manager/${managerId}/pending`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setRequests)
      .catch(() =>
        setError("Could not load requests. Check your permissions.")
      );
  }, [managerId]);

  const actOnRequest = async (
    requestId: number,
    status: "APPROVED" | "REJECTED"
  ) => {
    const comments = prompt(`Enter comments for ${status.toLowerCase()}:`);
    if (!comments || !managerId) return;

    const res = await fetch(`/api/requests/action/${requestId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        approverId: managerId,
        status,
        comments,
      }),
    });

    if (res.ok) {
      // Refresh list
      const updated = await fetch(
        `/api/dashboard/manager/${managerId}/pending`,
        { credentials: "include" }
      );
      setRequests(await updated.json());
    } else {
      alert("Action failed.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>

      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Submitted By</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.requestId} className="text-center">
              <td className="border px-2 py-1">{req.title}</td>
              <td className="border px-2 py-1">₹{req.amount}</td>
              <td className="border px-2 py-1">
                {req.submittedBy.firstName} {req.submittedBy.lastName}
              </td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => actOnRequest(req.requestId, "APPROVED")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => actOnRequest(req.requestId, "REJECTED")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;

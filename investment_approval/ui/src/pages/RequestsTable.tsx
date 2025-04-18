import { useEffect, useState } from "react";

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
  const [managerId, setManagerId] = useState(""); // Input manually for now
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState("");

  const fetchPending = () => {
    fetch(`/api/dashboard/manager/${managerId}/pending`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setRequests)
      .catch(() => setError("Could not load requests. Check your manager ID or permissions."));
  };

  useEffect(() => {
    if (managerId) fetchPending();
  }, [managerId]);

  const actOnRequest = async (
    requestId: number,
    status: "APPROVED" | "REJECTED"
  ) => {
    const comments = prompt(`Enter comments for ${status.toLowerCase()}:`);
    if (!comments) return;

    const res = await fetch(`/api/requests/action/${requestId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        approverId: parseInt(managerId),
        status,
        comments,
      }),
    });

    if (res.ok) {
      fetchPending(); // refresh list
    } else {
      alert("Action failed.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>

      <input
        type="text"
        placeholder="Your Manager ID"
        value={managerId}
        onChange={(e) => setManagerId(e.target.value)}
        className="border px-2 py-1 mb-4"
      />

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
              <td className="border px-2 py-1">${req.amount}</td>
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

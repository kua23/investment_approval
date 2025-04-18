import { useEffect, useState } from "react";

interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  designation: string;
}

interface Request {
  requestId: number;
  title: string;
  amount: number;
}

interface AuditLog {
  id: number;
  action: string;
  timestamp: string;
  performedBy: Employee;
  request: Request;
}

const AuditLog = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/audit", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then(setLogs)
      .catch(() => setError("You are not authorized to view audit logs."));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Audit Log</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Action</th>
            <th className="border px-3 py-2">Performed By</th>
            <th className="border px-3 py-2">Request Title</th>
            <th className="border px-3 py-2">Amount</th>
            <th className="border px-3 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border px-3 py-2">{log.action}</td>
              <td className="border px-3 py-2">
                {log.performedBy.firstName} {log.performedBy.lastName} (
                {log.performedBy.designation})
              </td>
              <td className="border px-3 py-2">{log.request.title}</td>
              <td className="border px-3 py-2">${log.request.amount}</td>
              <td className="border px-3 py-2">
                {new Date(log.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLog;

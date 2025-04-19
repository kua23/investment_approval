import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface ManagerOption {
  employeeId: number;
  firstName: string;
  lastName: string;
  designation: string;
}

interface EmployeePayload {
  firstName: string;
  lastName: string;
  designation: string;
  phoneNumber: string;
  available: boolean;
  user: {
    username: string;
  };
  manager?: {
    employeeId: number;
  };
}
interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  designation: string;
  phoneNumber: string;
  available: boolean;
  user: {
    username: string;
    role: string;
  };
}
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [managerId, setManagerId] = useState<number | null>(null);
  const [managers, setManagers] = useState<ManagerOption[]>([]);

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔁 Fetch list of existing managers
  useEffect(() => {
    fetch("/api/employees", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const managerList = data.filter((emp: Employee) => emp.user?.role === "MANAGER");
        setManagers(managerList);
      })
      .catch((err) => console.error("Could not fetch managers", err));
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const userRes = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    if (userRes.ok) {
      const employeePayload: EmployeePayload = {
        firstName,
        lastName,
        designation,
        phoneNumber,
        available: true,
        user: {
          username,
        },
      };

      if (role === "EMPLOYEE" && managerId) {
        employeePayload.manager = {
          employeeId: managerId,
        };
      }

      const empRes = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(employeePayload),
      });

      if (empRes.ok) {
        setMessage("Registered successfully. Redirecting to login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("User created, but employee creation failed.");
      }

      // Reset form
      setUsername("");
      setPassword("");
      setRole("EMPLOYEE");
      setFirstName("");
      setLastName("");
      setDesignation("");
      setPhoneNumber("");
      setManagerId(null);
    } else {
      setMessage("Registration failed. Try a different username.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold">Register</h2>
        {message && <div className="text-blue-600">{message}</div>}

        <input
          type="text"
          placeholder="Username"
          className="border w-full p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="border w-full p-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <input
          type="text"
          placeholder="First Name"
          className="border w-full p-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="border w-full p-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Designation"
          className="border w-full p-2"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="border w-full p-2"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        {/* 👥 Manager dropdown only if role is EMPLOYEE */}
        {role === "EMPLOYEE" && (
          <select
            className="border w-full p-2"
            value={managerId || ""}
            onChange={(e) => setManagerId(Number(e.target.value))}
            required
          >
            <option value="">-- Select Manager --</option>
            {managers.map((mgr) => (
              <option key={mgr.employeeId} value={mgr.employeeId}>
                {mgr.firstName} {mgr.lastName} - {mgr.designation}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

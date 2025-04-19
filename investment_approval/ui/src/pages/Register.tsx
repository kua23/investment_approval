import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
  
    if (response.ok) {
      // Auto-create matching employee
      const empRes = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // required if user is already logged in after registration
        body: JSON.stringify({
          firstName: username,
          lastName: role,
          designation: role,
          available: true,
          phoneNumber: "9999999999",
          user: {
            username,
          },
        }),
      });
  
      if (empRes.ok) {
        setMessage("User registered & employee created. You can now log in.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("User created, but employee creation failed.");
      }
  
      setUsername("");
      setPassword("");
      setRole("EMPLOYEE");
    } else {
      setMessage("Registration failed. Try a different username.");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
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

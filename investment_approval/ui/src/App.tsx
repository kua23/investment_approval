import { Route, Routes } from "react-router";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SubmitRequest from "./pages/SubmitRequest.tsx";
import RequestsTable from "./pages/RequestsTable.tsx";
import AuditLog from "./pages/AuditLog.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitRequest />} />
        <Route path="/requests" element={<RequestsTable />} />
        <Route path="/audit" element={<AuditLog />} />
      </Routes>
    </div>
  );
}

export default App;

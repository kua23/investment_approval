import { useState } from "react";
const SubmitRequest = () => {
  const [employeeId, setEmployeeId] = useState(""); // In real app, you'd get this from session
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
        const response = await fetch(`/api/requests/submit/${employeeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title,
            description,
            amount: parseFloat(amount),
          }),
        });
  
        if (response.ok) {
          setMessage("Request submitted successfully!");
          setTitle("");
          setDescription("");
          setAmount("");
        } else {
          setMessage("Failed to submit request.");
        }
      } catch {
        setMessage("Error submitting request.");
      }
    };
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Submit Investment Request</h2>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full border p-2"
          required
        />

        <input
          type="text"
          placeholder="Request Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />

        <textarea
          placeholder="Request Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 h-24"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default SubmitRequest;

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    item: "",
    problem: "",
    comments: "",
    assignedFixer: "",
    resolution: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyU-W2yNquRkFLNpA0ERuWiTxI_54e7k_Er_TC6a8DB_Mb897Rr8raRatEaTWNvK6Vt/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Form submitted successfully!");
        setFormData({ name: "", email: "", item: "", problem: "", comments: "", assignedFixer: "", resolution: "" });
      } else {
        setMessage("Error submitting form. Try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Repair Cafe Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="item" placeholder="Broken Item" value={formData.item} onChange={handleChange} required className="w-full p-2 border rounded" />
          <textarea name="problem" placeholder="What's wrong?" value={formData.problem} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
          <textarea name="comments" placeholder="Comments (Fixer's Notes)" value={formData.comments} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
          <input type="text" name="assignedFixer" placeholder="Assigned Fixer" value={formData.assignedFixer} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="resolution" placeholder="Resolution" value={formData.resolution} onChange={handleChange} className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}

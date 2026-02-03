import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Result from "./Result";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        const msg = data.error
          ? `${data.message}\n\n${data.error}`
          : data.message || "Failed to save. Try again.";
        alert(msg);
        return;
      }
      navigate("/result");
    } catch {
      alert("Network error. Is the backend running on http://localhost:5000?");
    }
  };

  return (
    <Routes>
      {/* FORM PAGE */}
      <Route
        path="/"
        element={
          <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h1 className="text-2xl font-bold text-center mb-4 text-green-700">
                Golf Course Form
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "location", "email", "phone"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium capitalize">
                      {field}
                    </label>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                ))}

                <button className="w-full bg-green-600 text-white py-2 rounded">
                  Submit
                </button>
              </form>
            </div>
          </div>
        }
      />

      {/* RESULT PAGE */}
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;

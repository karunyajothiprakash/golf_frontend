import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Result from "./Result";

const API_URL = "https://golf-backend-wmbb.onrender.com";

function App() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save data");
        return;
      }

      navigate("/result");
    } catch (error) {
      alert("Backend not reachable");
    }
  };

  return (
    <Routes>
      {/* FORM PAGE */}
      <Route
        path="/"
        element={
          <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
                      type="text"
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

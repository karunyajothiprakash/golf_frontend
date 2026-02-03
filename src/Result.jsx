import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://golf-backend-wmbb.onrender.com";

function Result() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // fetch users
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]));
  }, []);

  if (users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>No data found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4 text-green-700">
          Users from Database
        </h1>

        <table className="w-full border">
          <thead>
            <tr className="bg-green-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.location}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded"
        >
          Back to Form
        </button>
      </div>
    </div>
  );
}

export default Result;

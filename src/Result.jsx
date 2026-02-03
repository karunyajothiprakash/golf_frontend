import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // ✅ FETCH DATA FROM DATABASE
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]));
  }, []);

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>No data found in database</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
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
            {users.map(user => (
              <tr key={user.id}>
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

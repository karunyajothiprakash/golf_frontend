import React from "react";
import { Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";
import Result from "./Result";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default AppRoutes;

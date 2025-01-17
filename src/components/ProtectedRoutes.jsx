import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("vendorId"); // Example logic

  return  <Outlet /> 
};

export default ProtectedRoutes;

import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Panel from "./pages/panel/Panel";

interface PrivateRouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = ({}) => {
  const isAuthenticated = localStorage.getItem("access_token");

  return isAuthenticated ? <Panel /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

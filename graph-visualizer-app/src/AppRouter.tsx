import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Viewer from "./pages/viewer/Viewer";
import NotFound from "./pages/not_found/NotFound";
import Login from "./pages/login/Login";
import PrivateRoute from "./PrivateRoute";
// import NotFound from "./pages/NotFound";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/panel" element={<PrivateRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

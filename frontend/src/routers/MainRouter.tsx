import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";

import PrivateRoute from "@/components/PrivateRoute";

import InnerRouter from "./InnerRouter";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <PrivateRoute>
              <InnerRouter />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;

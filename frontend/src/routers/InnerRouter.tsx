import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function InnerRouter() {
  return (
    <Routes>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default InnerRouter;

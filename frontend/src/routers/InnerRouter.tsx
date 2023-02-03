import { BrowserRouter as _Router, Routes, Route } from "react-router-dom";

function InnerRouter() {
  return (
    <Routes>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default InnerRouter;

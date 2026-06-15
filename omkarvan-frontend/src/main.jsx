import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import TreeDetails from "./pages/TreeDetails";
import BatchPage from "./pages/BatchPage";
import BatchListPage from "./pages/BatchListPage";
import BatchDetailsPage from "./pages/BatchDetailsPage";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/tree/:treeCode"
        element={<TreeDetails />}
      />
      <Route
        path="/batch"
        element={<BatchPage />}
      />
      <Route
        path="/batches"
        element={<BatchListPage />}
      />
      <Route
        path="/batches/:batchId"
        element={<BatchDetailsPage />}
      />
    </Routes>
  </BrowserRouter>
);
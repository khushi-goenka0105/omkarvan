import React from "react";
import "./index.css";
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
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import SearchPage from "./pages/SearchPage";
import PrintLabelsPage from "./pages/PrintLabelsPage";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/search"
        element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        }
      />
      <Route
        path="/tree/:treeCode"
        element={<TreeDetails />}
      />
      <Route
  path="/batch"
  element={
    <MainLayout>
      <BatchPage />
    </MainLayout>
  }
/>
      <Route
        path="/batches"
        element={
          <MainLayout>
            <BatchListPage />
          </MainLayout>
        }
      />
      <Route
        path="/batches/:batchId"
        element={
          <MainLayout>
            <BatchDetailsPage />
          </MainLayout>
        }
      />
      <Route
  path="/print-labels/:batchId"
  element={<PrintLabelsPage />}
/>
    </Routes>
  </BrowserRouter>
);
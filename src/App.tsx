// src/App.tsx
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Dashboard from "./pages/Dashboard"; // Assuming you have this page
import LandingPage from "./pages/LandingPage";
import PasswordPage from "./pages/PasswordPage";
import AuthGuard from "./components/AuthGuard"; // We'll create this component

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root path shows landing page with list of weddings */}
        <Route path="/" element={<LandingPage />} />

        {/* Password protected route */}
        <Route path="/d/:projectId" element={<PasswordPage />} />

        {/* Main app with dynamic project ID (protected) */}
        <Route
          path="/app/:projectId"
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Route>

        {/* Catch-all route for any other paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// src/App.tsx
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";

const Home = React.lazy(() => import("./pages/Home"));

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-secondary">
    <div className="text-primary text-lg">Loading...</div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          {/* 404 page */}
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;

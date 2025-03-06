// src/components/Layout.tsx
import React from "react";
import {Outlet} from "react-router-dom";
import FloatingNotification from "./FloatingNotification";
import InstallPrompt from "./InstallPrompt";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary native-container">
      {/* Status bar spacer - adjusts to device status bar height */}
      <div className="status-bar-spacer" />

      {/* Install prompt banner at top - only shows in browser mode */}
      <InstallPrompt />

      {/* Main content with safe area padding */}
      <main className="flex-1 px-4 py-4 safe-area-inset">
        {/* Page content */}
        <Outlet />
      </main>

      {/* Bottom safe area spacer */}
      <div className="safe-area-bottom" />

      {/* Floating notification request that disappears when allowed */}
      <FloatingNotification />
    </div>
  );
};

export default Layout;

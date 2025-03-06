// src/components/LoadingScreen.tsx
import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary items-center justify-center px-4 py-4">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-primary-light opacity-25"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <p className="text-text-secondary font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

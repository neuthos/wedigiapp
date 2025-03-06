// src/components/NotFound.tsx
import React from "react";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({message = "Page not found"}) => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary items-center justify-center px-4 py-4">
      <div className="glass-light p-6 w-full max-w-md text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-display text-text-primary mb-3">
          {message}
        </h1>
        <p className="text-text-secondary mb-6">
          Please make sure you're using the correct wedding URL with a valid
          project ID.
        </p>
        <p className="text-sm text-text-secondary">
          The correct format is: /d/[project-id]
        </p>
      </div>
    </div>
  );
};

export default NotFound;

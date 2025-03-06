// src/components/UserRoleSelection.tsx
import React from "react";

interface UserRoleSelectionProps {
  brideInfo: {
    name: string;
    photo: string;
  };
  groomInfo: {
    name: string;
    photo: string;
  };
  onSelect: (role: string) => void;
}

const UserRoleSelection: React.FC<UserRoleSelectionProps> = ({
  brideInfo,
  groomInfo,
  onSelect,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-8">
      <div className="glass-light p-6 w-full max-w-md rounded-xl">
        <h1 className="text-2xl font-display text-center text-text-primary mb-2">
          Welcome to Our Wedding App
        </h1>

        <p className="text-text-secondary mb-8 text-center">
          Please select who you are to personalize your experience
        </p>

        <div className="space-y-6">
          <button
            onClick={() => onSelect("bride")}
            className="w-full p-4 glass-primary hover:bg-primary-light rounded-lg flex items-center transition-all group"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
              <img
                src={brideInfo.photo}
                alt={brideInfo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-medium text-text-primary">
                {brideInfo.name}
              </h3>
              <p className="text-sm text-text-secondary">Bride</p>
            </div>
            <span className="text-xl w-10 opacity-80">👰</span>
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-primary-light opacity-30"></div>
            <span className="flex-shrink mx-4 text-text-secondary text-sm">
              or
            </span>
            <div className="flex-grow border-t border-primary-light opacity-30"></div>
          </div>

          <button
            onClick={() => onSelect("groom")}
            className="w-full p-4 glass-primary hover:bg-primary-light rounded-lg flex items-center transition-all group"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
              <img
                src={groomInfo.photo}
                alt={groomInfo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-medium text-text-primary">
                {groomInfo.name}
              </h3>
              <p className="text-sm text-text-secondary">Groom</p>
            </div>
            <span className="text-xl w-10 opacity-80">🤵</span>
          </button>
        </div>

        <div className="mt-8 p-4 bg-secondary-dark/20 rounded-lg">
          <p className="text-sm text-text-secondary text-center">
            This selection will be saved for future visits. You can change it
            later in settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRoleSelection;

/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/InstallPromptEnhanced.tsx
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface InstallPromptProps {
  projectId: string | undefined;
  installPromptEvent: any; // beforeinstallprompt event
  credentialToken: string;
}

const InstallPromptEnhanced: React.FC<InstallPromptProps> = ({
  projectId,
  installPromptEvent,
  credentialToken,
}) => {
  const [isIOSDevice, setIsIOSDevice] = useState<boolean>(false);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if it's an iOS device
    const checkIOSDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    };

    // Check if app is already installed
    const checkInstalled = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true
      );
    };

    setIsIOSDevice(checkIOSDevice());
    setIsInstallable(!!installPromptEvent);
    setIsInstalled(checkInstalled());

    // Listen for app installation
    const handleAppInstalled = () => {
      setIsInstalled(true);

      // Once installed, we could automatically redirect to the app
      // But for better UX, we'll let the user click a button
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [installPromptEvent]);

  const handleInstallClick = async () => {
    if (!installPromptEvent) return;

    try {
      // Show the install prompt
      const choiceResult = await installPromptEvent.prompt();

      // Wait for the user to respond to the prompt
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    } catch (error) {
      console.error("Error installing PWA:", error);
    }
  };

  const handleOpenApp = () => {
    // If installed, redirect to the app with credential
    if (projectId) {
      if (credentialToken) {
        window.location.href = `/app/${projectId}?cred=${credentialToken}`;
      } else {
        navigate(`/app/${projectId}`);
      }
    }
  };

  // Render different UIs based on device type and install state
  if (isInstalled) {
    return (
      <div className="text-center">
        <div className="bg-ui-success/20 text-ui-success rounded-lg p-4 mb-6">
          <p className="font-medium">Wedding app is successfully installed!</p>
        </div>
        <button
          onClick={handleOpenApp}
          className="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Open Wedding App
        </button>
      </div>
    );
  }

  if (isIOSDevice) {
    return (
      <div className="text-center">
        <div className="border border-ui-info/30 bg-ui-info/10 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-text-primary mb-2">
            Install on iOS:
          </h3>
          <ol className="text-left text-text-secondary text-sm space-y-2">
            <li>
              1. Tap the share icon{" "}
              <span className="inline-block w-5 h-5 text-center bg-gray-200 rounded">
                ↑
              </span>{" "}
              at the bottom of the screen
            </li>
            <li>2. Scroll down and tap "Add to Home Screen"</li>
            <li>3. Tap "Add" in the top right corner</li>
          </ol>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-ui-info text-white font-medium py-3 px-4 rounded-lg"
        >
          I've Installed the App
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      {isInstallable ? (
        <button
          onClick={handleInstallClick}
          className="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Install Wedding App
        </button>
      ) : (
        <div className="border border-ui-warning/30 bg-ui-warning/10 rounded-lg p-4">
          <p className="text-text-secondary text-sm">
            This browser doesn't support app installation. Please use Chrome or
            Edge on Android, or Safari on iOS.
          </p>
        </div>
      )}
    </div>
  );
};

export default InstallPromptEnhanced;

/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/InstallPrompt.tsx
import {useState, useEffect} from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{outcome: "accepted" | "dismissed"}>;
}

const InstallPrompt: React.FC = () => {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if app is already installed (in standalone mode)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      // App is already installed, don't show prompt
      return;
    }

    // Store the install prompt event for later use
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async (): Promise<void> => {
    if (!installPromptEvent) return;

    // Show the install prompt
    await installPromptEvent.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await installPromptEvent.userChoice;

    // User accepted, hide the prompt
    if (choiceResult.outcome === "accepted") {
      setIsVisible(false);
    }

    // Clear the saved prompt either way
    setInstallPromptEvent(null);
  };

  const dismissPrompt = (): void => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="sticky top-0 left-0 right-0 z-50 banner-slide-in no-select">
      <div className="glass-primary p-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
            📱
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">
              Install this app for the best experience
            </p>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-3 py-1 rounded-lg text-sm font-medium text-center bg-white text-primary active:bg-white/90 transition-colors mr-1"
          >
            Install
          </button>
          <button
            onClick={dismissPrompt}
            className="w-8 h-8 flex items-center justify-center text-white/80 rounded-full"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;

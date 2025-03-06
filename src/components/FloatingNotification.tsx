// src/components/FloatingNotification.tsx
import {useState, useEffect} from "react";
import {
  requestNotificationPermission,
  subscribeToPushNotifications,
} from "../utils/pwaUtils";

// Replace with your actual VAPID public key
const VAPID_PUBLIC_KEY =
  (import.meta.env.VITE_VAPID_PUBLIC_KEY as string) || "YOUR_VAPID_PUBLIC_KEY";

type PermissionStatus = NotificationPermission | "not-supported" | "error";

const FloatingNotification: React.FC = () => {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("default");
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Check existing permission on component mount
  useEffect(() => {
    if ("Notification" in window) {
      const currentPermission = Notification.permission;
      setPermissionStatus(currentPermission);

      // Hide if already granted
      if (currentPermission === "granted") {
        setIsVisible(false);
      }
    } else {
      setIsVisible(false); // Hide if notifications not supported
    }
  }, []);

  const handleRequestPermission = async (): Promise<void> => {
    setLoading(true);
    try {
      const permission = await requestNotificationPermission();
      setPermissionStatus(permission);

      if (permission === "granted") {
        await handleSubscribeToPush();
        // Hide the notification prompt after successful subscription
        setTimeout(() => setIsVisible(false), 1500);
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribeToPush = async (): Promise<void> => {
    try {
      const pushSubscription = await subscribeToPushNotifications(
        VAPID_PUBLIC_KEY
      );
      setSubscription(pushSubscription);

      if (pushSubscription) {
        // Send the subscription to your server
        await saveSubscriptionToServer(pushSubscription);
      }
    } catch (error) {
      console.error("Error subscribing to push:", error);
    }
  };

  const saveSubscriptionToServer = async (
    subscription: PushSubscription
  ): Promise<void> => {
    try {
      // Replace with your actual API endpoint
      const endpoint =
        (import.meta.env.VITE_PUSH_SUBSCRIPTION_API as string) ||
        "/api/save-subscription";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription,
          userId: "current-user-id", // Replace with actual user ID
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save subscription");
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };

  const dismissNotification = (): void => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  // Show success state briefly before hiding
  if (permissionStatus === "granted" && subscription) {
    return (
      <div className="fixed bottom-4 right-4 left-4 z-50 native-fade-enter-active no-select">
        <div className="glass-primary p-4 rounded-lg shadow-lg flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
            ✓
          </div>
          <div className="flex-1">
            <p className="text-white font-medium">Notifications enabled</p>
          </div>
        </div>
      </div>
    );
  }

  // Default state or denied state
  return (
    <div className="fixed bottom-4 right-4 left-4 z-50 native-fade-enter-active no-select">
      <div className="glass-primary p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
            🔔
          </div>
          <div className="flex-1">
            <p className="text-white font-medium">Enable notifications</p>
            <p className="text-white/80 text-sm">
              Get updates when photos are added
            </p>
          </div>
          <button
            onClick={dismissNotification}
            className="w-8 h-8 flex items-center justify-center text-white/80 rounded-full"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={dismissNotification}
            className="flex-1 py-2 rounded-lg font-medium text-center bg-white/20 text-white active:bg-white/30 transition-colors"
          >
            Later
          </button>
          <button
            onClick={handleRequestPermission}
            disabled={loading || permissionStatus === "denied"}
            className="flex-1 py-2 rounded-lg font-medium text-center bg-white text-primary active:bg-white/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Setting up..." : "Enable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingNotification;

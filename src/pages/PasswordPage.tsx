/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/PasswordPage.tsx
import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import InstallPrompt from "../components/InstallPromptEnhanced"; // We'll create this

interface WeddingDataForPassword {
  id: string;
  bride: string;
  groom: string;
  date: string;
  coverImage: string;
  password: string;
}

const PasswordPage: React.FC = () => {
  const {projectId} = useParams<{projectId: string}>();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [weddingData, setWeddingData] = useState<WeddingDataForPassword | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPromptEvent(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    const fetchWeddingData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data with passwords
        const mockWeddingData: Record<string, WeddingDataForPassword> = {
          "12345": {
            id: "12345",
            bride: "Sarah Johnson",
            groom: "Michael Smith",
            date: "2025-05-15",
            coverImage:
              "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            password: "amicantik",
          },
          "67890": {
            id: "67890",
            bride: "Emma Wilson",
            groom: "Daniel Brown",
            date: "2025-06-20",
            coverImage:
              "https://images.unsplash.com/photo-1529636444744-adffc9135a5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            password: "amicantik",
          },
          "24680": {
            id: "24680",
            bride: "Jennifer Davis",
            groom: "Christopher Lee",
            date: "2025-07-10",
            coverImage:
              "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            password: "amicantik",
          },
          "13579": {
            id: "13579",
            bride: "Jessica Martinez",
            groom: "Andrew Taylor",
            date: "2025-08-05",
            coverImage:
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            password: "amicantik",
          },
        };

        if (!projectId || !mockWeddingData[projectId]) {
          setError("Wedding not found");
          return;
        }

        setWeddingData(mockWeddingData[projectId]);

        // Check if we already have authenticated this wedding in localStorage
        const isAuthenticated =
          localStorage.getItem(`auth_${projectId}`) === "true";
        if (isAuthenticated) {
          setIsAuthenticated(true);
        }

        // Check for credentials in URL (for PWA direct launch)
        const urlParams = new URLSearchParams(window.location.search);
        const credFromUrl = urlParams.get("cred");
        const storedCred = localStorage.getItem(`credential_${projectId}`);

        if (credFromUrl && storedCred && credFromUrl === storedCred) {
          // Valid credential from PWA launch
          setIsAuthenticated(true);
          // Redirect to app with user role selection
          navigate(`/app/${projectId}`);
        }
      } catch (error) {
        setError("Error loading wedding data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingData();
  }, [projectId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!weddingData) return;

    if (password === weddingData.password) {
      // Set authenticated flag in localStorage
      localStorage.setItem(`auth_${projectId}`, "true");

      // Record this visit timestamp
      localStorage.setItem(`last_visit_${projectId}`, String(Date.now()));

      // Generate a credential token (would be more secure with actual encryption in production)
      const credentialToken = btoa(`${projectId}:${Date.now()}`);
      localStorage.setItem(`credential_${projectId}`, credentialToken);

      // Check if the app can be installed
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again.");
      setAttempts((prev) => prev + 1);
      setPassword("");
    }
  };

  // Show loading screen while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary-light opacity-25"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  // Show error if wedding not found
  if (error && !weddingData) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <div className="glass-light p-6 rounded-xl max-w-md w-full text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-display text-text-primary mb-4">
            {error}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  // Render password form or install prompt
  if (isAuthenticated && weddingData) {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="h-64 relative overflow-hidden">
          <img
            src={weddingData.coverImage}
            alt={`${weddingData.bride} & ${weddingData.groom}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h1 className="font-script text-3xl mb-1">
              {weddingData.bride} & {weddingData.groom}
            </h1>
            <p className="font-display opacity-90">
              {new Date(weddingData.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="p-4 max-w-md mx-auto -mt-8">
          <div className="glass-light p-6 rounded-xl shadow-card">
            <h2 className="text-xl font-display text-text-primary mb-4 text-center">
              Install Wedding App
            </h2>

            <p className="text-text-secondary text-center mb-6">
              You've entered the correct password! Install the app to continue.
            </p>

            <InstallPrompt
              projectId={projectId}
              installPromptEvent={installPromptEvent}
              credentialToken={
                localStorage.getItem(`credential_${projectId}`) || ""
              }
            />

            <p className="mt-6 text-center text-ui-info text-sm">
              After installing, you can launch the app directly without entering
              the password again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Password entry form
  return (
    <div className="min-h-screen bg-secondary">
      {weddingData && (
        <>
          {/* Wedding cover image */}
          <div className="h-64 relative overflow-hidden">
            <img
              src={weddingData.coverImage}
              alt={`${weddingData.bride} & ${weddingData.groom}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h1 className="font-script text-3xl mb-1">
                {weddingData.bride} & {weddingData.groom}
              </h1>
              <p className="font-display opacity-90">
                {new Date(weddingData.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Password form */}
          <div className="p-4 max-w-md mx-auto -mt-8">
            <div className="glass-light p-6 rounded-xl shadow-card">
              <h2 className="text-xl font-display text-text-primary mb-4 text-center">
                Enter Wedding Password
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-text-secondary mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-primary-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {error && attempts > 0 && (
                  <div className="bg-ui-error/20 text-ui-error px-3 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  Access Wedding App
                </button>
              </form>

              <p className="mt-6 text-center text-text-secondary text-sm">
                Password required to access this wedding app. Please contact the
                couple if you don't have the password.
              </p>
            </div>
          </div>

          {/* Back button */}
          <div className="p-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              ← Back to all weddings
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordPage;

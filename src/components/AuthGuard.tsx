// src/components/AuthGuard.tsx
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({children}) => {
  const {projectId} = useParams<{projectId: string}>();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if authenticated
    const checkAuth = () => {
      if (!projectId) {
        navigate("/");
        return;
      }

      // Check for credentials in URL (for PWA direct launch)
      const urlParams = new URLSearchParams(window.location.search);
      const credFromUrl = urlParams.get("cred");
      const storedCred = localStorage.getItem(`credential_${projectId}`);

      // Check authentication methods
      const isAuthByStorage =
        localStorage.getItem(`auth_${projectId}`) === "true";
      const isAuthByCredential =
        credFromUrl && storedCred && credFromUrl === storedCred;

      if (isAuthByStorage || isAuthByCredential) {
        setIsAuthenticated(true);

        // Record this visit timestamp
        localStorage.setItem(`last_visit_${projectId}`, String(Date.now()));

        // If we came from a credential in URL, clean it up to avoid exposing it in browser history
        if (isAuthByCredential && window.history.replaceState) {
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      } else {
        setIsAuthenticated(false);
        // Redirect to password page
        navigate(`/d/${projectId}`);
      }
    };

    checkAuth();
  }, [projectId, navigate]);

  // Show loading screen while checking authentication
  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  // If authenticated, render children
  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;

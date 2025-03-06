// src/components/Layout.tsx
import React, {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";
import FloatingNotification from "./FloatingNotification";
import InstallPrompt from "./InstallPrompt";
import UserRoleSelection from "./UserRoleSelection";
import NotFound from "./NotFound";
import LoadingScreen from "./LoadingScreen";
import MockApiService, {WeddingProject} from "../services/MockApiService";
import StorageService from "../services/StorageService";
import ManifestService from "../services/ManifestService";

const Layout: React.FC = () => {
  const {projectId} = useParams<{projectId: string}>();
  const [weddingData, setWeddingData] = useState<WeddingProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch wedding data when projectId changes
  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) {
        setLoading(false);
        setError("Project ID not provided");
        return;
      }

      try {
        setLoading(true);
        const data = await MockApiService.getProjectById(projectId);

        if (!data) {
          setError("Wedding project not found");
          return;
        }

        setWeddingData(data);

        // Record this visit to increment download counter (only once)
        const lastVisit = StorageService.getLastVisit(projectId);
        if (!lastVisit) {
          await MockApiService.recordDownload(projectId);
        }

        // Record this visit timestamp
        StorageService.recordVisit(projectId);
      } catch (error) {
        console.error("Error fetching wedding data:", error);
        setError("Failed to load wedding data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  // Check if user has already selected a role
  useEffect(() => {
    if (projectId) {
      const savedRole = StorageService.getUserRole(projectId);
      if (savedRole) {
        setUserRole(savedRole);
      }
    }
  }, [projectId]);

  // Update manifest dynamically
  useEffect(() => {
    if (projectId && weddingData) {
      try {
        ManifestService.updateManifest(projectId, weddingData);
      } catch (error) {
        console.error("Error updating manifest:", error);
      }
    }
  }, [projectId, weddingData]);

  // Handle user role selection
  const handleRoleSelect = (role: string) => {
    if (projectId) {
      StorageService.saveUserRole(projectId, role);
      setUserRole(role);
    }
  };

  // Show loading screen while fetching data
  if (loading) {
    return <LoadingScreen />;
  }

  // Show error if there's an issue
  if (error || !weddingData) {
    return <NotFound message={error || "Wedding project not found"} />;
  }

  // If user hasn't selected a role, show role selection
  if (!userRole) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary">
        <div className="status-bar-spacer" />
        <main className="flex-1 px-4 py-4 safe-area-inset">
          <UserRoleSelection
            brideInfo={{
              name: weddingData.bride.name,
              photo: weddingData.bride.photo,
            }}
            groomInfo={{
              name: weddingData.groom.name,
              photo: weddingData.groom.photo,
            }}
            onSelect={handleRoleSelect}
          />
        </main>
        <div className="safe-area-bottom" />
      </div>
    );
  }

  // Normal layout when everything is set up
  return (
    <div className="flex flex-col min-h-screen bg-secondary native-container">
      {/* Status bar spacer - adjusts to device status bar height */}
      <div className="status-bar-spacer" />

      {/* Install prompt banner at top - only shows in browser mode */}
      <InstallPrompt />

      {/* Main content with safe area padding */}
      <main className="flex-1 px-4 py-4 safe-area-inset">
        {/* Pass wedding data and user role to the children */}
        <Outlet context={{weddingData, userRole}} />
      </main>

      {/* Bottom safe area spacer */}
      <div className="safe-area-bottom" />

      {/* Floating notification request that disappears when allowed */}
      <FloatingNotification />
    </div>
  );
};

export default Layout;

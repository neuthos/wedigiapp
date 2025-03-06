/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useWeddingData.ts
import {useState, useEffect} from "react";

interface WeddingData {
  bride: string;
  groom: string;
  date: string;
  venue: string;
  isActive: boolean;
  [key: string]: any; // For any additional properties
}

/**
 * Custom hook to fetch and manage wedding data
 * @param projectId The wedding project ID
 */
export function useWeddingData(projectId: string | undefined) {
  const [data, setData] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Reset states when project ID changes
    setLoading(true);
    setError(null);

    if (!projectId) {
      setLoading(false);
      return;
    }

    const fetchWeddingData = async () => {
      try {
        // This will be replaced with your actual API call
        // For now, it's using mock data
        const mockData: Record<string, WeddingData> = {
          "12345": {
            bride: "Sarah Johnson",
            groom: "Michael Smith",
            date: "2025-05-15",
            venue: "Sunset Gardens",
            isActive: true,
          },
          "67890": {
            bride: "Emma Wilson",
            groom: "Daniel Brown",
            date: "2025-06-20",
            venue: "Ocean View Resort",
            isActive: true,
          },
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const result = mockData[projectId];

        if (!result) {
          throw new Error("Wedding project not found");
        }

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingData();
  }, [projectId]);

  return {data, loading, error};
}

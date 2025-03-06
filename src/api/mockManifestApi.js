// src/api/mockManifestApi.js
// This would be a server-side API endpoint in a real implementation

/**
 * This is a mock implementation of what a server-side manifest generation API would look like
 * In a real implementation, this would be a server route like '/api/manifest/:projectId'
 *
 * @param {string} projectId - The wedding project ID
 * @param {string} credential - Optional credential token for auto-authentication
 * @returns {Object} - The web app manifest JSON
 */
function generateDynamicManifest(projectId, credential = "") {
  // In a real implementation, you would fetch the wedding data from a database
  const weddingData = {
    id: projectId,
    bride: "Sarah Johnson",
    groom: "Michael Smith",
  };

  // Build the start_url with credential if provided
  let startUrl = `/app/${projectId}`;
  if (credential) {
    startUrl += `?cred=${credential}`;
  }

  // Generate the manifest
  return {
    name: `${weddingData.bride} & ${weddingData.groom} Wedding`,
    short_name: `${weddingData.bride} & ${weddingData.groom}`,
    description: "Wedding app for our special day",
    start_url: startUrl,
    id: `/app/${projectId}`,
    display: "standalone",
    orientation: "portrait",
    theme_color: "#b89f8d",
    background_color: "#f5f0eb",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/homescreen.png",
        sizes: "1080x2340",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: "/screenshots/gallery.png",
        sizes: "1080x2340",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
    shortcuts: [
      {
        name: "Gallery",
        short_name: "Gallery",
        description: "View wedding photos",
        url: `/app/${projectId}/gallery`,
      },
      {
        name: "Timeline",
        short_name: "Timeline",
        description: "See wedding schedule",
        url: `/app/${projectId}/timeline`,
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
    display_override: ["standalone", "minimal-ui"],
  };
}

export default generateDynamicManifest;

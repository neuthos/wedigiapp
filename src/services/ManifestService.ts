/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/ManifestService.ts

/**
 * Service to handle dynamic updates to the web app manifest
 */
class ManifestService {
  /**
   * Updates the manifest dynamically based on the wedding project
   * @param projectId The wedding project ID
   * @param weddingData The wedding data object
   */
  public updateManifest(projectId: string, weddingData: any): void {
    if (!projectId || !weddingData) return;

    // Get credential token from localStorage if exists
    const credentialToken =
      localStorage.getItem(`credential_${projectId}`) || "";

    // Update start_url in manifest
    this.updateStartUrl(projectId, credentialToken);

    // Update app name with couple names
    this.updateAppName(`${weddingData.bride.name} & ${weddingData.groom.name}`);

    // Update theme color
    this.updateThemeColor("#b89f8d"); // Using the primary color from your theme

    // Update document title
    document.title = `${weddingData.bride.name} & ${weddingData.groom.name} | Wedding`;
  }

  /**
   * Updates the start_url in the manifest
   * @param projectId The wedding project ID
   * @param credentialToken Optional credential token for automatic authentication
   */
  private updateStartUrl(
    projectId: string,
    credentialToken: string = ""
  ): void {
    // In a real implementation, you might generate a new manifest JSON file
    // For client-side only, we can only modify existing HTML tags

    // Update canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      const startUrl = credentialToken
        ? `${window.location.origin}/app/${projectId}?cred=${credentialToken}`
        : `${window.location.origin}/app/${projectId}`;

      canonicalLink.setAttribute("href", startUrl);
    }

    // We can't directly modify the manifest.json file from the browser
    // But for demonstration purposes, we'll just update metadata and handle manifest via server later
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      // For now, we'll just leave the default manifest.json
      // When you implement the backend API, uncomment this:
      // manifestLink.setAttribute("href", `/api/manifest/${projectId}?cred=${credentialToken}`);

      // Update metadata to reflect the default wedding couple (Sarah & Michael)
      document.title = "Sarah Johnson & Michael Smith | Wedding App";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          "Wedding app for Sarah Johnson & Michael Smith's special day"
        );
      }
    }
  }

  /**
   * Updates the application name in meta tags
   * @param appName The new application name
   */
  private updateAppName(appName: string): void {
    // Update meta tags
    const metaAppName = document.querySelector('meta[name="application-name"]');
    if (metaAppName) {
      metaAppName.setAttribute("content", appName);
    }

    const metaAppleName = document.querySelector(
      'meta[name="apple-mobile-web-app-title"]'
    );
    if (metaAppleName) {
      metaAppleName.setAttribute("content", appName);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", appName);
    }
  }

  /**
   * Updates the theme color in meta tags
   * @param color The new theme color
   */
  private updateThemeColor(color: string): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", color);
    }

    const metaMsTileColor = document.querySelector(
      'meta[name="msapplication-TileColor"]'
    );
    if (metaMsTileColor) {
      metaMsTileColor.setAttribute("content", color);
    }
  }
}

export default new ManifestService();

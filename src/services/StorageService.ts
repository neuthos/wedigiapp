// src/services/StorageService.ts

/**
 * Service to handle storage operations for user preferences
 */
class StorageService {
  private readonly ROLE_PREFIX = "wedding_role_";
  private readonly NOTIFICATION_PREFIX = "notification_allowed_";
  private readonly THEME_PREFIX = "user_theme_";
  private readonly LAST_VISIT_PREFIX = "last_visit_";

  /**
   * Save user role selection
   * @param projectId The wedding project ID
   * @param role The selected role (bride/groom)
   */
  saveUserRole(projectId: string, role: string): void {
    if (!projectId) return;
    localStorage.setItem(`${this.ROLE_PREFIX}${projectId}`, role);
  }

  /**
   * Get saved user role
   * @param projectId The wedding project ID
   * @returns The saved role or null if not found
   */
  getUserRole(projectId: string): string | null {
    if (!projectId) return null;
    return localStorage.getItem(`${this.ROLE_PREFIX}${projectId}`);
  }

  /**
   * Check if user has selected a role
   * @param projectId The wedding project ID
   * @returns True if the user has selected a role
   */
  hasSelectedRole(projectId: string): boolean {
    return Boolean(this.getUserRole(projectId));
  }

  /**
   * Clear user role selection
   * @param projectId The wedding project ID
   */
  clearUserRole(projectId: string): void {
    if (!projectId) return;
    localStorage.removeItem(`${this.ROLE_PREFIX}${projectId}`);
  }

  /**
   * Save notification permission status
   * @param projectId The wedding project ID
   * @param allowed Whether notifications are allowed
   */
  saveNotificationStatus(projectId: string, allowed: boolean): void {
    if (!projectId) return;
    localStorage.setItem(
      `${this.NOTIFICATION_PREFIX}${projectId}`,
      String(allowed)
    );
  }

  /**
   * Get notification permission status
   * @param projectId The wedding project ID
   * @returns True if notifications are allowed, false otherwise
   */
  getNotificationStatus(projectId: string): boolean {
    if (!projectId) return false;
    return (
      localStorage.getItem(`${this.NOTIFICATION_PREFIX}${projectId}`) === "true"
    );
  }

  /**
   * Save user's theme preference
   * @param projectId The wedding project ID
   * @param theme The theme name
   */
  saveThemePreference(projectId: string, theme: string): void {
    if (!projectId) return;
    localStorage.setItem(`${this.THEME_PREFIX}${projectId}`, theme);
  }

  /**
   * Get user's theme preference
   * @param projectId The wedding project ID
   * @returns The saved theme or null if not found
   */
  getThemePreference(projectId: string): string | null {
    if (!projectId) return null;
    return localStorage.getItem(`${this.THEME_PREFIX}${projectId}`);
  }

  /**
   * Record the current visit timestamp
   * @param projectId The wedding project ID
   */
  recordVisit(projectId: string): void {
    if (!projectId) return;
    localStorage.setItem(
      `${this.LAST_VISIT_PREFIX}${projectId}`,
      String(Date.now())
    );
  }

  /**
   * Get the timestamp of the last visit
   * @param projectId The wedding project ID
   * @returns Timestamp of the last visit or null if not found
   */
  getLastVisit(projectId: string): number | null {
    if (!projectId) return null;
    const timestamp = localStorage.getItem(
      `${this.LAST_VISIT_PREFIX}${projectId}`
    );
    return timestamp ? parseInt(timestamp, 10) : null;
  }

  /**
   * Clear all data for a specific project
   * @param projectId The wedding project ID
   */
  clearProjectData(projectId: string): void {
    if (!projectId) return;
    localStorage.removeItem(`${this.ROLE_PREFIX}${projectId}`);
    localStorage.removeItem(`${this.NOTIFICATION_PREFIX}${projectId}`);
    localStorage.removeItem(`${this.THEME_PREFIX}${projectId}`);
    localStorage.removeItem(`${this.LAST_VISIT_PREFIX}${projectId}`);
  }
}

export default new StorageService();

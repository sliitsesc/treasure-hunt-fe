import { API_URL } from "../constants";

/**
 * API client that handles authentication and making requests to the API
 */
class ApiClient {
  constructor() {
    this.baseUrl = API_URL;
  }

  /**
   * Get the current auth token from Clerk
   */
  async getAuthToken() {
    return window.Clerk?.session?.getToken();
  }

  /**
   * Make an authenticated request to the API
   */
  async request(endpoint, options = {}) {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseUrl}${endpoint}`;

    const token = await this.getAuthToken();

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async getDetails(userId) {
    if (!userId) {
      throw new Error("User ID is required to get details");
    }

    return this.request(`/users/${userId}/details`, {
      method: "GET",
    });
  }

  /**
   * Scan a QR code
   */
  async scanQRCode(scannedQRId, userId) {
    return this.request("/users/scan", {
      method: "POST",
      body: JSON.stringify({
        scannedQRId,
        id: userId, // Fallback ID if needed
      }),
    });
  }

  /**
   * Get leaderboard data
   */
  async getLeaderboard() {
    return this.request("/score", {
      method: "GET",
    });
  }
}

export default new ApiClient();

/**
 * Token Management Utilities
 * Handles storing, retrieving, and validating authentication tokens
 */

const TOKEN_KEY = 'access_token';

/**
 * Save authentication token to sessionStorage
 * @param token - JWT token string
 */
export const saveToken = (token: string): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get authentication token from sessionStorage
 * @returns Token string or null if not found
 */
export const getToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY);
};

/**
 * Remove authentication token from sessionStorage
 */
export const removeToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if user is authenticated (has valid token)
 * @returns boolean indicating if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  // Check if token is expired (basic check)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // If token has expiration time and it's expired
    if (payload.exp && payload.exp < currentTime) {
      removeToken(); // Clean up expired token
      return false;
    }
    
    return true;
  } catch (error) {
    // If token parsing fails, consider it invalid
    console.error('Invalid token format:', error);
    removeToken(); // Clean up invalid token
    return false;
  }
};

/**
 * Get authorization headers for API requests
 * @returns Headers object with Authorization bearer token
 */
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

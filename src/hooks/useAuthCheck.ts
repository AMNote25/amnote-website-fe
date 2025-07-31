import { useAuth } from "@/contexts/AuthContext";

/**
 * Hook for checking authentication status
 * Uses the AuthContext for consistent authentication state management
 * @deprecated Use useAuth hook directly instead
 */
export function useAuthCheck() {
  const { isLoggedIn, logout } = useAuth();

  return {
    isAuthenticated: isLoggedIn,
    logout
  };
}

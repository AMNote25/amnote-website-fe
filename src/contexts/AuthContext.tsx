/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { login as apiLogin, logout as apiLogout, LoginParams } from '@/api/services/service_Authentication';
import { saveToken, removeToken, isAuthenticated } from '@/utils/tokenUtils';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (credentials: LoginParams) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication Provider Component
 * Manages authentication state and provides auth methods to children
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Check authentication status on component mount and route changes
   */
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      setLoading(false);

      // Redirect logic based on authentication status and current route
      const isAuthRoute = pathname.startsWith('/auth');
      const isAdminRoute = pathname.startsWith('/admin');

      if (!authenticated && isAdminRoute) {
        // Not authenticated but trying to access admin routes
        router.replace('/auth/login');
      } else if (authenticated && isAuthRoute) {
        // Authenticated but on auth routes, redirect to admin
        router.replace('/admin');
      }
    };

    checkAuth();
  }, [router, pathname]);

  /**
   * Login function
   * @param credentials - User login credentials
   * @returns Promise with success status and optional error message
   */
  const login = async (credentials: LoginParams): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      const response = await apiLogin(credentials);

      if (response.ok && response.data?.access_token) {
        // Save token and update state
        saveToken(response.data.access_token);
        setIsLoggedIn(true);
        
        // Navigate to admin dashboard
        router.replace('/admin');
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.data?.message || 'Login failed. Please check your credentials.' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   * Calls API logout, clears token, and redirects to login
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Call API logout (optional, depends on your backend)
      await apiLogout();
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API fails
    } finally {
      // Clear token and update state regardless of API response
      removeToken();
      setIsLoggedIn(false);
      setLoading(false);
      
      // Navigate to login page
      router.replace('/auth/login');
    }
  };

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context
 * @returns Authentication context value
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

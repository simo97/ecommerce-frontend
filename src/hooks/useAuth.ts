import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { userAtom, authTokenAtom } from '../libs/atoms.js';
import { apiClient } from '../libs/api/client.js';
import type { User } from '../libs/interfaces/index.js';

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          // Parse user data from localStorage
          const userData: User = JSON.parse(storedUser);
          
          // Set auth token in API client
          apiClient.setAuthToken(storedToken);
          
          // Update atoms
          setUser(userData);
          setAuthToken(storedToken);
          setIsAuthenticated(true);
        } else {
          // No stored data, user not authenticated
          setIsAuthenticated(false);
          setUser(null);
          setAuthToken(null);
          
          // Get or create session token for anonymous users
          let sessionToken = localStorage.getItem('sessionToken');
          if (!sessionToken) {
            sessionToken = crypto.randomUUID();
            localStorage.setItem('sessionToken', sessionToken);
          }
          
          
          // Set session token in API client for anonymous operations
          apiClient.setSessionToken(sessionToken);
        }
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setAuthToken]);

  const clearAuth = () => {
    setUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    apiClient.removeAuthToken();
  };

  const logout = async () => {
    try {
      await apiClient.users.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      clearAuth();
    }
  };

  const isAdmin = user?.role === 'admin';
  const isCustomer = user?.role === 'customer';

  return {
    user,
    authToken,
    isAuthenticated,
    isLoading,
    isAdmin,
    isCustomer,
    logout,
    clearAuth,
  };
}
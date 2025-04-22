import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      // Skip auth check in development if needed
      if (process.env.NODE_ENV === 'development' && 
          process.env.REACT_APP_SKIP_AUTH_CHECK === 'true') {
        setLoading(false);
        return;
      }

      const storedUser = localStorage.getItem('eara_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse user data', error);
          clearAuth();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userWithTimestamp = {
          ...userData,
          loginTime: new Date().toISOString()
        };
        setUser(userWithTimestamp);
        setIsAuthenticated(true);
        localStorage.setItem('eara_user', JSON.stringify(userWithTimestamp));
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  // New function: completely clears authentication
  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('eara_user');
    if (process.env.NODE_ENV === 'development') {
      console.log('Authentication cleared');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        loading,
        login, 
        logout,
        clearAuth // Expose the clearAuth function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
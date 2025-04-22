import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Authorities from './pages/Authorities';
import SecretaryDashboard from './pages/SecretaryDashboard';
import CreatePositionAccount from './pages/CreatePositionAccount';
import Settings from './pages/Settings';
import AnimatedRoute from './components/AnimatedRoute';
import { Box, CssBaseline } from '@mui/material';
import AssignAccount from './pages/AssignAccount';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <AuthProvider>
      <ThemeProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <ProtectedRoute>
            <Sidebar 
              open={sidebarOpen} 
              setOpen={setSidebarOpen}
              showDevControls={process.env.NODE_ENV === 'development'}
            />
          </ProtectedRoute>
          <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8 }}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AnimatedRoute><Dashboard /></AnimatedRoute>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/authorities" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AnimatedRoute><Authorities /></AnimatedRoute>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/secretary" 
                  element={
                    <ProtectedRoute requiredRole="secretary">
                      <AnimatedRoute><SecretaryDashboard /></AnimatedRoute>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <AnimatedRoute><Settings /></AnimatedRoute>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </Box>
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
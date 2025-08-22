import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import FavoritesDashboard from './pages/FavoritesDashboard';
import RecentDashboard from './pages/RecentDashboard';
import CreateDashboard from './pages/CreateDashboard';
import Themes from './pages/Themes';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import HelpSupport from './pages/HelpSupport';
import SalesDashboard from './pages/SalesDashboard';
import FinanceDashboard from './pages/FinanceDashboard';
import MarketingDashboard from './pages/MarketingDashboard';
import OperationsDashboard from './pages/OperationsDashboard';
// import NotFound from './pages/NotFound';
import ChatbotPage from './pages/ChatbotPage';

// Components
import Chatbot from './components/Chatbot';

// Contexts
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatbotProvider } from './context/ChatbotContext';
import { DashboardProvider } from './context/DashboardContext';

function AppContent() {
  const { currentUser, loading } = useAuth();
  const [showChatbot, setShowChatbot] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    setIsAuthenticated(!!currentUser);
  }, [currentUser]);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <>
      <Routes>
        {/* Landing page route */}
        <Route path="/" element={<Landing />} />
        
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/favorites" element={<FavoritesDashboard />} />
          <Route path="/recent" element={<RecentDashboard />} />
          <Route path="/create" element={<CreateDashboard />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/sales" element={<SalesDashboard />} />
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/marketing" element={<MarketingDashboard />} />
          <Route path="/operations" element={<OperationsDashboard />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Route>

        {/* 404 route - temporarily redirect to Landing page since NotFound page is missing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Floating Chatbot */}
      {currentUser && (
        <Chatbot show={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DashboardProvider>
          <ChatbotProvider>
            <AppContent />
          </ChatbotProvider>
        </DashboardProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
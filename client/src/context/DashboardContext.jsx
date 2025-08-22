import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../utils/api';
import { useAuth } from './AuthContext';

const DashboardContext = createContext();

export function useDashboard() {
  return useContext(DashboardContext);
}

export function DashboardProvider({ children }) {
  const { currentUser } = useAuth();
  const [dashboards, setDashboards] = useState([]);
  const [currentDashboard, setCurrentDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user dashboards when user is logged in
  useEffect(() => {
    if (currentUser) {
      fetchDashboards();
    }
  }, [currentUser]);

  // Fetch all dashboards for the current user
  const fetchDashboards = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/dashboards');
      setDashboards(response.data.dashboards);
      
      // If no current dashboard is set, set the default one
      if (!currentDashboard) {
        fetchDefaultDashboard();
      }
    } catch (error) {
      console.error('Error fetching dashboards:', error);
      setError('Failed to load dashboards');
    } finally {
      setLoading(false);
    }
  };

  // Fetch the default dashboard
  const fetchDefaultDashboard = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/dashboards/default');
      setCurrentDashboard(response.data.dashboard);
    } catch (error) {
      console.error('Error fetching default dashboard:', error);
      setError('Failed to load default dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific dashboard by ID
  const fetchDashboard = async (dashboardId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/dashboards/${dashboardId}`);
      setCurrentDashboard(response.data.dashboard);
      return response.data.dashboard;
    } catch (error) {
      console.error(`Error fetching dashboard ${dashboardId}:`, error);
      setError('Failed to load dashboard');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create a new dashboard
  const createDashboard = async (dashboardData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/dashboards', dashboardData);
      setDashboards([...dashboards, response.data.dashboard]);
      return response.data.dashboard;
    } catch (error) {
      console.error('Error creating dashboard:', error);
      setError('Failed to create dashboard');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a dashboard
  const updateDashboard = async (dashboardId, dashboardData) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/dashboards/${dashboardId}`, dashboardData);
      
      // Update dashboards list
      setDashboards(dashboards.map(dashboard => 
        dashboard._id === dashboardId ? response.data.dashboard : dashboard
      ));
      
      // Update current dashboard if it's the one being edited
      if (currentDashboard && currentDashboard._id === dashboardId) {
        setCurrentDashboard(response.data.dashboard);
      }
      
      return response.data.dashboard;
    } catch (error) {
      console.error(`Error updating dashboard ${dashboardId}:`, error);
      setError('Failed to update dashboard');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a dashboard
  const deleteDashboard = async (dashboardId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/dashboards/${dashboardId}`);
      
      // Remove from dashboards list
      setDashboards(dashboards.filter(dashboard => dashboard._id !== dashboardId));
      
      // If current dashboard is deleted, fetch the new default
      if (currentDashboard && currentDashboard._id === dashboardId) {
        fetchDefaultDashboard();
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting dashboard ${dashboardId}:`, error);
      setError('Failed to delete dashboard');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add a widget to the current dashboard
  const addWidget = async (widgetData) => {
    if (!currentDashboard) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`/api/dashboards/${currentDashboard._id}/widgets`, widgetData);
      setCurrentDashboard(response.data.dashboard);
      return response.data.dashboard;
    } catch (error) {
      console.error('Error adding widget:', error);
      setError('Failed to add widget');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a widget in the current dashboard
  const updateWidget = async (widgetId, widgetData) => {
    if (!currentDashboard) return;
    
    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/dashboards/${currentDashboard._id}/widgets/${widgetId}`,
        widgetData
      );
      setCurrentDashboard(response.data.dashboard);
      return response.data.dashboard;
    } catch (error) {
      console.error(`Error updating widget ${widgetId}:`, error);
      setError('Failed to update widget');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove a widget from the current dashboard
  const removeWidget = async (widgetId) => {
    if (!currentDashboard) return;
    
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/dashboards/${currentDashboard._id}/widgets/${widgetId}`
      );
      setCurrentDashboard(response.data.dashboard);
      return response.data.dashboard;
    } catch (error) {
      console.error(`Error removing widget ${widgetId}:`, error);
      setError('Failed to remove widget');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    dashboards,
    currentDashboard,
    loading,
    error,
    fetchDashboards,
    fetchDashboard,
    fetchDefaultDashboard,
    createDashboard,
    updateDashboard,
    deleteDashboard,
    setCurrentDashboard,
    addWidget,
    updateWidget,
    removeWidget
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}
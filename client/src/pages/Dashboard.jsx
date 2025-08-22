import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import Widget from '../components/widgets/Widget';
import WidgetForm from '../components/widgets/WidgetForm';

const DashboardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const WidgetContainer = styled(Paper)(({ theme }) => ({
  height: '100%',
  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  border: theme.palette.mode === 'light' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px 0 rgba(0, 0, 0, 0.15)',
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  textAlign: 'center',
  height: '300px',
  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  border: theme.palette.mode === 'light' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
}));

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentDashboard, 
    fetchDashboard, 
    updateDashboard,
    deleteDashboard,
    addWidget,
    updateWidget,
    removeWidget,
    loading, 
    error 
  } = useDashboard();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [showWidgetForm, setShowWidgetForm] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);
  
  useEffect(() => {
    if (id) {
      fetchDashboard(id);
    }
  }, [id, fetchDashboard]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteDashboard = async () => {
    handleMenuClose();
    if (window.confirm('Are you sure you want to delete this dashboard?')) {
      await deleteDashboard(id);
      navigate('/dashboards');
    }
  };

  const handleEditDashboard = () => {
    handleMenuClose();
    navigate(`/dashboards/edit/${id}`);
  };

  const handleAddWidget = () => {
    setEditingWidget(null);
    setShowWidgetForm(true);
  };

  const handleEditWidget = (widget) => {
    setEditingWidget(widget);
    setShowWidgetForm(true);
  };

  const handleWidgetSubmit = async (widgetData) => {
    if (editingWidget) {
      await updateWidget(id, editingWidget._id, widgetData);
    } else {
      await addWidget(id, widgetData);
    }
    setShowWidgetForm(false);
    setEditingWidget(null);
  };

  const handleWidgetDelete = async (widgetId) => {
    if (window.confirm('Are you sure you want to delete this widget?')) {
      await removeWidget(id, widgetId);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!currentDashboard) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Dashboard not found. Please select a different dashboard.
      </Alert>
    );
  }

  return (
    <Box>
      <DashboardHeader>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            {currentDashboard.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {currentDashboard.type} Dashboard
          </Typography>
        </Box>
        
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddWidget}
            sx={{
              mr: 1,
              background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
              },
            }}
          >
            Add Widget
          </Button>
          
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditDashboard}>
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              Edit Dashboard
            </MenuItem>
            <MenuItem onClick={handleDeleteDashboard}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Delete Dashboard
            </MenuItem>
          </Menu>
        </Box>
      </DashboardHeader>

      {showWidgetForm && (
        <WidgetForm
          open={showWidgetForm}
          onClose={() => {
            setShowWidgetForm(false);
            setEditingWidget(null);
          }}
          onSubmit={handleWidgetSubmit}
          widget={editingWidget}
        />
      )}

      {currentDashboard.widgets && currentDashboard.widgets.length > 0 ? (
        <Grid container spacing={3}>
          {currentDashboard.widgets.map((widget) => (
            <Grid item xs={12} md={widget.settings?.size === 'large' ? 12 : 6} lg={widget.settings?.size === 'large' ? 8 : 4} key={widget._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <WidgetContainer>
                  <Widget
                    widget={widget}
                    onEdit={() => handleEditWidget(widget)}
                    onDelete={() => handleWidgetDelete(widget._id)}
                  />
                </WidgetContainer>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <Typography variant="h6" gutterBottom>
            No widgets found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Add widgets to your dashboard to start visualizing your data
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddWidget}
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
              },
            }}
          >
            Add Your First Widget
          </Button>
        </EmptyState>
      )}
    </Box>
  );
};

export default Dashboard;
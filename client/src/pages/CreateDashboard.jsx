import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Slider,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Checkbox,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Business as BusinessIcon,
  AccountBalance as AccountBalanceIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Campaign as CampaignIcon,
  Support as SupportIcon,
  Inventory as InventoryIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Preview as PreviewIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Palette as PaletteIcon,
  ViewModule as ViewModuleIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';

const DashboardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: theme.spacing(2),
  color: 'white',
}));

const TemplateCard = styled(Card)(({ theme, selected }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.9)' 
    : 'rgba(30, 41, 59, 0.9)',
  backdropFilter: 'blur(10px)',
  border: selected 
    ? `2px solid ${theme.palette.primary.main}` 
    : `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const WidgetCard = styled(Card)(({ theme, selected }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(30, 41, 59, 0.95)',
  border: selected 
    ? `2px solid ${theme.palette.primary.main}` 
    : `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const CreateDashboard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    name: '',
    description: '',
    category: '',
    template: null,
    widgets: [],
    layout: 'grid',
    theme: 'default',
    isPublic: false,
    refreshInterval: 30,
  });
  const [previewOpen, setPreviewOpen] = useState(false);

  const steps = [
    'Basic Information',
    'Choose Template',
    'Select Widgets',
    'Customize Layout',
    'Review & Create'
  ];

  const dashboardTemplates = [
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      description: 'Track website analytics, user behavior, and performance metrics',
      category: 'Analytics',
      icon: <AnalyticsIcon />,
      color: '#4caf50',
      widgets: ['line-chart', 'pie-chart', 'metric-card', 'table'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'sales',
      name: 'Sales Dashboard',
      description: 'Monitor sales performance, revenue trends, and targets',
      category: 'Business',
      icon: <TrendingUpIcon />,
      color: '#2196f3',
      widgets: ['bar-chart', 'metric-card', 'progress-bar', 'leaderboard'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'financial',
      name: 'Financial Dashboard',
      description: 'Comprehensive financial overview and budget tracking',
      category: 'Finance',
      icon: <AccountBalanceIcon />,
      color: '#ff9800',
      widgets: ['area-chart', 'donut-chart', 'metric-card', 'budget-tracker'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'marketing',
      name: 'Marketing Dashboard',
      description: 'Campaign performance, lead generation, and ROI tracking',
      category: 'Marketing',
      icon: <CampaignIcon />,
      color: '#9c27b0',
      widgets: ['funnel-chart', 'heatmap', 'metric-card', 'campaign-tracker'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'operations',
      name: 'Operations Dashboard',
      description: 'Operational efficiency, resource utilization, and KPIs',
      category: 'Operations',
      icon: <BusinessIcon />,
      color: '#f44336',
      widgets: ['gauge-chart', 'timeline', 'metric-card', 'status-board'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'hr',
      name: 'HR Dashboard',
      description: 'Employee metrics, recruitment, and performance tracking',
      category: 'Human Resources',
      icon: <PeopleIcon />,
      color: '#795548',
      widgets: ['org-chart', 'metric-card', 'calendar', 'employee-list'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Dashboard',
      description: 'Online store performance, inventory, and customer insights',
      category: 'E-commerce',
      icon: <ShoppingCartIcon />,
      color: '#607d8b',
      widgets: ['product-grid', 'sales-chart', 'inventory-tracker', 'customer-map'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'support',
      name: 'Support Dashboard',
      description: 'Customer support metrics, ticket tracking, and satisfaction',
      category: 'Support',
      icon: <SupportIcon />,
      color: '#3f51b5',
      widgets: ['ticket-queue', 'satisfaction-meter', 'response-time', 'agent-performance'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'blank',
      name: 'Blank Dashboard',
      description: 'Start from scratch with a completely customizable dashboard',
      category: 'Custom',
      icon: <DashboardIcon />,
      color: '#666666',
      widgets: [],
      preview: '/api/placeholder/300/200'
    }
  ];

  const availableWidgets = [
    { id: 'line-chart', name: 'Line Chart', icon: <TimelineIcon />, category: 'Charts' },
    { id: 'bar-chart', name: 'Bar Chart', icon: <BarChartIcon />, category: 'Charts' },
    { id: 'pie-chart', name: 'Pie Chart', icon: <PieChartIcon />, category: 'Charts' },
    { id: 'area-chart', name: 'Area Chart', icon: <AssessmentIcon />, category: 'Charts' },
    { id: 'metric-card', name: 'Metric Card', icon: <ViewModuleIcon />, category: 'Metrics' },
    { id: 'progress-bar', name: 'Progress Bar', icon: <TimelineIcon />, category: 'Metrics' },
    { id: 'gauge-chart', name: 'Gauge Chart', icon: <PieChartIcon />, category: 'Charts' },
    { id: 'table', name: 'Data Table', icon: <ViewModuleIcon />, category: 'Data' },
    { id: 'calendar', name: 'Calendar', icon: <SettingsIcon />, category: 'Utilities' },
    { id: 'map', name: 'Map Widget', icon: <ViewModuleIcon />, category: 'Visualization' },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleTemplateSelect = (template) => {
    setDashboardData({
      ...dashboardData,
      template: template,
      category: template.category,
      widgets: template.widgets
    });
  };

  const handleWidgetToggle = (widgetId) => {
    const currentWidgets = dashboardData.widgets || [];
    const isSelected = currentWidgets.includes(widgetId);
    
    setDashboardData({
      ...dashboardData,
      widgets: isSelected 
        ? currentWidgets.filter(id => id !== widgetId)
        : [...currentWidgets, widgetId]
    });
  };

  const handleCreateDashboard = () => {
    console.log('Creating dashboard:', dashboardData);
    // Here you would typically send the data to your backend
    alert('Dashboard created successfully!');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Dashboard Name"
              value={dashboardData.name}
              onChange={(e) => setDashboardData({ ...dashboardData, name: e.target.value })}
              sx={{ mb: 3 }}
              required
            />
            
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={dashboardData.description}
              onChange={(e) => setDashboardData({ ...dashboardData, description: e.target.value })}
              sx={{ mb: 3 }}
            />
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={dashboardData.category}
                onChange={(e) => setDashboardData({ ...dashboardData, category: e.target.value })}
              >
                <MenuItem value="Analytics">Analytics</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
                <MenuItem value="Human Resources">Human Resources</MenuItem>
                <MenuItem value="E-commerce">E-commerce</MenuItem>
                <MenuItem value="Support">Support</MenuItem>
                <MenuItem value="Custom">Custom</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Choose a template to get started quickly
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {dashboardTemplates.map((template) => (
                <Grid item xs={12} sm={6} md={4} key={template.id}>
                  <TemplateCard 
                    selected={dashboardData.template?.id === template.id}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: template.color, mr: 2 }}>
                          {template.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {template.name}
                          </Typography>
                          <Chip label={template.category} size="small" />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {template.description}
                      </Typography>
                    </CardContent>
                  </TemplateCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Select widgets for your dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {dashboardData.template ? 
                `Based on your ${dashboardData.template.name} template, we've pre-selected some widgets. You can add or remove widgets as needed.` :
                'Choose from our collection of widgets to build your custom dashboard.'
              }
            </Typography>
            
            <Grid container spacing={2}>
              {availableWidgets.map((widget) => {
                const isSelected = dashboardData.widgets?.includes(widget.id);
                return (
                  <Grid item xs={12} sm={6} md={4} key={widget.id}>
                    <WidgetCard 
                      selected={isSelected}
                      onClick={() => handleWidgetToggle(widget.id)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {widget.icon}
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {widget.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {widget.category}
                              </Typography>
                            </Box>
                          </Box>
                          <Checkbox checked={isSelected} />
                        </Box>
                      </CardContent>
                    </WidgetCard>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Customize your dashboard layout and settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Layout Options
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Layout Type</InputLabel>
                    <Select
                      value={dashboardData.layout}
                      onChange={(e) => setDashboardData({ ...dashboardData, layout: e.target.value })}
                    >
                      <MenuItem value="grid">Grid Layout</MenuItem>
                      <MenuItem value="masonry">Masonry Layout</MenuItem>
                      <MenuItem value="flex">Flexible Layout</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Theme</InputLabel>
                    <Select
                      value={dashboardData.theme}
                      onChange={(e) => setDashboardData({ ...dashboardData, theme: e.target.value })}
                    >
                      <MenuItem value="default">Default</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="colorful">Colorful</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Dashboard Settings
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={dashboardData.isPublic}
                        onChange={(e) => setDashboardData({ ...dashboardData, isPublic: e.target.checked })}
                      />
                    }
                    label="Make dashboard public"
                    sx={{ mb: 3, display: 'block' }}
                  />
                  
                  <Typography gutterBottom>
                    Auto-refresh interval (seconds)
                  </Typography>
                  <Slider
                    value={dashboardData.refreshInterval}
                    onChange={(e, value) => setDashboardData({ ...dashboardData, refreshInterval: value })}
                    min={10}
                    max={300}
                    step={10}
                    marks={[
                      { value: 10, label: '10s' },
                      { value: 60, label: '1m' },
                      { value: 300, label: '5m' }
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Review your dashboard configuration
            </Typography>
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Dashboard Details
              </Typography>
              <Typography><strong>Name:</strong> {dashboardData.name}</Typography>
              <Typography><strong>Description:</strong> {dashboardData.description}</Typography>
              <Typography><strong>Category:</strong> {dashboardData.category}</Typography>
              <Typography><strong>Template:</strong> {dashboardData.template?.name || 'Custom'}</Typography>
              <Typography><strong>Layout:</strong> {dashboardData.layout}</Typography>
              <Typography><strong>Theme:</strong> {dashboardData.theme}</Typography>
              <Typography><strong>Public:</strong> {dashboardData.isPublic ? 'Yes' : 'No'}</Typography>
              <Typography><strong>Refresh Interval:</strong> {dashboardData.refreshInterval}s</Typography>
            </Paper>
            
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Selected Widgets ({dashboardData.widgets?.length || 0})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {dashboardData.widgets?.map((widgetId) => {
                  const widget = availableWidgets.find(w => w.id === widgetId);
                  return widget ? (
                    <Chip 
                      key={widgetId} 
                      label={widget.name} 
                      icon={widget.icon}
                      variant="outlined"
                    />
                  ) : null;
                })}
              </Box>
            </Paper>
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardHeader>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
              Create New Dashboard
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Build a custom dashboard tailored to your needs
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddIcon sx={{ fontSize: 32 }} />
          </Box>
        </DashboardHeader>
      </motion.div>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent(activeStep)}
          </motion.div>
        </AnimatePresence>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<PreviewIcon />}
              onClick={() => setPreviewOpen(true)}
            >
              Preview
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleCreateDashboard}
                startIcon={<SaveIcon />}
                disabled={!dashboardData.name}
              >
                Create Dashboard
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
                disabled={activeStep === 0 && !dashboardData.name}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Dashboard Preview</Typography>
            <IconButton onClick={() => setPreviewOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
            <Typography variant="h5" gutterBottom>
              {dashboardData.name || 'Untitled Dashboard'}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {dashboardData.description}
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {dashboardData.widgets?.map((widgetId, index) => {
                const widget = availableWidgets.find(w => w.id === widgetId);
                return widget ? (
                  <Grid item xs={12} sm={6} md={4} key={widgetId}>
                    <Paper sx={{ p: 2, textAlign: 'center', minHeight: 120 }}>
                      {widget.icon}
                      <Typography variant="subtitle2" sx={{ mt: 1 }}>
                        {widget.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ) : null;
              })}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateDashboard;
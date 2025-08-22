import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as MoneyIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
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

const StatsCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.9)' 
    : 'rgba(30, 41, 59, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const ChartCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(30, 41, 59, 0.95)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  height: '100%',
}));

const AnalyticsDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [isEditMode, setIsEditMode] = useState(false);
  const [widgets, setWidgets] = useState([]);

  // Sample analytics data
  const statsData = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      trend: 'up',
      icon: <MoneyIcon />,
      color: '#4caf50',
    },
    {
      title: 'Active Users',
      value: '8,549',
      change: '+8.2%',
      trend: 'up',
      icon: <PeopleIcon />,
      color: '#2196f3',
    },
    {
      title: 'Total Orders',
      value: '1,423',
      change: '-2.1%',
      trend: 'down',
      icon: <ShoppingCartIcon />,
      color: '#ff9800',
    },
    {
      title: 'Page Views',
      value: '45,678',
      change: '+15.3%',
      trend: 'up',
      icon: <VisibilityIcon />,
      color: '#9c27b0',
    },
  ];

  const topProducts = [
    { name: 'Premium Dashboard Pro', sales: 1234, revenue: '$45,678', growth: '+23%' },
    { name: 'Analytics Suite', sales: 987, revenue: '$32,145', growth: '+18%' },
    { name: 'Data Visualization Kit', sales: 756, revenue: '$28,934', growth: '+12%' },
    { name: 'Business Intelligence', sales: 543, revenue: '$19,876', growth: '+8%' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Created new dashboard', time: '2 minutes ago', avatar: 'JD' },
    { user: 'Sarah Smith', action: 'Updated analytics widget', time: '5 minutes ago', avatar: 'SS' },
    { user: 'Mike Johnson', action: 'Shared report with team', time: '10 minutes ago', avatar: 'MJ' },
    { user: 'Emily Brown', action: 'Exported data visualization', time: '15 minutes ago', avatar: 'EB' },
  ];

  // Initialize widgets on component mount
  useEffect(() => {
    const initialWidgets = [
      { id: 'stats', type: 'stats', title: 'Statistics', order: 0 },
      { id: 'revenue-chart', type: 'chart', title: 'Revenue Trends', order: 1 },
      { id: 'top-products', type: 'list', title: 'Top Products', order: 2 },
      { id: 'recent-activity', type: 'activity', title: 'Recent Activity', order: 3 },
    ];
    setWidgets(initialWidgets);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    handleMenuClose();
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveLayout = () => {
    // Save widget layout to localStorage or backend
    localStorage.setItem('dashboardLayout', JSON.stringify(widgets));
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    // Reset to saved layout
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
      setWidgets(JSON.parse(savedLayout));
    }
    setIsEditMode(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setWidgets(updatedItems);
  };

  const handleDeleteWidget = (widgetId) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
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
              Analytics Dashboard
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Comprehensive insights into your business performance
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isEditMode ? (
              <>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveLayout}
                  sx={{
                    background: 'rgba(76, 175, 80, 0.8)',
                    '&:hover': {
                      background: 'rgba(76, 175, 80, 0.9)',
                    },
                  }}
                >
                  Save Layout
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelEdit}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditToggle}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  Edit Dashboard
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  Add Widget
                </Button>
              </>
            )}
            
            <IconButton 
              onClick={handleMenuOpen}
              sx={{ color: 'white' }}
            >
              <MoreVertIcon />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleTimeRangeChange('24h')}>Last 24 Hours</MenuItem>
              <MenuItem onClick={() => handleTimeRangeChange('7d')}>Last 7 Days</MenuItem>
              <MenuItem onClick={() => handleTimeRangeChange('30d')}>Last 30 Days</MenuItem>
              <MenuItem onClick={() => handleTimeRangeChange('90d')}>Last 90 Days</MenuItem>
            </Menu>
          </Box>
        </DashboardHeader>
      </motion.div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {widgets.sort((a, b) => a.order - b.order).map((widget, index) => (
                <Draggable 
                  key={widget.id} 
                  draggableId={widget.id} 
                  index={index}
                  isDragDisabled={!isEditMode}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: '24px',
                      }}
                    >
                      {widget.type === 'stats' && (
                        <Box sx={{ position: 'relative' }}>
                          {isEditMode && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: -10,
                                right: -10,
                                zIndex: 10,
                                display: 'flex',
                                gap: 1,
                              }}
                            >
                              <IconButton
                                {...provided.dragHandleProps}
                                sx={{
                                  background: 'rgba(0, 0, 0, 0.7)',
                                  color: 'white',
                                  '&:hover': { background: 'rgba(0, 0, 0, 0.8)' },
                                }}
                              >
                                <DragIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteWidget(widget.id)}
                                sx={{
                                  background: 'rgba(244, 67, 54, 0.8)',
                                  color: 'white',
                                  '&:hover': { background: 'rgba(244, 67, 54, 0.9)' },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          )}
                          <Grid container spacing={3} sx={{ mb: 3 }}>
                            {statsData.map((stat, statIndex) => (
                              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: statIndex * 0.1 }}
                                >
                                  <StatsCard sx={{
                                    border: isEditMode ? '2px dashed rgba(25, 118, 210, 0.5)' : 'none',
                                    opacity: snapshot.isDragging ? 0.8 : 1,
                                  }}>
                                    <CardContent>
                                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
                                          {stat.icon}
                                        </Avatar>
                                        <Box>
                                          <Typography variant="h4" fontWeight={600}>
                                            {stat.value}
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                            {stat.title}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {stat.trend === 'up' ? (
                                          <TrendingUpIcon sx={{ color: '#4caf50', mr: 1 }} />
                                        ) : (
                                          <TrendingDownIcon sx={{ color: '#f44336', mr: 1 }} />
                                        )}
                                        <Typography 
                                          variant="body2" 
                                          sx={{ 
                                            color: stat.trend === 'up' ? '#4caf50' : '#f44336',
                                            fontWeight: 600 
                                          }}
                                        >
                                          {stat.change}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                          vs last period
                                        </Typography>
                                      </Box>
                                    </CardContent>
                                  </StatsCard>
                                </motion.div>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      )}

                      {widget.type === 'chart' && (
                        <Box sx={{ position: 'relative' }}>
                          {isEditMode && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: -10,
                                right: -10,
                                zIndex: 10,
                                display: 'flex',
                                gap: 1,
                              }}
                            >
                              <IconButton
                                {...provided.dragHandleProps}
                                sx={{
                                  background: 'rgba(0, 0, 0, 0.7)',
                                  color: 'white',
                                  '&:hover': { background: 'rgba(0, 0, 0, 0.8)' },
                                }}
                              >
                                <DragIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteWidget(widget.id)}
                                sx={{
                                  background: 'rgba(244, 67, 54, 0.8)',
                                  color: 'white',
                                  '&:hover': { background: 'rgba(244, 67, 54, 0.9)' },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          )}
                          {/* Charts and Analytics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ChartCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <TimelineIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight={600}>
                    Revenue Trends
                  </Typography>
                  <Chip 
                    label={timeRange} 
                    size="small" 
                    sx={{ ml: 'auto' }}
                  />
                </Box>
                
                {/* Simulated Chart Area */}
                <Box 
                  sx={{ 
                    height: 300, 
                    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Typography variant="h6">
                    📈 Interactive Revenue Chart
                  </Typography>
                  <Box 
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '30%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '0 0 8px 8px'
                    }}
                  />
                </Box>
              </CardContent>
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ChartCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AssessmentIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight={600}>
                    Top Products
                  </Typography>
                </Box>
                
                <List>
                  {topProducts.map((product, index) => (
                    <Box key={product.name}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.name}
                          secondary={`${product.sales} sales • ${product.revenue}`}
                        />
                        <Chip 
                          label={product.growth} 
                          size="small" 
                          color="success"
                          variant="outlined"
                        />
                      </ListItem>
                      {index < topProducts.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </ChartCard>
          </motion.div>
        </Grid>
      </Grid>

      {/* Performance Metrics and Recent Activity */}
      <Grid container spacing={3}>
        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ChartCard>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Performance Metrics
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  {[
                    { label: 'Conversion Rate', value: 3.2, max: 5, color: '#4caf50' },
                    { label: 'Bounce Rate', value: 2.1, max: 5, color: '#ff9800' },
                    { label: 'Page Load Speed', value: 4.5, max: 5, color: '#2196f3' },
                    { label: 'User Satisfaction', value: 4.8, max: 5, color: '#9c27b0' },
                  ].map((metric) => (
                    <Box key={metric.label} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{metric.label}</Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {metric.value}/{metric.max}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(metric.value / metric.max) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: metric.color,
                            borderRadius: 4,
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </ChartCard>
          </motion.div>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <ChartCard>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Recent Activity
                </Typography>
                
                <List>
                  {recentActivity.map((activity, index) => (
                    <Box key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {activity.avatar}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={activity.user}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.primary">
                                {activity.action}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {activity.time}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < recentActivity.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </ChartCard>
          </motion.div>
        </Grid>
      </Grid>
                        </Box>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default AnalyticsDashboard;
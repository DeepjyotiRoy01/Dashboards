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
  Assessment as AssessmentIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Timeline as TimelineIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  GpsFixed as TargetIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const DashboardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
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

const SalesDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [isEditMode, setIsEditMode] = useState(false);
  const [widgets, setWidgets] = useState([]);

  // Sample sales data
  const statsData = [
    {
      title: 'Total Revenue',
      value: '$245,890',
      change: '+18.2%',
      trend: 'up',
      icon: <MoneyIcon />,
      color: '#4caf50',
    },
    {
      title: 'Sales Target',
      value: '87%',
      change: '+5.3%',
      trend: 'up',
      icon: <TargetIcon />,
      color: '#2196f3',
    },
    {
      title: 'Total Deals',
      value: '342',
      change: '+12.8%',
      trend: 'up',
      icon: <ShoppingCartIcon />,
      color: '#ff9800',
    },
    {
      title: 'Conversion Rate',
      value: '24.5%',
      change: '+3.1%',
      trend: 'up',
      icon: <TrendingUpIcon />,
      color: '#9c27b0',
    },
  ];

  const topSalesReps = [
    { name: 'Sarah Johnson', deals: 45, revenue: '$125,430', target: '112%' },
    { name: 'Mike Chen', deals: 38, revenue: '$98,750', target: '105%' },
    { name: 'Emily Davis', deals: 32, revenue: '$87,650', target: '98%' },
    { name: 'David Wilson', deals: 28, revenue: '$76,890', target: '92%' },
  ];

  const recentDeals = [
    { client: 'TechCorp Inc.', amount: '$45,000', status: 'Closed Won', rep: 'Sarah J.', avatar: 'SJ' },
    { client: 'Global Solutions', amount: '$32,500', status: 'Negotiation', rep: 'Mike C.', avatar: 'MC' },
    { client: 'StartupXYZ', amount: '$18,750', status: 'Proposal', rep: 'Emily D.', avatar: 'ED' },
    { client: 'Enterprise Ltd.', amount: '$67,200', status: 'Closed Won', rep: 'David W.', avatar: 'DW' },
  ];

  // Initialize widgets on component mount
  useEffect(() => {
    const initialWidgets = [
      { id: 'stats', type: 'stats', title: 'Sales Statistics', order: 0 },
      { id: 'revenue-chart', type: 'chart', title: 'Revenue Trends', order: 1 },
      { id: 'top-reps', type: 'list', title: 'Top Sales Reps', order: 2 },
      { id: 'recent-deals', type: 'deals', title: 'Recent Deals', order: 3 },
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
    localStorage.setItem('salesDashboardLayout', JSON.stringify(widgets));
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    const savedLayout = localStorage.getItem('salesDashboardLayout');
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

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setWidgets(updatedItems);
  };

  const handleDeleteWidget = (widgetId) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
  };

  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'stats':
        return (
          <Grid container spacing={3}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StatsCard>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: stat.color,
                            color: 'white',
                            mr: 2,
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Typography variant="h6" component="div" fontWeight={600}>
                          {stat.title}
                        </Typography>
                      </Box>
                      <Typography variant="h4" component="div" fontWeight={700} gutterBottom>
                        {stat.value}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {stat.trend === 'up' ? (
                          <TrendingUpIcon sx={{ color: '#4caf50', mr: 0.5 }} />
                        ) : (
                          <TrendingDownIcon sx={{ color: '#f44336', mr: 0.5 }} />
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            color: stat.trend === 'up' ? '#4caf50' : '#f44336',
                            fontWeight: 600,
                          }}
                        >
                          {stat.change}
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 1, opacity: 0.7 }}>
                          vs last period
                        </Typography>
                      </Box>
                    </CardContent>
                  </StatsCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        );

      case 'chart':
        return (
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Trends
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Revenue chart visualization would go here
                </Typography>
              </Box>
            </CardContent>
          </ChartCard>
        );

      case 'list':
        return (
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Sales Representatives
              </Typography>
              <List>
                {topSalesReps.map((rep, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#2196f3' }}>
                        {rep.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={rep.name}
                      secondary={`${rep.deals} deals • ${rep.revenue}`}
                    />
                    <Chip
                      label={rep.target}
                      color={parseInt(rep.target) >= 100 ? 'success' : 'warning'}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </ChartCard>
        );

      case 'deals':
        return (
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Deals
              </Typography>
              <List>
                {recentDeals.map((deal, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#ff9800' }}>
                          {deal.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={deal.client}
                        secondary={`${deal.amount} • ${deal.rep}`}
                      />
                      <Chip
                        label={deal.status}
                        color={
                          deal.status === 'Closed Won' ? 'success' :
                          deal.status === 'Negotiation' ? 'warning' : 'info'
                        }
                        size="small"
                      />
                    </ListItem>
                    {index < recentDeals.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </CardContent>
          </ChartCard>
        );

      default:
        return null;
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
              Sales Dashboard
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Track sales performance, revenue trends, and team achievements
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
                  Edit Layout
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MoreVertIcon />}
                  onClick={handleMenuOpen}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {timeRange === '7d' ? 'Last 7 Days' :
                   timeRange === '30d' ? 'Last 30 Days' :
                   timeRange === '90d' ? 'Last 90 Days' : 'This Year'}
                </Button>
              </>
            )}
          </Box>
        </DashboardHeader>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleTimeRangeChange('7d')}>Last 7 Days</MenuItem>
          <MenuItem onClick={() => handleTimeRangeChange('30d')}>Last 30 Days</MenuItem>
          <MenuItem onClick={() => handleTimeRangeChange('90d')}>Last 90 Days</MenuItem>
          <MenuItem onClick={() => handleTimeRangeChange('1y')}>This Year</MenuItem>
        </Menu>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="dashboard">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {widgets
                  .sort((a, b) => a.order - b.order)
                  .map((widget, index) => (
                    <Draggable
                      key={widget.id}
                      draggableId={widget.id}
                      index={index}
                      isDragDisabled={!isEditMode}
                    >
                      {(provided, snapshot) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          style={{
                            marginBottom: 24,
                            ...provided.draggableProps.style,
                          }}
                        >
                          <Box
                            sx={{
                              position: 'relative',
                              '&:hover .widget-controls': {
                                opacity: isEditMode ? 1 : 0,
                              },
                            }}
                          >
                            {isEditMode && (
                              <Box
                                className="widget-controls"
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  zIndex: 1,
                                  opacity: 0,
                                  transition: 'opacity 0.2s',
                                  display: 'flex',
                                  gap: 1,
                                }}
                              >
                                <IconButton
                                  {...provided.dragHandleProps}
                                  size="small"
                                  sx={{
                                    background: 'rgba(0, 0, 0, 0.1)',
                                    '&:hover': { background: 'rgba(0, 0, 0, 0.2)' },
                                  }}
                                >
                                  <DragIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteWidget(widget.id)}
                                  sx={{
                                    background: 'rgba(244, 67, 54, 0.1)',
                                    color: '#f44336',
                                    '&:hover': { background: 'rgba(244, 67, 54, 0.2)' },
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            )}
                            {renderWidget(widget)}
                          </Box>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </motion.div>
    </Box>
  );
};

export default SalesDashboard;
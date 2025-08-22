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
  Visibility as VisibilityIcon,
  Campaign as CampaignIcon,
  Email as EmailIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Timeline as TimelineIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  ThumbUp as ThumbUpIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const DashboardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
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

const MarketingDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [isEditMode, setIsEditMode] = useState(false);
  const [widgets, setWidgets] = useState([]);

  // Sample marketing data
  const statsData = [
    {
      title: 'Website Traffic',
      value: '125,430',
      change: '+22.5%',
      trend: 'up',
      icon: <VisibilityIcon />,
      color: '#4caf50',
    },
    {
      title: 'Campaign ROI',
      value: '340%',
      change: '+15.8%',
      trend: 'up',
      icon: <CampaignIcon />,
      color: '#2196f3',
    },
    {
      title: 'Email Open Rate',
      value: '28.7%',
      change: '+4.2%',
      trend: 'up',
      icon: <EmailIcon />,
      color: '#ff9800',
    },
    {
      title: 'Social Engagement',
      value: '15.2K',
      change: '+18.9%',
      trend: 'up',
      icon: <ThumbUpIcon />,
      color: '#9c27b0',
    },
  ];

  const topCampaigns = [
    { name: 'Summer Sale 2024', impressions: '2.5M', clicks: '125K', ctr: '5.2%', status: 'Active' },
    { name: 'Product Launch', impressions: '1.8M', clicks: '98K', ctr: '5.4%', status: 'Active' },
    { name: 'Brand Awareness', impressions: '3.2M', clicks: '145K', ctr: '4.5%', status: 'Paused' },
    { name: 'Retargeting Campaign', impressions: '950K', clicks: '67K', ctr: '7.1%', status: 'Active' },
  ];

  const recentActivities = [
    { action: 'Campaign "Summer Sale" launched', time: '2 hours ago', type: 'campaign', avatar: 'CS' },
    { action: 'Email newsletter sent to 15K subscribers', time: '4 hours ago', type: 'email', avatar: 'EN' },
    { action: 'Social media post published', time: '6 hours ago', type: 'social', avatar: 'SM' },
    { action: 'Blog article "Marketing Trends" published', time: '1 day ago', type: 'content', avatar: 'BL' },
  ];

  // Initialize widgets on component mount
  useEffect(() => {
    const initialWidgets = [
      { id: 'stats', type: 'stats', title: 'Marketing Statistics', order: 0 },
      { id: 'traffic-chart', type: 'chart', title: 'Traffic Analytics', order: 1 },
      { id: 'top-campaigns', type: 'campaigns', title: 'Top Campaigns', order: 2 },
      { id: 'recent-activities', type: 'activities', title: 'Recent Activities', order: 3 },
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
    localStorage.setItem('marketingDashboardLayout', JSON.stringify(widgets));
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    const savedLayout = localStorage.getItem('marketingDashboardLayout');
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
                Traffic Analytics
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Traffic analytics chart visualization would go here
                </Typography>
              </Box>
            </CardContent>
          </ChartCard>
        );

      case 'campaigns':
        return (
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Performing Campaigns
              </Typography>
              <List>
                {topCampaigns.map((campaign, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#e91e63' }}>
                          <CampaignIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={campaign.name}
                        secondary={`${campaign.impressions} impressions • ${campaign.clicks} clicks • CTR: ${campaign.ctr}`}
                      />
                      <Chip
                        label={campaign.status}
                        color={campaign.status === 'Active' ? 'success' : 'warning'}
                        size="small"
                      />
                    </ListItem>
                    {index < topCampaigns.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </CardContent>
          </ChartCard>
        );

      case 'activities':
        return (
          <ChartCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Marketing Activities
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: activity.type === 'campaign' ? '#2196f3' :
                                   activity.type === 'email' ? '#ff9800' :
                                   activity.type === 'social' ? '#9c27b0' : '#4caf50'
                        }}>
                          {activity.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.action}
                        secondary={activity.time}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
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
              Marketing Dashboard
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Monitor campaigns, track engagement, and analyze marketing performance
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

export default MarketingDashboard;
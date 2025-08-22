import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  History as HistoryIcon,
  Dashboard as DashboardIcon,
  Widgets as WidgetsIcon,
  AccessTime as AccessTimeIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const DashboardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
  borderRadius: theme.spacing(2),
  color: 'white',
}));

const RecentCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.9)' 
    : 'rgba(30, 41, 59, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const TimelineCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(30, 41, 59, 0.95)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
}));

const RecentDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  // Sample recent dashboard data
  const recentDashboards = [
    {
      id: 1,
      name: 'Sales Performance',
      type: 'Analytics',
      description: 'Track sales metrics and performance indicators',
      lastAccessed: '2 minutes ago',
      accessTime: '2024-01-15T14:30:00',
      widgets: 8,
      views: 1234,
      color: '#4caf50',
      activity: 'Viewed dashboard',
    },
    {
      id: 2,
      name: 'Marketing Campaign',
      type: 'Marketing',
      description: 'Monitor campaign effectiveness and ROI',
      lastAccessed: '1 hour ago',
      accessTime: '2024-01-15T13:15:00',
      widgets: 6,
      views: 987,
      color: '#2196f3',
      activity: 'Added new widget',
    },
    {
      id: 3,
      name: 'Financial Overview',
      type: 'Finance',
      description: 'Comprehensive financial metrics and trends',
      lastAccessed: '3 hours ago',
      accessTime: '2024-01-15T11:45:00',
      widgets: 12,
      views: 2156,
      color: '#ff9800',
      activity: 'Updated dashboard settings',
    },
    {
      id: 4,
      name: 'User Analytics',
      type: 'Analytics',
      description: 'User behavior and engagement insights',
      lastAccessed: '1 day ago',
      accessTime: '2024-01-14T16:20:00',
      widgets: 10,
      views: 1567,
      color: '#9c27b0',
      activity: 'Shared with team',
    },
    {
      id: 5,
      name: 'Project Management',
      type: 'Operations',
      description: 'Track project progress and team performance',
      lastAccessed: '2 days ago',
      accessTime: '2024-01-13T10:30:00',
      widgets: 7,
      views: 892,
      color: '#f44336',
      activity: 'Exported data',
    },
    {
      id: 6,
      name: 'Customer Support',
      type: 'Support',
      description: 'Monitor support tickets and response times',
      lastAccessed: '3 days ago',
      accessTime: '2024-01-12T14:15:00',
      widgets: 5,
      views: 654,
      color: '#795548',
      activity: 'Created new report',
    },
  ];

  // Sample activity timeline
  const activityTimeline = [
    {
      time: '2 minutes ago',
      action: 'Viewed Sales Performance dashboard',
      type: 'view',
      icon: <VisibilityIcon />,
      color: '#4caf50',
    },
    {
      time: '1 hour ago',
      action: 'Added Revenue Chart widget to Marketing Campaign',
      type: 'edit',
      icon: <WidgetsIcon />,
      color: '#2196f3',
    },
    {
      time: '3 hours ago',
      action: 'Updated Financial Overview dashboard settings',
      type: 'edit',
      icon: <EditIcon />,
      color: '#ff9800',
    },
    {
      time: '1 day ago',
      action: 'Shared User Analytics dashboard with Marketing Team',
      type: 'share',
      icon: <ShareIcon />,
      color: '#9c27b0',
    },
    {
      time: '2 days ago',
      action: 'Exported Project Management data to CSV',
      type: 'export',
      icon: <TrendingUpIcon />,
      color: '#f44336',
    },
  ];

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const filteredDashboards = recentDashboards.filter(dashboard => {
    const matchesSearch = dashboard.name.toLowerCase().includes(searchQuery.toLowerCase());
    const now = new Date();
    const accessDate = new Date(dashboard.accessTime);
    const hoursDiff = (now - accessDate) / (1000 * 60 * 60);
    
    let matchesTime = true;
    if (timeFilter === 'today') {
      matchesTime = hoursDiff <= 24;
    } else if (timeFilter === 'week') {
      matchesTime = hoursDiff <= 168; // 7 days
    } else if (timeFilter === 'month') {
      matchesTime = hoursDiff <= 720; // 30 days
    }
    
    return matchesSearch && matchesTime;
  });

  const getTimeFilterIcon = (filter) => {
    switch (filter) {
      case 'today': return <TodayIcon />;
      case 'week': return <ScheduleIcon />;
      case 'month': return <HistoryIcon />;
      default: return <AccessTimeIcon />;
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
              Recent Activity
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Your recently accessed dashboards and activities
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HistoryIcon sx={{ fontSize: 32 }} />
          </Box>
        </DashboardHeader>
      </motion.div>

      {/* Search and Filter */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search recent dashboards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['all', 'today', 'week', 'month'].map((filter) => (
            <Button
              key={filter}
              variant={timeFilter === filter ? 'contained' : 'outlined'}
              startIcon={getTimeFilterIcon(filter)}
              onClick={() => setTimeFilter(filter)}
              size="small"
            >
              {filter === 'all' ? 'All Time' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Recent Dashboards */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Recent Dashboards ({filteredDashboards.length})
          </Typography>
          
          <Grid container spacing={2}>
            {filteredDashboards.length > 0 ? (
              filteredDashboards.map((dashboard, index) => (
                <Grid item xs={12} sm={6} key={dashboard.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <RecentCard>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: dashboard.color, mr: 2 }}>
                            <DashboardIcon />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {dashboard.name}
                            </Typography>
                            <Chip 
                              label={dashboard.type} 
                              size="small" 
                              sx={{ bgcolor: dashboard.color, color: 'white' }}
                            />
                          </Box>
                          <IconButton 
                            onClick={(e) => handleMenuOpen(e, dashboard)}
                            size="small"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {dashboard.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WidgetsIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {dashboard.widgets} widgets
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <VisibilityIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {dashboard.views} views
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {dashboard.lastAccessed}
                          </Typography>
                        </Box>
                        
                        <Typography variant="caption" color="primary.main">
                          Last activity: {dashboard.activity}
                        </Typography>
                      </CardContent>
                      
                      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                        <Button size="small" startIcon={<VisibilityIcon />}>
                          Open
                        </Button>
                        <Button size="small" startIcon={<FavoriteIcon />}>
                          Favorite
                        </Button>
                      </CardActions>
                    </RecentCard>
                  </motion.div>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    color: 'text.secondary'
                  }}
                >
                  <HistoryIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" gutterBottom>
                    No recent dashboards found
                  </Typography>
                  <Typography variant="body2">
                    Try adjusting your search or time filter
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Activity Timeline */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TimelineCard>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Activity Timeline
                </Typography>
                
                <List sx={{ mt: 2 }}>
                  {activityTimeline.map((activity, index) => (
                    <Box key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar 
                            sx={{ 
                              bgcolor: activity.color,
                              width: 32,
                              height: 32
                            }}
                          >
                            {activity.icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2">{activity.action}</Typography>
                              <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < activityTimeline.length - 1 && <Divider sx={{ ml: 6 }} />}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </TimelineCard>
          </motion.div>
        </Grid>
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <VisibilityIcon sx={{ mr: 1 }} />
          Open Dashboard
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <FavoriteIcon sx={{ mr: 1 }} />
          Add to Favorites
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ShareIcon sx={{ mr: 1 }} />
          Share
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Remove from Recent
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default RecentDashboard;
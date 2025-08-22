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
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Widgets as WidgetsIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const DashboardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
  borderRadius: theme.spacing(2),
  color: 'white',
}));

const FavoriteCard = styled(Card)(({ theme }) => ({
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

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
}));

const FavoritesDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample favorite dashboards
  const favoriteDashboards = [
    {
      id: 1,
      name: 'Sales Performance',
      type: 'Analytics',
      description: 'Track sales metrics and performance indicators',
      lastAccessed: '2 hours ago',
      widgets: 8,
      views: 1234,
      color: '#4caf50',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Marketing Campaign',
      type: 'Marketing',
      description: 'Monitor campaign effectiveness and ROI',
      lastAccessed: '1 day ago',
      widgets: 6,
      views: 987,
      color: '#2196f3',
      isFavorite: true,
    },
    {
      id: 3,
      name: 'Financial Overview',
      type: 'Finance',
      description: 'Comprehensive financial metrics and trends',
      lastAccessed: '3 days ago',
      widgets: 12,
      views: 2156,
      color: '#ff9800',
      isFavorite: true,
    },
    {
      id: 4,
      name: 'User Analytics',
      type: 'Analytics',
      description: 'User behavior and engagement insights',
      lastAccessed: '5 days ago',
      widgets: 10,
      views: 1567,
      color: '#9c27b0',
      isFavorite: true,
    },
  ];

  // Sample favorite widgets
  const favoriteWidgets = [
    {
      id: 1,
      name: 'Revenue Chart',
      type: 'Chart',
      dashboard: 'Sales Performance',
      description: 'Monthly revenue trends',
      lastUsed: '1 hour ago',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'User Growth',
      type: 'Metric',
      dashboard: 'User Analytics',
      description: 'Active user growth rate',
      lastUsed: '3 hours ago',
      isFavorite: true,
    },
    {
      id: 3,
      name: 'Conversion Funnel',
      type: 'Funnel',
      dashboard: 'Marketing Campaign',
      description: 'Sales conversion pipeline',
      lastUsed: '1 day ago',
      isFavorite: true,
    },
    {
      id: 4,
      name: 'Expense Tracker',
      type: 'Table',
      dashboard: 'Financial Overview',
      description: 'Monthly expense breakdown',
      lastUsed: '2 days ago',
      isFavorite: true,
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

  const handleFilterOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    handleFilterClose();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleFavorite = (item) => {
    // In a real app, this would update the backend
    console.log('Toggle favorite for:', item.name);
    handleMenuClose();
  };

  const filteredDashboards = favoriteDashboards.filter(dashboard => 
    dashboard.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedFilter === 'all' || dashboard.type.toLowerCase() === selectedFilter.toLowerCase())
  );

  const filteredWidgets = favoriteWidgets.filter(widget => 
    widget.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDashboardCard = (dashboard, index) => (
    <Grid item xs={12} sm={6} md={4} key={dashboard.id}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <FavoriteCard>
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
            
            <Typography variant="caption" color="text.secondary">
              Last accessed: {dashboard.lastAccessed}
            </Typography>
          </CardContent>
          
          <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
            <Button size="small" startIcon={<VisibilityIcon />}>
              View
            </Button>
            <IconButton 
              onClick={() => toggleFavorite(dashboard)}
              sx={{ color: dashboard.isFavorite ? '#ff6b6b' : 'text.secondary' }}
            >
              {dashboard.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </CardActions>
        </FavoriteCard>
      </motion.div>
    </Grid>
  );

  const renderWidgetCard = (widget, index) => (
    <Grid item xs={12} sm={6} md={4} key={widget.id}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <FavoriteCard>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <WidgetsIcon />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  {widget.name}
                </Typography>
                <Chip 
                  label={widget.type} 
                  size="small" 
                  variant="outlined"
                />
              </Box>
              <IconButton 
                onClick={(e) => handleMenuOpen(e, widget)}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {widget.description}
            </Typography>
            
            <Typography variant="caption" color="primary.main" sx={{ mb: 2, display: 'block' }}>
              From: {widget.dashboard}
            </Typography>
            
            <Typography variant="caption" color="text.secondary">
              Last used: {widget.lastUsed}
            </Typography>
          </CardContent>
          
          <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
            <Button size="small" startIcon={<EditIcon />}>
              Edit
            </Button>
            <IconButton 
              onClick={() => toggleFavorite(widget)}
              sx={{ color: widget.isFavorite ? '#ff6b6b' : 'text.secondary' }}
            >
              {widget.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </CardActions>
        </FavoriteCard>
      </motion.div>
    </Grid>
  );

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
              Favorites
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Your most loved dashboards and widgets
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarIcon sx={{ fontSize: 32 }} />
          </Box>
        </DashboardHeader>
      </motion.div>

      {/* Search and Filter */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search favorites..."
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
        
        <Button
          startIcon={<FilterIcon />}
          onClick={handleFilterOpen}
          variant="outlined"
        >
          Filter: {selectedFilter === 'all' ? 'All' : selectedFilter}
        </Button>
        
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={() => handleFilterSelect('all')}>All Types</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('analytics')}>Analytics</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('marketing')}>Marketing</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('finance')}>Finance</MenuItem>
        </Menu>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <StyledTab 
            label={`Dashboards (${filteredDashboards.length})`} 
            icon={<DashboardIcon />} 
            iconPosition="start"
          />
          <StyledTab 
            label={`Widgets (${filteredWidgets.length})`} 
            icon={<WidgetsIcon />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {filteredDashboards.length > 0 ? (
            filteredDashboards.map((dashboard, index) => renderDashboardCard(dashboard, index))
          ) : (
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  color: 'text.secondary'
                }}
              >
                <FavoriteBorderIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                <Typography variant="h6" gutterBottom>
                  No favorite dashboards found
                </Typography>
                <Typography variant="body2">
                  Start adding dashboards to your favorites to see them here
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {filteredWidgets.length > 0 ? (
            filteredWidgets.map((widget, index) => renderWidgetCard(widget, index))
          ) : (
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  color: 'text.secondary'
                }}
              >
                <WidgetsIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                <Typography variant="h6" gutterBottom>
                  No favorite widgets found
                </Typography>
                <Typography variant="body2">
                  Start adding widgets to your favorites to see them here
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => toggleFavorite(selectedItem)}>
          <FavoriteBorderIcon sx={{ mr: 1 }} />
          Remove from Favorites
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
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FavoritesDashboard;
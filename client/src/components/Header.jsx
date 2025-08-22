import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Box, 
  Tooltip,
  Badge,
  InputBase
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { 
  Menu as MenuIcon, 
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  AccountCircle,
  Add as AddIcon,
  Favorite as FavoriteIcon,
  Help as HelpIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  Campaign as CampaignIcon,
  AccountBalance as AccountBalanceIcon,
  Business as BusinessIcon,
  Chat as ChatIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useThemeModeContext } from '../context/ThemeModeContext';
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme, open, isMobile }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
  ...(open && !isMobile && {
    width: `calc(100% - 240px)`,
    marginLeft: '240px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = ({ open, isMobile, onSidebarToggle }) => {
  const { user, logout } = useAuth();
  const { mode, toggleThemeMode } = useThemeModeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dashboardsAnchorEl, setDashboardsAnchorEl] = useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboardsMenuOpen = (event) => {
    setDashboardsAnchorEl(event.currentTarget);
  };

  const handleDashboardsMenuClose = () => {
    setDashboardsAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <StyledAppBar position="fixed" open={open} isMobile={isMobile}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onSidebarToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/dashboard"
          sx={{
            display: { xs: 'none', sm: 'block' },
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dashboard
        </Typography>

        <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Quick Dashboards Dropdown */}
          <Tooltip title="Quick Dashboards">
            <IconButton 
              color="inherit" 
              onClick={handleDashboardsMenuOpen}
              sx={{
                background: 'rgba(99, 102, 241, 0.1)',
                '&:hover': {
                  background: 'rgba(99, 102, 241, 0.2)',
                },
              }}
            >
              <DashboardIcon />
              <KeyboardArrowDownIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={dashboardsAnchorEl}
            open={Boolean(dashboardsAnchorEl)}
            onClose={handleDashboardsMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <MenuItem component={Link} to="/analytics" onClick={handleDashboardsMenuClose}>
              <AnalyticsIcon sx={{ mr: 1, color: '#6366f1' }} />
              Analytics
            </MenuItem>
            <MenuItem component={Link} to="/sales" onClick={handleDashboardsMenuClose}>
              <TrendingUpIcon sx={{ mr: 1, color: '#10b981' }} />
              Sales
            </MenuItem>
            <MenuItem component={Link} to="/marketing" onClick={handleDashboardsMenuClose}>
              <CampaignIcon sx={{ mr: 1, color: '#f59e0b' }} />
              Marketing
            </MenuItem>
            <MenuItem component={Link} to="/finance" onClick={handleDashboardsMenuClose}>
              <AccountBalanceIcon sx={{ mr: 1, color: '#3b82f6' }} />
              Finance
            </MenuItem>
            <MenuItem component={Link} to="/operations" onClick={handleDashboardsMenuClose}>
              <BusinessIcon sx={{ mr: 1, color: '#8b5cf6' }} />
              Operations
            </MenuItem>
          </Menu>
          
          <Tooltip title="Create New Dashboard">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/create"
                sx={{
                  background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </motion.div>
          </Tooltip>
          
          <Tooltip title="Chatbot">
            <IconButton color="inherit" component={Link} to="/chatbot">
              <ChatIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Favorites">
            <IconButton color="inherit" component={Link} to="/favorites">
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Help & Support">
            <IconButton color="inherit" component={Link} to="/help">
              <HelpIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
            <IconButton color="inherit" onClick={toggleThemeMode}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Notifications">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton 
                color="inherit"
                sx={{
                  position: 'relative',
                  '&:hover': {
                    background: 'rgba(99, 102, 241, 0.1)',
                  },
                }}
              >
                <Badge 
                  badgeContent={4} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': {
                          transform: 'scale(1)',
                        },
                        '50%': {
                          transform: 'scale(1.1)',
                        },
                        '100%': {
                          transform: 'scale(1)',
                        },
                      },
                    },
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </motion.div>
          </Tooltip>
          
          {/* User Profile Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            {user?.name && (
              <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Welcome, {user.name.split(' ')[0]}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            )}
            
            <Tooltip title="Account settings">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{
                    border: '2px solid transparent',
                    background: 'linear-gradient(45deg, #6366f1, #818cf8) padding-box, linear-gradient(45deg, #6366f1, #818cf8) border-box',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #4f46e5, #6366f1) padding-box, linear-gradient(45deg, #4f46e5, #6366f1) border-box',
                    },
                  }}
                >
                  {user?.name ? (
                    <Avatar 
                      alt={user.name} 
                      src="/static/images/avatar/1.jpg" 
                      sx={{ 
                        width: 36, 
                        height: 36,
                        background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
                        fontWeight: 600,
                        fontSize: '1.1rem'
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  ) : (
                    <AccountCircle sx={{ fontSize: 36 }} />
                  )}
                </IconButton>
              </motion.div>
            </Tooltip>
          </Box>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 220,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            {user?.name && (
              <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            )}
            <MenuItem 
              component={Link} 
              to="/profile" 
              onClick={handleClose}
              sx={{
                '&:hover': {
                  background: 'rgba(99, 102, 241, 0.1)',
                },
              }}
            >
              <AccountCircle sx={{ mr: 1, color: '#6366f1' }} />
              Profile
            </MenuItem>
            <MenuItem 
              component={Link} 
              to="/settings" 
              onClick={handleClose}
              sx={{
                '&:hover': {
                  background: 'rgba(99, 102, 241, 0.1)',
                },
              }}
            >
              <SettingsIcon sx={{ mr: 1, color: '#6366f1' }} />
              Settings
            </MenuItem>
            <MenuItem 
              component={Link} 
              to="/help" 
              onClick={handleClose}
              sx={{
                '&:hover': {
                  background: 'rgba(99, 102, 241, 0.1)',
                },
              }}
            >
              <HelpIcon sx={{ mr: 1, color: '#6366f1' }} />
              Help & Support
            </MenuItem>
            <MenuItem 
              onClick={handleLogout}
              sx={{
                color: '#ef4444',
                '&:hover': {
                  background: 'rgba(239, 68, 68, 0.1)',
                },
              }}
            >
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
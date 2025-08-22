import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  Person as ProfileIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
  Add as AddIcon,
  Widgets as WidgetsIcon,
  Palette as ThemeIcon,
  History as HistoryIcon,
  Favorite as FavoriteIcon,
  Help as HelpIcon,
  Chat as ChatIcon,
  TrendingUp as TrendingUpIcon,
  Campaign as CampaignIcon,
  AccountBalance as AccountBalanceIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  padding: theme.spacing(2),
  background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: '8px',
  margin: '4px 8px',
  '&:hover': {
    background: theme.palette.mode === 'light' 
      ? 'rgba(99, 102, 241, 0.08)' 
      : 'rgba(99, 102, 241, 0.15)',
  },
  ...(active && {
    background: theme.palette.mode === 'light' 
      ? 'rgba(99, 102, 241, 0.1)' 
      : 'rgba(99, 102, 241, 0.2)',
    '&:hover': {
      background: theme.palette.mode === 'light' 
        ? 'rgba(99, 102, 241, 0.15)' 
        : 'rgba(99, 102, 241, 0.25)',
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '& .MuiListItemText-primary': {
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  }),
}));

const Sidebar = ({ open, isMobile, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [dashboardsOpen, setDashboardsOpen] = useState(true);

  const handleDashboardsToggle = () => {
    setDashboardsOpen(!dashboardsOpen);
  };

  const isActive = (path) => location.pathname === path;

  const drawer = (
    <>
      <DrawerHeader>
        <Logo>Dashboard</Logo>
        {isMobile && (
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <List component="nav" sx={{ flexGrow: 1 }}>
          <ListItem disablePadding>
            <StyledListItemButton 
              component={Link} 
              to="/dashboard" 
              active={isActive('/dashboard') ? 1 : 0}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </StyledListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <StyledListItemButton onClick={handleDashboardsToggle}>
              <ListItemIcon>
                <WidgetsIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboards" />
              {dashboardsOpen ? <ExpandLess /> : <ExpandMore />}
            </StyledListItemButton>
          </ListItem>
          
          <Collapse in={dashboardsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <StyledListItemButton 
                  component={Link} 
                  to="/analytics" 
                  active={isActive('/analytics') ? 1 : 0}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <AnalyticsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                </StyledListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <StyledListItemButton 
                  component={Link} 
                  to="/favorites" 
                  active={isActive('/favorites') ? 1 : 0}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favorites" />
                </StyledListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <StyledListItemButton 
                  component={Link} 
                  to="/recent" 
                  active={isActive('/recent') ? 1 : 0}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Recent" />
                </StyledListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <StyledListItemButton 
                  component={Link} 
                  to="/sales" 
                  active={isActive('/sales') ? 1 : 0}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <TrendingUpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sales" />
                </StyledListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <StyledListItemButton 
                  component={Link} 
                  to="/marketing" 
                  active={isActive('/marketing') ? 1 : 0}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <CampaignIcon />
                  </ListItemIcon>
                  <ListItemText primary="Marketing" />
                </StyledListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <StyledListItemButton 
                  component={Link} 
                  to="/finance" 
                  active={isActive('/finance') ? 1 : 0}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Finance" />
                </StyledListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <StyledListItemButton 
                  component={Link} 
                  to="/operations" 
                  active={isActive('/operations') ? 1 : 0}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Operations" />
                </StyledListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <StyledListItemButton 
                  component={Link} 
                  to="/create" 
                  active={isActive('/create') ? 1 : 0}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create New" />
                </StyledListItemButton>
              </ListItem>
            </List>
          </Collapse>
          
          <ListItem disablePadding>
            <StyledListItemButton 
              component={Link} 
              to="/themes" 
              active={isActive('/themes') ? 1 : 0}
            >
              <ListItemIcon>
                <ThemeIcon />
              </ListItemIcon>
              <ListItemText primary="Themes" />
            </StyledListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <StyledListItemButton 
              component={Link} 
              to="/chatbot" 
              active={isActive('/chatbot') ? 1 : 0}
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chatbot" />
            </StyledListItemButton>
          </ListItem>
        </List>
        
        <Divider />
        
        <List>
          <ListItem disablePadding>
            <StyledListItemButton 
              component={Link} 
              to="/profile" 
              active={isActive('/profile') ? 1 : 0}
            >
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </StyledListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <StyledListItemButton 
              component={Link} 
              to="/settings" 
              active={isActive('/settings') ? 1 : 0}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </StyledListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <StyledListItemButton 
              component={Link} 
              to="/help" 
              active={isActive('/help') ? 1 : 0}
            >
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help & Support" />
            </StyledListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { md: open ? drawerWidth : 0 }, flexShrink: { md: 0 } }}>
      {isMobile ? (
        <StyledDrawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </StyledDrawer>
      ) : (
        <StyledDrawer variant="persistent" open={open}>
          {drawer}
        </StyledDrawer>
      )}
    </Box>
  );
};

export default Sidebar;
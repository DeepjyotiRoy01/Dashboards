import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainContainer = styled(Box)(({ theme, open, isMobile }) => ({
  display: 'flex',
  minHeight: '100vh',
  background: theme.palette.background.default,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ContentContainer = styled(Box)(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && !isMobile && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: '240px',
  }),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: '80px', // Account for fixed header
  minHeight: 'calc(100vh - 64px)',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '70px',
  },
}));

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <MainContainer open={sidebarOpen} isMobile={isMobile}>
      <CssBaseline />
      <Header 
        open={sidebarOpen} 
        isMobile={isMobile} 
        onSidebarToggle={handleSidebarToggle} 
      />
      <Sidebar 
        open={sidebarOpen} 
        isMobile={isMobile} 
        onClose={() => setSidebarOpen(false)} 
      />
      <ContentContainer open={sidebarOpen} isMobile={isMobile}>
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentContainer>
    </MainContainer>
  );
};

export default MainLayout;
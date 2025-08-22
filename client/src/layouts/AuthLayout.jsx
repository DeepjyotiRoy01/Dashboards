import { Outlet } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const AuthBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #d9e8ff 100%)'
    : 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
}));

const AuthCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '450px',
  padding: theme.spacing(4),
  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: theme.palette.mode === 'light' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const Logo = styled('div')(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const AuthLayout = () => {
  return (
    <AuthBackground>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthCard elevation={0}>
            <Logo>Dashboard</Logo>
            <Typography 
              variant="subtitle1" 
              align="center" 
              gutterBottom
              sx={{ mb: 4, opacity: 0.8 }}
            >
              Your interactive data visualization platform
            </Typography>
            <Outlet />
          </AuthCard>
        </motion.div>
      </Container>
    </AuthBackground>
  );
};

export default AuthLayout;
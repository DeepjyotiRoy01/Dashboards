import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
} from '@mui/material';
import {
  BarChart as BarChartIcon,
  AttachMoney as AttachMoneyIcon,
  Settings as SettingsIcon,
  Cloud as CloudIcon,
} from '@mui/icons-material';

const features = [
  {
    title: 'Business & Analytics',
    description: 'Track sales, e-commerce metrics, and marketing campaigns with interactive visualizations.',
    icon: <BarChartIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Financial Dashboards',
    description: 'Monitor personal finances, cryptocurrency portfolios, and stock market trends.',
    icon: <AttachMoneyIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Operational Dashboards',
    description: 'Manage IoT sensors, website analytics, and project progress in real-time.',
    icon: <SettingsIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Creative & Specialized',
    description: 'Visualize weather patterns, sports statistics, and health metrics with customizable dashboards.',
    icon: <CloudIcon fontSize="large" color="primary" />,
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: theme.palette.background.paper }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Interactive Dashboard
          </Typography>
          <Button color="primary" onClick={() => navigate('/login')} sx={{ mx: 1 }}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/register')} sx={{ mx: 1 }}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <motion.div variants={itemVariants}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Interactive Data Visualization
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Powerful, customizable dashboards for all your data visualization needs.
                Monitor business metrics, financial data, operations, and more with our
                interactive and user-friendly dashboard solution.
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    mx: 1,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{ mx: 1, px: 4, py: 1.5, borderRadius: 2 }}
                >
                  Log In
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Dashboard Categories
          </Typography>
        </motion.div>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: '0.3s',
                    borderRadius: 3,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      pt: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" align="center" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography align="center">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          py: 6,
          mt: 4,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
              Ready to transform your data experience?
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              Join thousands of users who have already enhanced their data visualization capabilities.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Start Free Trial
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: theme.palette.background.paper, p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Interactive Dashboard
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Visualize your data like never before
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Interactive Dashboard. All rights reserved.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;
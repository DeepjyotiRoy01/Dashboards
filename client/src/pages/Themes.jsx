import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Slider,
  Chip,
  Avatar,
  Divider,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  FormatPaint as ThemeIcon,
  Visibility as PreviewIcon,
  Save as SaveIcon,
  Refresh as ResetIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const ThemeHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const ThemeCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const ColorSwatch = styled(Box)(({ theme, color, selected }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: color,
  cursor: 'pointer',
  border: selected ? `3px solid ${theme.palette.primary.main}` : '2px solid transparent',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const PreviewCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

const Themes = () => {
  const { themeConfig, updateTheme, resetTheme, themes } = useTheme();
  const [selectedAccentColor, setSelectedAccentColor] = useState(themeConfig.accentColor);

  const themeOptions = [
    {
      id: 'default',
      name: 'Default',
      description: 'Clean and modern design',
      primary: '#1976d2',
      secondary: '#dc004e',
      preview: 'A balanced theme perfect for professional dashboards',
    },
    {
      id: 'ocean',
      name: 'Ocean Blue',
      description: 'Calm and professional',
      primary: '#0277bd',
      secondary: '#00acc1',
      preview: 'Inspired by the depths of the ocean',
    },
    {
      id: 'forest',
      name: 'Forest Green',
      description: 'Natural and refreshing',
      primary: '#388e3c',
      secondary: '#689f38',
      preview: 'Brings nature to your workspace',
    },
    {
      id: 'sunset',
      name: 'Sunset Orange',
      description: 'Warm and energetic',
      primary: '#f57c00',
      secondary: '#ff5722',
      preview: 'Energizing colors for productive work',
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      description: 'Elegant and sophisticated',
      primary: '#7b1fa2',
      secondary: '#8e24aa',
      preview: 'Sophisticated design for premium feel',
    },
    {
      id: 'minimal',
      name: 'Minimal Gray',
      description: 'Simple and focused',
      primary: '#424242',
      secondary: '#616161',
      preview: 'Distraction-free minimalist design',
    },
  ];

  const accentColors = [
    '#1976d2', '#dc004e', '#388e3c', '#f57c00',
    '#7b1fa2', '#d32f2f', '#0288d1', '#00796b',
    '#5d4037', '#455a64', '#e64a19', '#c2185b',
  ];

  const handleThemeSelect = (themeId) => {
    updateTheme({ theme: themeId });
  };

  const handleSaveTheme = () => {
    updateTheme({ accentColor: selectedAccentColor });
    // Show success message
  };

  const handleResetTheme = () => {
    resetTheme();
    setSelectedAccentColor('#1976d2');
  };

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ThemeHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PaletteIcon sx={{ mr: 2, fontSize: 32 }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                Theme Customization
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Personalize your dashboard appearance
              </Typography>
            </Box>
          </Box>
        </ThemeHeader>

        <Grid container spacing={3}>
          {/* Theme Selection */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Color Themes
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Choose a color scheme that matches your style
                </Typography>

                <Grid container spacing={2}>
                  {themeOptions.map((theme) => (
                    <Grid item xs={12} sm={6} md={4} key={theme.id}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ThemeCard
                          onClick={() => handleThemeSelect(theme.id)}
                          sx={{
                            border: themeConfig.theme === theme.id ? 2 : 1,
                            borderColor: themeConfig.theme === theme.id ? 'primary.main' : 'divider',
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Box sx={{ display: 'flex', gap: 0.5, mr: 2 }}>
                                <Box
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    backgroundColor: theme.primary,
                                  }}
                                />
                                <Box
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    backgroundColor: theme.secondary,
                                  }}
                                />
                              </Box>
                              {themeConfig.theme === theme.id && (
                                <CheckIcon color="primary" fontSize="small" />
                              )}
                            </Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {theme.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {theme.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {theme.preview}
                            </Typography>
                          </CardContent>
                        </ThemeCard>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Accent Colors */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Accent Color
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Choose an accent color for highlights and interactive elements
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {accentColors.map((color) => (
                    <ColorSwatch
                      key={color}
                      color={color}
                      selected={selectedAccentColor === color}
                      onClick={() => setSelectedAccentColor(color)}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Advanced Settings
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Font Size
                    </Typography>
                    <Slider
                      value={themeConfig.fontSize}
                      onChange={(e, value) => updateTheme({ fontSize: value })}
                      min={12}
                      max={18}
                      step={1}
                      marks
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}px`}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Border Radius
                    </Typography>
                    <Slider
                      value={themeConfig.borderRadius}
                      onChange={(e, value) => updateTheme({ borderRadius: value })}
                      min={0}
                      max={16}
                      step={2}
                      marks
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}px`}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={themeConfig.darkMode}
                            onChange={(e) => updateTheme({ darkMode: e.target.checked })}
                          />
                        }
                        label="Dark Mode"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={themeConfig.animations}
                            onChange={(e) => updateTheme({ animations: e.target.checked })}
                          />
                        }
                        label="Enable Animations"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={themeConfig.compactMode}
                            onChange={(e) => updateTheme({ compactMode: e.target.checked })}
                          />
                        }
                        label="Compact Mode"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Preview Panel */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ position: 'sticky', top: 24 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PreviewIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Preview
                  </Typography>
                </Box>

                <PreviewCard sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Dashboard Preview
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label="Primary"
                      sx={{
                        backgroundColor: themeOptions.find(t => t.id === themeConfig.theme)?.primary,
                        color: 'white',
                      }}
                    />
                    <Chip
                      label="Secondary"
                      sx={{
                        backgroundColor: themeOptions.find(t => t.id === themeConfig.theme)?.secondary,
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    This is how your dashboard will look with the selected theme.
                  </Typography>
                </PreviewCard>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveTheme}
                    fullWidth
                  >
                    Save Theme
                  </Button>
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<ResetIcon />}
                  onClick={handleResetTheme}
                  fullWidth
                >
                  Reset to Default
                </Button>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Current Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">
                    Theme: {themeOptions.find(t => t.id === themeConfig.theme)?.name}
                  </Typography>
                  <Typography variant="body2">
                    Mode: {themeConfig.darkMode ? 'Dark' : 'Light'}
                  </Typography>
                  <Typography variant="body2">
                    Font Size: {themeConfig.fontSize}px
                  </Typography>
                  <Typography variant="body2">
                    Border Radius: {themeConfig.borderRadius}px
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Themes;
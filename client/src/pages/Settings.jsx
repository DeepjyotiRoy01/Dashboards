import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Grid,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Upload as UploadIcon
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Settings() {
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    // General Settings
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
    autoSave: true,
    compactView: false,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    desktopNotifications: false,
    soundEnabled: true,
    notificationFrequency: 'immediate',
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAlerts: true,
    
    // Data Settings
    dataRetention: 365,
    autoBackup: true,
    backupFrequency: 'weekly'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSettingChange = (setting) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const handleResetSettings = () => {
    // Reset to default settings
    setSettings({
      darkMode: false,
      language: 'en',
      timezone: 'UTC',
      autoSave: true,
      compactView: false,
      emailNotifications: true,
      pushNotifications: true,
      desktopNotifications: false,
      soundEnabled: true,
      notificationFrequency: 'immediate',
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginAlerts: true,
      dataRetention: 365,
      autoBackup: true,
      backupFrequency: 'weekly'
    });
  };

  const handleExportData = () => {
    // Export data logic
    console.log('Exporting data...');
  };

  const handleImportData = () => {
    // Import data logic
    console.log('Importing data...');
  };

  const handleDeleteAccount = () => {
    // Delete account logic
    console.log('Delete account requested...');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SettingsIcon fontSize="large" />
        Settings
      </Typography>
      
      <Paper sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs">
            <Tab icon={<SettingsIcon />} label="General" />
            <Tab icon={<NotificationsIcon />} label="Notifications" />
            <Tab icon={<SecurityIcon />} label="Security" />
            <Tab icon={<StorageIcon />} label="Data & Storage" />
          </Tabs>
        </Box>

        {/* General Settings Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            General Preferences
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText
                primary="Dark Mode"
                secondary="Switch between light and dark themes"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.darkMode}
                  onChange={handleSettingChange('darkMode')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Language"
                secondary="Choose your preferred language"
              />
              <ListItemSecondaryAction>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={settings.language}
                    onChange={handleSettingChange('language')}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="de">Deutsch</MenuItem>
                    <MenuItem value="zh">中文</MenuItem>
                  </Select>
                </FormControl>
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Timezone"
                secondary="Set your local timezone"
              />
              <ListItemSecondaryAction>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={settings.timezone}
                    onChange={handleSettingChange('timezone')}
                  >
                    <MenuItem value="UTC">UTC</MenuItem>
                    <MenuItem value="EST">EST</MenuItem>
                    <MenuItem value="PST">PST</MenuItem>
                    <MenuItem value="GMT">GMT</MenuItem>
                    <MenuItem value="JST">JST</MenuItem>
                  </Select>
                </FormControl>
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Auto Save"
                secondary="Automatically save your work"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.autoSave}
                  onChange={handleSettingChange('autoSave')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Compact View"
                secondary="Use a more compact interface layout"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.compactView}
                  onChange={handleSettingChange('compactView')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText
                primary="Email Notifications"
                secondary="Receive notifications via email"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.emailNotifications}
                  onChange={handleSettingChange('emailNotifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Push Notifications"
                secondary="Receive push notifications on your device"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.pushNotifications}
                  onChange={handleSettingChange('pushNotifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Desktop Notifications"
                secondary="Show notifications on your desktop"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.desktopNotifications}
                  onChange={handleSettingChange('desktopNotifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Sound Enabled"
                secondary="Play sounds for notifications"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.soundEnabled}
                  onChange={handleSettingChange('soundEnabled')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Notification Frequency"
                secondary="How often to receive notifications"
              />
              <ListItemSecondaryAction>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={settings.notificationFrequency}
                    onChange={handleSettingChange('notificationFrequency')}
                  >
                    <MenuItem value="immediate">Immediate</MenuItem>
                    <MenuItem value="hourly">Hourly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                  </Select>
                </FormControl>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText
                primary="Two-Factor Authentication"
                secondary="Add an extra layer of security to your account"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.twoFactorAuth}
                  onChange={handleSettingChange('twoFactorAuth')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Session Timeout"
                secondary="Automatically log out after inactivity (minutes)"
              />
              <ListItemSecondaryAction>
                <TextField
                  type="number"
                  size="small"
                  value={settings.sessionTimeout}
                  onChange={handleSettingChange('sessionTimeout')}
                  sx={{ width: 80 }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Login Alerts"
                secondary="Get notified when someone logs into your account"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.loginAlerts}
                  onChange={handleSettingChange('loginAlerts')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Password & Authentication
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" fullWidth>
                  Change Password
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" fullWidth>
                  Manage API Keys
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Data & Storage Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Data Management
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText
                primary="Data Retention"
                secondary="How long to keep your data (days)"
              />
              <ListItemSecondaryAction>
                <TextField
                  type="number"
                  size="small"
                  value={settings.dataRetention}
                  onChange={handleSettingChange('dataRetention')}
                  sx={{ width: 100 }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Auto Backup"
                secondary="Automatically backup your data"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.autoBackup}
                  onChange={handleSettingChange('autoBackup')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <Divider />
            
            <ListItem>
              <ListItemText
                primary="Backup Frequency"
                secondary="How often to backup your data"
              />
              <ListItemSecondaryAction>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={settings.backupFrequency}
                    onChange={handleSettingChange('backupFrequency')}
                    disabled={!settings.autoBackup}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Data Export & Import
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  fullWidth
                  onClick={handleExportData}
                >
                  Export Data
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  startIcon={<UploadIcon />}
                  fullWidth
                  onClick={handleImportData}
                >
                  Import Data
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          <Box sx={{ mt: 4 }}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              Danger Zone - These actions cannot be undone
            </Alert>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </Box>
        </TabPanel>
      </Paper>
      
      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleResetSettings}>
          Reset to Defaults
        </Button>
        <Button variant="contained" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </Box>
    </Container>
  );
}

export default Settings;
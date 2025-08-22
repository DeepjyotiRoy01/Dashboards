import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Tab,
  Tabs,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Shield as ShieldIcon,
  Key as KeyIcon,
  Devices as DevicesIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const ProfileHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[4],
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
}));

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
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

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    company: 'Tech Corp',
    position: 'Senior Developer',
    bio: 'Passionate developer with 5+ years of experience in building scalable web applications.',
    joinDate: '2023-01-15',
    avatar: null,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    marketingEmails: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    twoFactorAuth: true,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacy(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save profile data to backend
    setIsEditing(false);
    // Show success message
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const profileCompleteness = () => {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'location', 'company', 'position', 'bio'];
    const completed = fields.filter(field => profileData[field] && profileData[field].trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  const recentActivity = [
    { action: 'Updated profile picture', date: '2 hours ago', icon: <PhotoCameraIcon /> },
    { action: 'Changed password', date: '1 day ago', icon: <KeyIcon /> },
    { action: 'Updated contact information', date: '3 days ago', icon: <EditIcon /> },
    { action: 'Enabled two-factor authentication', date: '1 week ago', icon: <ShieldIcon /> },
  ];

  const connectedDevices = [
    { name: 'MacBook Pro', location: 'New York, NY', lastActive: 'Active now', type: 'Desktop' },
    { name: 'iPhone 14', location: 'New York, NY', lastActive: '2 hours ago', type: 'Mobile' },
    { name: 'iPad Air', location: 'Boston, MA', lastActive: '1 day ago', type: 'Tablet' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfileHeader>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Box sx={{ position: 'relative' }}>
                <StyledAvatar
                  src={profileData.avatar}
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                >
                  {!profileData.avatar && `${profileData.firstName[0]}${profileData.lastName[0]}`}
                </StyledAvatar>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'background.paper',
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'background.paper',
                      },
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </Box>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
                {profileData.firstName} {profileData.lastName}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                {profileData.position} at {profileData.company}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                {profileData.bio}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  icon={<EmailIcon />}
                  label={profileData.email}
                  variant="outlined"
                  sx={{ mr: 1, color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
                />
                <Chip
                  icon={<LocationIcon />}
                  label={profileData.location}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Button
                variant={isEditing ? 'contained' : 'outlined'}
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
              {isEditing && (
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  sx={{
                    ml: 1,
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </ProfileHeader>

        {/* Profile Completeness */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
                Profile Completeness
              </Typography>
              <Typography variant="h6" color="primary">
                {profileCompleteness()}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={profileCompleteness()}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Complete your profile to get the most out of your dashboard experience
            </Typography>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Personal Info" icon={<PersonIcon />} />
            <Tab label="Security" icon={<SecurityIcon />} />
            <Tab label="Notifications" icon={<NotificationsIcon />} />
            <Tab label="Privacy" icon={<ShieldIcon />} />
            <Tab label="Activity" icon={<CalendarIcon />} />
          </Tabs>
        </Paper>

        {/* Personal Information Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ProfileCard>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Location"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Company"
                        value={profileData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Position"
                        value={profileData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        multiline
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </ProfileCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ProfileCard>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Quick Stats
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Member Since"
                        secondary={new Date(profileData.joinDate).toLocaleDateString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Dashboards Created"
                        secondary="12"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <VisibilityIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Total Views"
                        secondary="1,234"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </ProfileCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ProfileCard>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Password & Authentication
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type={showPassword ? 'text' : 'password'}
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      sx={{ mb: 2 }}
                    />
                    <Button variant="contained" startIcon={<KeyIcon />}>
                      Update Password
                    </Button>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacy.twoFactorAuth}
                        onChange={(e) => handlePrivacyChange('twoFactorAuth', e.target.checked)}
                      />
                    }
                    label="Two-Factor Authentication"
                  />
                </CardContent>
              </ProfileCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <ProfileCard>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Connected Devices
                  </Typography>
                  <List>
                    {connectedDevices.map((device, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <DevicesIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={device.name}
                          secondary={`${device.location} • ${device.lastActive}`}
                        />
                        <ListItemSecondaryAction>
                          <Button size="small" color="error">
                            Remove
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </ProfileCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={2}>
          <ProfileCard>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Notification Preferences
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive updates and alerts via email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={notifications.emailNotifications}
                      onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Receive browser push notifications"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={notifications.pushNotifications}
                      onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="SMS Notifications"
                    secondary="Receive important alerts via SMS"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={notifications.smsNotifications}
                      onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Marketing Emails"
                    secondary="Receive product updates and newsletters"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={notifications.marketingEmails}
                      onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </ProfileCard>
        </TabPanel>

        {/* Privacy Tab */}
        <TabPanel value={tabValue} index={3}>
          <ProfileCard>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Privacy Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Show Email Address"
                    secondary="Make your email visible to other users"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={privacy.showEmail}
                      onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Show Phone Number"
                    secondary="Make your phone number visible to other users"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={privacy.showPhone}
                      onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </ProfileCard>
        </TabPanel>

        {/* Activity Tab */}
        <TabPanel value={tabValue} index={4}>
          <ProfileCard>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {activity.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.date}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </ProfileCard>
        </TabPanel>
      </motion.div>
    </Box>
  );
};

export default Profile;
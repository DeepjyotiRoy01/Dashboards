import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Divider,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(10px)',
    border: theme.palette.mode === 'light' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
}));

const WidgetForm = ({ open, onClose, onSubmit, widget }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    type: 'chart',
    dataSource: 'sales',
    settings: {
      size: 'medium',
      chartType: 'bar',
      refreshInterval: 0,
    },
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (widget) {
      setFormData({
        title: widget.title || '',
        subtitle: widget.subtitle || '',
        type: widget.type || 'chart',
        dataSource: widget.dataSource || 'sales',
        settings: {
          size: widget.settings?.size || 'medium',
          chartType: widget.settings?.chartType || 'bar',
          refreshInterval: widget.settings?.refreshInterval || 0,
        },
      });
    }
  }, [widget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      settings: {
        ...formData.settings,
        [name]: value,
      },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.type) {
      newErrors.type = 'Widget type is required';
    }
    if (!formData.dataSource) {
      newErrors.dataSource = 'Data source is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <Typography variant="h6">{widget ? 'Edit Widget' : 'Add New Widget'}</Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Basic Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Widget Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Widget Subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.type} required>
              <InputLabel>Widget Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Widget Type"
              >
                <MenuItem value="chart">Chart</MenuItem>
                <MenuItem value="table">Table</MenuItem>
                <MenuItem value="metric">Metric</MenuItem>
                <MenuItem value="map">Map</MenuItem>
              </Select>
              {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.dataSource} required>
              <InputLabel>Data Source</InputLabel>
              <Select
                name="dataSource"
                value={formData.dataSource}
                onChange={handleChange}
                label="Data Source"
              >
                <MenuItem value="sales">Sales Data</MenuItem>
                <MenuItem value="analytics">Analytics Data</MenuItem>
                <MenuItem value="finance">Finance Data</MenuItem>
                <MenuItem value="marketing">Marketing Data</MenuItem>
                <MenuItem value="hr">HR Data</MenuItem>
              </Select>
              {errors.dataSource && <FormHelperText>{errors.dataSource}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Widget Settings
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Widget Size</InputLabel>
              <Select
                name="size"
                value={formData.settings.size}
                onChange={handleSettingsChange}
                label="Widget Size"
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {formData.type === 'chart' && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Chart Type</InputLabel>
                <Select
                  name="chartType"
                  value={formData.settings.chartType}
                  onChange={handleSettingsChange}
                  label="Chart Type"
                >
                  <MenuItem value="bar">Bar Chart</MenuItem>
                  <MenuItem value="line">Line Chart</MenuItem>
                  <MenuItem value="area">Area Chart</MenuItem>
                  <MenuItem value="pie">Pie Chart</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Auto Refresh Interval (seconds, 0 for none)"
              name="refreshInterval"
              type="number"
              value={formData.settings.refreshInterval}
              onChange={handleSettingsChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
            },
          }}
        >
          {widget ? 'Update Widget' : 'Add Widget'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default WidgetForm;
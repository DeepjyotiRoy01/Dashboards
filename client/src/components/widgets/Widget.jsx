import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  CardContent,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material';
import ChartWidget from './ChartWidget';
import TableWidget from './TableWidget';
import MetricWidget from './MetricWidget';
import MapWidget from './MapWidget';

const WidgetHeader = styled(CardHeader)(({ theme }) => ({
  padding: '12px 16px',
  '& .MuiCardHeader-title': {
    fontSize: '1rem',
    fontWeight: 600,
  },
  '& .MuiCardHeader-subheader': {
    fontSize: '0.75rem',
  },
}));

const WidgetContent = styled(CardContent)(({ theme }) => ({
  padding: '0px 16px 16px',
  '&:last-child': {
    paddingBottom: 16,
  },
}));

const Widget = ({ widget, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    handleMenuClose();
    setLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit();
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete();
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'chart':
        return <ChartWidget data={widget.data} settings={widget.settings} loading={loading} />;
      case 'table':
        return <TableWidget data={widget.data} settings={widget.settings} loading={loading} />;
      case 'metric':
        return <MetricWidget data={widget.data} settings={widget.settings} loading={loading} />;
      case 'map':
        return <MapWidget data={widget.data} settings={widget.settings} loading={loading} />;
      default:
        return (
          <Box p={2} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Unknown widget type: {widget.type}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      <WidgetHeader
        title={widget.title}
        subheader={widget.subtitle}
        action={
          <Box>
            <Tooltip title="Refresh">
              <IconButton size="small" onClick={handleRefresh}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="More options">
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEdit}>
                <EditIcon fontSize="small" sx={{ mr: 1 }} />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                Delete
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <FullscreenIcon fontSize="small" sx={{ mr: 1 }} />
                Fullscreen
              </MenuItem>
            </Menu>
          </Box>
        }
      />
      <WidgetContent>
        {renderWidgetContent()}
      </WidgetContent>
    </Card>
  );
};

export default Widget;
import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Skeleton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { mockDataService } from '../../utils/api';

const MetricContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  height: '100%',
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const TrendContainer = styled(Box)(({ theme, positive }) => ({
  display: 'flex',
  alignItems: 'center',
  color: positive ? theme.palette.success.main : theme.palette.error.main,
  fontSize: '0.875rem',
  fontWeight: 500,
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minHeight: 100,
}));

const MetricWidget = ({ data, settings, loading }) => {
  const [metricData, setMetricData] = useState(null);
  const [isLoading, setIsLoading] = useState(loading || true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would fetch from the API based on settings.dataSource
        // For now, we'll use mock data
        let result;
        switch (settings?.dataSource) {
          case 'sales':
            result = await mockDataService.getSalesData();
            break;
          case 'analytics':
            result = await mockDataService.getAnalyticsData();
            break;
          case 'finance':
            result = await mockDataService.getFinanceData();
            break;
          case 'marketing':
            result = await mockDataService.getMarketingData();
            break;
          case 'hr':
            result = await mockDataService.getHRData();
            break;
          default:
            // Default mock data
            result = {
              metric: {
                value: '12,345',
                label: 'Total Users',
                trend: '+12.5%',
                trendDirection: 'up',
                previousPeriod: 'vs last month',
              },
            };
        }

        setMetricData(result.metric);
      } catch (err) {
        console.error('Error fetching metric data:', err);
        setError('Failed to load metric data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [settings?.dataSource]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Box sx={{ width: '100%' }}>
          <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="70%" height={40} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" height={20} />
        </Box>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </LoadingContainer>
    );
  }

  if (!metricData) {
    return (
      <LoadingContainer>
        <Typography variant="body2" color="text.secondary">
          No data available
        </Typography>
      </LoadingContainer>
    );
  }

  const isPositiveTrend = metricData.trendDirection === 'up';

  return (
    <MetricContainer>
      <MetricLabel variant="subtitle2">{metricData.label}</MetricLabel>
      <MetricValue variant="h3">{metricData.value}</MetricValue>
      <TrendContainer positive={isPositiveTrend}>
        {isPositiveTrend ? (
          <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
        ) : (
          <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />
        )}
        <Typography variant="body2" component="span" fontWeight={500}>
          {metricData.trend}
        </Typography>
        <Typography 
          variant="caption" 
          component="span" 
          color="text.secondary"
          sx={{ ml: 0.5 }}
        >
          {metricData.previousPeriod}
        </Typography>
      </TrendContainer>
    </MetricContainer>
  );
};

export default MetricWidget;
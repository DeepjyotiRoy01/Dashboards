import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { mockDataService } from '../../utils/api';

const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
}));

// Simple world map geoJSON
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const MapWidget = ({ data, settings, loading }) => {
  const [mapData, setMapData] = useState([]);
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
          case 'marketing':
            result = await mockDataService.getMarketingData();
            break;
          default:
            // Default mock data for map
            result = {
              data: [
                { name: "New York", coordinates: [-74.006, 40.7128], value: 8.4 },
                { name: "London", coordinates: [-0.1278, 51.5074], value: 6.2 },
                { name: "Tokyo", coordinates: [139.6917, 35.6895], value: 9.3 },
                { name: "Sydney", coordinates: [151.2093, -33.8688], value: 4.8 },
                { name: "Berlin", coordinates: [13.4050, 52.5200], value: 3.7 },
              ],
            };
        }

        setMapData(result.data);
      } catch (err) {
        console.error('Error fetching map data:', err);
        setError('Failed to load map data');
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
        <CircularProgress size={30} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Loading map data...
        </Typography>
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

  if (!mapData || mapData.length === 0) {
    return (
      <LoadingContainer>
        <Typography variant="body2" color="text.secondary">
          No map data available
        </Typography>
      </LoadingContainer>
    );
  }

  return (
    <MapContainer>
      <ComposableMap
        projectionConfig={{
          scale: 140,
          rotation: [-11, 0, 0],
        }}
      >
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {mapData.map(({ name, coordinates, value }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle 
                r={Math.max(value * 1.5, 5)} 
                fill="#6366f1" 
                stroke="#fff" 
                strokeWidth={1} 
                opacity={0.8} 
              />
              <text
                textAnchor="middle"
                y={-10}
                style={{
                  fontFamily: "system-ui",
                  fill: "#5D5A6D",
                  fontSize: "8px",
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </MapContainer>
  );
};

export default MapWidget;
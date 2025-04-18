import useAccommodationStore from '../../store/accommodationStore';
import { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import CampCard from '../home/components/campcard/CampCard';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Collection = () => {
  const { accommodations, fetchcardAccommodations } = useAccommodationStore();
  const [value, setValue] = useState(0);
  const [locationData, setLocationData] = useState({
    pune: [],
    nagpur: [],
    nashik: [],
    kolhapur: []
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchcardAccommodations();
  }, []);

  useEffect(() => {
    if (accommodations.length > 0) {
      const locations = {
        pune: accommodations.filter(
          (property) => property.address?.dist?.toLowerCase() === 'pune'
        ),
        nagpur: accommodations.filter(
          (property) => property.address?.dist?.toLowerCase() === 'nagpur'
        ),
        nashik: accommodations.filter(
          (property) => property.address?.dist?.toLowerCase() === 'nashik'
        ),
        kolhapur: accommodations.filter(
          (property) => property.address?.dist?.toLowerCase() === 'kolhapur'
        )
      };
      setLocationData(locations);
    }
  }, [accommodations]);

  const renderProperties = (properties) => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
        mt: 3,
      }}
    >
      {properties.map((property, index) => (
        <CampCard
          key={`${property.type || 'unknown'}-${property._id || property.id || index}`}
          id={property._id || property.id}
          type={property.type}
          campName={property.campName}
          location={`${property.address?.village || ''}, ${property.address?.dist || ''}`}
          price={property.prices?.afterDiscount}
          actualPrice={property.prices?.actual}
          rating={property.ratings?.location}
          images={property.about?.images || []}
        />
      ))}
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          centered
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.1rem',
              fontWeight: 500,
              textTransform: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', // Added system font fallback
            }
          }}
        >
          <Tab label="Pune" />
          <Tab label="Nagpur" />
          <Tab label="Nashik" />
          <Tab label="Kolhapur" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography variant="h6" sx={{ 
          mb: 2,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' // Added system font fallback
        }}>
          Pune Properties ({locationData.pune.length})
        </Typography>
        {renderProperties(locationData.pune)}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Nagpur Properties ({locationData.nagpur.length})
        </Typography>
        {renderProperties(locationData.nagpur)}
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Nashik Properties ({locationData.nashik.length})
        </Typography>
        {renderProperties(locationData.nashik)}
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Kolhapur Properties ({locationData.kolhapur.length})
        </Typography>
        {renderProperties(locationData.kolhapur)}
      </TabPanel>
    </Box>
  );
};

export default Collection;

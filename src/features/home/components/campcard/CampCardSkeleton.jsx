import { Card, CardContent, Box } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CampCardSkeleton = () => {
  return (
    <Card
      sx={{
        borderRadius: '10px',
        position: 'relative',
        maxWidth: 330,
        backgroundColor: '#fff',
        border: '1px solid hsl(35, 90.50%, 95.90%)',
        boxShadow: 'none',
      }}
    >
      <Skeleton height={330} style={{ lineHeight: 1 }} />
      <CardContent sx={{ position: 'relative', pt: 2, pb: '16px !important' }}>
        <Skeleton width={100} />
        <Box sx={{ mt: 1, mb: 1 }}>
          <Skeleton width={200} height={24} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Skeleton width={120} height={24} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton circle width={28} height={28} />
            <Skeleton circle width={28} height={28} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton width={80} height={24} />
          <Skeleton width={60} height={20} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CampCardSkeleton;

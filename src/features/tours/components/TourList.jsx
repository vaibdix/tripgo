import { Box, Grid, Typography, Pagination } from '@mui/material';
import CampCard from '../../home/components/campcard/CampCard';
import CampCardSkeleton from '../../home/components/campcard/CampCardSkeleton';

const TourList = ({ isLoading, accommodations, tentType, currentPage, totalPages, changePage }) => {
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[...Array(8)].map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <CampCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!accommodations || accommodations.length === 0) {
    return <Typography>No {tentType} available</Typography>;
  }

  return (
    <>
      <Grid container spacing={3}>
        {accommodations.map((item) => (
          <Grid item key={item._id || item.id} xs={12} sm={6} md={4} lg={3}>
            <CampCard
              id={item._id || item.id}
              type={tentType}
              campName={item.campName}
              location={item.address.tal}
              price={item.prices.afterDiscount}
              actualPrice={item.prices.actual}
              rating={item.ratings.location}
              images={item.about.images}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => changePage(page)}
          color="primary"
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'black',
            },
            '& .Mui-selected': {
              backgroundColor: 'black !important',
              color: 'white !important',
            },
          }}
        />
      </Box>
    </>
  );
};

export default TourList;
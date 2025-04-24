import herooimg from '../../../../assets/images/herooimg.jpg';
import { Typography, Box, Grid, Card, CardMedia } from '@mui/material';

export default function Hero() {
  return (
    <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sx={{ position: 'relative' }}>
          <Card sx={{ boxShadow: 'none' }}>
            <CardMedia
              component="img"
              image={herooimg}
              alt="Bonfire gathering"
              sx={{ width: '100vw', height: 'auto', borderRadius: 0 }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3" fontWeight="normal" color="black">
                GEAR UP FOR GREAT OUTDOORS®
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Collapse,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

import { useState } from 'react';

const Tours = () => {
  const [tentType, setTentType] = useState('original');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          SHOP COLLECTION
        </Typography>

        <IconButton sx={{ border: '1px solid black' }} onClick={() => setShowFilters(!showFilters)}>
          <FilterList />
        </IconButton>

        {/* Tent Type Tabs */}
        <ToggleButtonGroup
          value={tentType}
          exclusive
          onChange={(e, value) => setTentType(value)}
          sx={{ mb: 4 }}
        >
          <ToggleButton value="original" sx={{ borderRadius: '24px', mx: 0.5 }}>
            Original Tent
          </ToggleButton>
          <ToggleButton value="oneTouch" sx={{ borderRadius: '24px', mx: 0.5 }}>
            One Touch Tent
          </ToggleButton>
          <ToggleButton value="onePole" sx={{ borderRadius: '24px', mx: 0.5 }}>
            One Pole Text
          </ToggleButton>
          <ToggleButton value="shelter" sx={{ borderRadius: '24px', mx: 0.5 }}>
            Shelter Tent
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Filters Grid with Collapse */}
        <Collapse in={showFilters}>
          <Grid container spacing={4}>
            {/* Color Section */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Color
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>
                {[
                  '#2F4F4F',
                  '#3A5F5F',
                  '#8B9A8B',
                  '#F4E7BE',
                  '#DAA520',
                  '#FFF5E1',
                  '#B0C4DE',
                  '#4682B4',
                  '#000080',
                  '#FF6347',
                  '#FFB6C1',
                  '#DEB887',
                  '#556B2F',
                  '#000000',
                ].map((color) => (
                  <Button
                    key={color}
                    sx={{
                      minWidth: 'unset',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: color,
                      '&:hover': { backgroundColor: color },
                    }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Material Section */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Material
              </Typography>
              <FormControl component="fieldset">
                {['Alpaca', 'Cashmere', 'Cotton', 'Hemp', 'Moher', 'Polyester', 'Wool'].map(
                  (material) => (
                    <FormControlLabel key={material} control={<Checkbox />} label={material} />
                  )
                )}
              </FormControl>
            </Grid>

            {/* Size Section */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Size
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup>
                  {['1 ~ 2 Person', '3 ~ 6 Person', '7 ~ 10 Person'].map((size) => (
                    <FormControlLabel key={size} value={size} control={<Radio />} label={size} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Sorting Section */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sorting
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup>
                  {[
                    'From latest to oldest',
                    'From oldest to lasted',
                    'Price from high to low',
                    'Price from low to high',
                  ].map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              sx={{ borderRadius: '25px', py: 1, px: 4, color: 'black', border: '1px solid' }}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: '24px',
                py: 1,
                px: 4,
                color: 'white',
                border: '1px solid',
                backgroundColor: 'black',
              }}
            >
              Apply
            </Button>
          </Box>
        </Collapse>
      </Box>
    </Container>
  );
};

export default Tours;

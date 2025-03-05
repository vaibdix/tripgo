import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Container } from '@mui/material';

const CampForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Camp Information */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="campName"
              control={control}
              placeholder="Misty Ridge Cottage"
              rules={{ required: 'Camp Name is required' }}
              render={({ field }) => <TextField {...field} label="Camp Name" fullWidth error={!!errors.campName} helperText={errors.campName?.message} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="type"
              control={control}
              placeholder="Deluxe Villa"
              rules={{ required: 'Type is required' }}
              render={({ field }) => <TextField {...field} label="Type" fullWidth error={!!errors.type} helperText={errors.type?.message} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="suitableFor"
              control={control}
              placeholder="Fits 2 Adults"
              rules={{ required: 'Suitable For is required' }}
              render={({ field }) => <TextField {...field} label="Suitable For" fullWidth error={!!errors.suitableFor} helperText={errors.suitableFor?.message} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="freeServices"
              control={control}
              placeholder="Free Parking"
              render={({ field }) => <TextField {...field} label="Free Services" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="refundPolicy"
              control={control}
              placeholder="Partially Refundable"
              render={({ field }) => <TextField {...field} label="Refund Policy" fullWidth />}
            />
          </Grid>

          {/* Prices */}
          <Grid item xs={12} md={6}>
            <Controller
              name="actualPrice"
              control={control}
              placeholder={19280}
              rules={{ required: 'Actual Price is required', min: { value: 1, message: 'Price must be greater than 0' } }}
              render={({ field }) => <TextField {...field} label="Actual Price" fullWidth type="number" error={!!errors.actualPrice} helperText={errors.actualPrice?.message} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="priceAfterDiscount"
              control={control}
              placeholder={15113}
              rules={{ required: 'Price After Discount is required', min: { value: 1, message: 'Price must be greater than 0' } }}
              render={({ field }) => <TextField {...field} label="Price After Discount" fullWidth type="number" error={!!errors.priceAfterDiscount} helperText={errors.priceAfterDiscount?.message} />}
            />
          </Grid>

          {/* Rooms */}
          <Grid item xs={12} md={6}>
            <Controller
              name="roomType"
              control={control}
              placeholder="1 Bedroom"
              render={({ field }) => <TextField {...field} label="Room Type" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="beds"
              control={control}
              placeholder="1 Double Bed"
              render={({ field }) => <TextField {...field} label="Beds" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="capacity"
              control={control}
              placeholder="sleeps 2 guests"
              render={({ field }) => <TextField {...field} label="Capacity" fullWidth />}
            />
          </Grid>

          {/* About */}
          <Grid item xs={12} md={12}>
            <Controller
              name="about"
              control={control}
              placeholder="Misty Ridge Cottage offers a luxurious retreat amidst natural surroundings, perfect for relaxation and enjoying the scenic beauty of Pune."
              rules={{ required: 'About section is required' }}
              render={({ field }) => <TextField {...field} label="About" fullWidth multiline rows={4} error={!!errors.about} helperText={errors.about?.message} />}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              name="imageUrl"
              control={control}
              placeholder="https://www.hireacamp.com/api/external/image?name=uploads/1e133e0fef5e4ce6b33d4e16a1a0ec0e.jpeg&size=2048x2048&q=75"
              render={({ field }) => <TextField {...field} label="Images (URL)" fullWidth />}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12} md={6}>
            <Controller
              name="landmark"
              control={control}
              placeholder="Landmark near Misty Ridge Cottage"
              render={({ field }) => <TextField {...field} label="Landmark" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="village"
              control={control}
              placeholder="Pawna Nagar"
              render={({ field }) => <TextField {...field} label="Village" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="tal"
              control={control}
              placeholder="Maval"
              render={({ field }) => <TextField {...field} label="Tal" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="district"
              control={control}
              placeholder="Pune"
              render={({ field }) => <TextField {...field} label="District" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="locationUrl"
              control={control}
              placeholder="https://maps.app.goo.gl/Spot100Location"
              render={({ field }) => <TextField {...field} label="Location (URL)" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              name="mapEmbedCode"
              control={control}
              placeholder="<iframe src='https://www.google.com/maps/embed?pb=...' width='600' height='450' style='border:0;'></iframe>"
              render={({ field }) => <TextField {...field} label="Map Embed Code" fullWidth multiline rows={4} />}
            />
          </Grid>

          {/* Amenities */}
          <Grid item xs={12} md={6}>
            <Controller
              name="amenities"
              control={control}
              placeholder="Bonfire, Garden, Restaurant, Swimming Pool, Caretaker"
              render={({ field }) => <TextField {...field} label="Amenities" fullWidth />}
            />
          </Grid>

          {/* Meals Offered */}
          <Grid item xs={12} md={6}>
            <Controller
              name="mealsOffered"
              control={control}
              placeholder="Dinner, Breakfast"
              render={({ field }) => <TextField {...field} label="Meals Offered" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="veg"
              control={control}
              placeholder="true"
              render={({ field }) => <TextField {...field} label="Veg" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="nonVeg"
              control={control}
              placeholder="true"
              render={({ field }) => <TextField {...field} label="Non-Veg" fullWidth />}
            />
          </Grid>

          {/* Ratings */}
          <Grid item xs={12} md={6}>
            <Controller
              name="locationRating"
              control={control}
              placeholder={4.1}
              rules={{ required: 'Location Rating is required', min: { value: 0, message: 'Rating must be between 0 and 5' }, max: { value: 5, message: 'Rating must be between 0 and 5' } }}
              render={({ field }) => <TextField {...field} label="Location Rating" fullWidth type="number" error={!!errors.locationRating} helperText={errors.locationRating?.message} />}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CampForm;

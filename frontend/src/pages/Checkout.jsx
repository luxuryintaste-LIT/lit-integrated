import React, { useState } from 'react';
import {
  Container, Grid, Paper, Typography, Box, TextField, Button, Divider,
  List, ListItem, ListItemText, ListItemAvatar, Avatar, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Stepper, Step, StepLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// ✅ Import the new CSS file
import '../styles/Checkout.css';

// Remove the `styled` import and the StyledPaper const, we are using external CSS now.

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const coupon = useSelector((state) => state.cart.coupon);
  const discount = useSelector((state) => state.cart.discount);
  const couponApplied = useSelector((state) => state.cart.couponApplied);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', state: '', zipCode: '', country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const TAX_RATE = 0.18; // 18% GST

  const handleShippingSubmit = (e) => { e.preventDefault(); setActiveStep(1); };
  const handlePaymentSubmit = (e) => { e.preventDefault(); setActiveStep(2); };
  const handlePlaceOrder = () => { navigate('/order-confirmation'); };

  const calculateSubtotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateTax = () => Math.round(calculateSubtotal() * TAX_RATE);
  const calculateShipping = () => 99; // ₹99 shipping cost
  const calculateTotal = () => calculateSubtotal() + calculateShipping() + calculateTax() - discount;

  const renderShippingForm = () => (
    // ✅ Apply a class to the form for styling inputs
    <form onSubmit={handleShippingSubmit} className="checkout-form">
      <Grid container spacing={2}>
        {/* All TextFields are inside the checkout-form, so they will be styled */}
        <Grid item xs={12} sm={6}> <TextField required fullWidth label="First Name" value={shippingInfo.firstName} onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })} /> </Grid>
        <Grid item xs={12} sm={6}> <TextField required fullWidth label="Last Name" value={shippingInfo.lastName} onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })} /> </Grid>
        <Grid item xs={12}> <TextField required fullWidth label="Email" type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} /> </Grid>
        <Grid item xs={12}> <TextField required fullWidth label="Address" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} /> </Grid>
        <Grid item xs={12} sm={6}> <TextField required fullWidth label="City" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} /> </Grid>
        <Grid item xs={12} sm={6}> <TextField required fullWidth label="State" value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} /> </Grid>
        <Grid item xs={12} sm={6}> <TextField required fullWidth label="ZIP Code" value={shippingInfo.zipCode} onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })} /> </Grid>
        <Grid item xs={12} sm={6}> <TextField required fullWidth label="Country" value={shippingInfo.country} onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })} /> </Grid>
      </Grid>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} className="checkout-button">
        Continue to Payment
      </Button>
    </form>
  );

  const renderPaymentForm = () => (
    // ✅ Apply classes for styling
    <form onSubmit={handlePaymentSubmit} className="payment-form checkout-form">
      <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
        </RadioGroup>
      </FormControl>
      {paymentMethod === 'credit' && (
        <Grid container spacing={2}>
          <Grid item xs={12}> <TextField required fullWidth label="Card Number" /> </Grid>
          <Grid item xs={12} sm={6}> <TextField required fullWidth label="Expiry Date" placeholder="MM/YY" /> </Grid>
          <Grid item xs={12} sm={6}> <TextField required fullWidth label="CVV" /> </Grid>
        </Grid>
      )}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} className="checkout-button">
        Review Order
      </Button>
    </form>
  );

  const renderOrderReview = () => (
    // ✅ Apply class for styling
    <Box className="order-summary-card">
      <Typography variant="h6" gutterBottom>Order Summary</Typography>
      <List sx={{p: 0}}>
        {cart.map((item) => (
          <ListItem key={item.id} disableGutters>
            <ListItemAvatar> <Avatar alt={item.name} src={item.image} /> </ListItemAvatar>
            <ListItemText primary={item.name} secondary={`Size: ${item.size} | Color: ${item.color}`} />
            <Typography variant="body2">₹{item.price * item.quantity}</Typography>
          </ListItem>
        ))}
      </List>
      <Divider className="checkout-divider" sx={{ my: 2 }} />
      <Box className="price-row"> <Typography>Subtotal</Typography> <Typography>₹{calculateSubtotal()}</Typography> </Box>
      <Box className="price-row"> <Typography>Shipping</Typography> <Typography>₹{calculateShipping()}</Typography> </Box>
      <Box className="price-row"> <Typography>Tax (18%)</Typography> <Typography>₹{calculateTax()}</Typography> </Box>
      {couponApplied && discount > 0 && (
        <Box className="price-row price-row-savings">
          <Typography color="inherit">Coupon Applied{coupon ? ` (${coupon})` : ''}</Typography>
          <Typography color="inherit">-₹{discount}</Typography>
        </Box>
      )}
      <Box className="price-row-total"> <Typography variant="h6">Total</Typography> <Typography variant="h6">₹{calculateTotal()}</Typography> </Box>
      <Button variant="contained" fullWidth onClick={handlePlaceOrder} className="checkout-button" sx={{ mt: 2 }}>
        Place Order
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ✅ Apply a class to the Stepper */}
      <Stepper activeStep={activeStep} className="checkout-stepper" sx={{ mb: 4 }}>
        {steps.map((label) => ( <Step key={label}> <StepLabel>{label}</StepLabel> </Step> ))}
      </Stepper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* ✅ Use Paper component with the glass-card class */}
          <Paper className="glass-card">
            {activeStep === 0 && renderShippingForm()}
            {activeStep === 1 && renderPaymentForm()}
            {activeStep === 2 && renderOrderReview()}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* ✅ Use Paper component with the glass-card and order-summary-card classes */}
          <Paper className="glass-card order-summary-card">
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List sx={{p: 0}}>
              {cart.map((item) => (
                <ListItem key={item.id} disableGutters>
                  <ListItemText primary={item.name} secondary={`Qty: ${item.quantity}`} />
                  <Typography variant="body2">₹{item.price * item.quantity}</Typography>
                </ListItem>
              ))}
            </List>
            <Divider className="checkout-divider" sx={{ my: 2 }} />
            <Box className="price-row"> <Typography>Subtotal</Typography> <Typography>₹{calculateSubtotal()}</Typography> </Box>
            <Box className="price-row"> <Typography>Shipping</Typography> <Typography>₹{calculateShipping()}</Typography> </Box>
            <Box className="price-row"> <Typography>Tax (18%)</Typography> <Typography>₹{calculateTax()}</Typography> </Box>
            {couponApplied && discount > 0 && (
              <Box className="price-row price-row-savings">
                <Typography color="inherit">Coupon Applied{coupon ? ` (${coupon})` : ''}</Typography>
                <Typography color="inherit">-₹{discount}</Typography>
              </Box>
            )}
            <Box className="price-row-total"> <Typography variant="h6">Total</Typography> <Typography variant="h6">₹{calculateTotal()}</Typography> </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
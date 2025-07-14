import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const steps = ['Shipping', 'Payment', 'Review'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#1a1a1a',
  color: '#FFFFFF',
  border: '1px solid #333333',
}));

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const coupon = useSelector((state) => state.cart.coupon);
  const discount = useSelector((state) => state.cart.discount);
  const couponApplied = useSelector((state) => state.cart.couponApplied);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const TAX_RATE = 0.18; // 18% GST

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setActiveStep(1);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    navigate('/order-confirmation');
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * TAX_RATE);
  };

  const calculateShipping = () => {
    return 99; // ₹99 shipping cost
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax() - discount;
  };

  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            value={shippingInfo.firstName}
            onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            value={shippingInfo.lastName}
            onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Address"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="City"
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="State"
            value={shippingInfo.state}
            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="ZIP Code"
            value={shippingInfo.zipCode}
            onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Country"
            value={shippingInfo.country}
            onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: '#9333ea',
          '&:hover': { backgroundColor: '#7c2cb4' },
        }}
      >
        Continue to Payment
      </Button>
    </form>
  );

  const renderPaymentForm = () => (
    <form onSubmit={handlePaymentSubmit}>
      <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
        <FormLabel component="legend" sx={{ color: '#FFFFFF' }}>Payment Method</FormLabel>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value="credit"
            control={<Radio />}
            label="Credit Card"
            sx={{ color: '#FFFFFF' }}
          />
          <FormControlLabel
            value="paypal"
            control={<Radio />}
            label="PayPal"
            sx={{ color: '#FFFFFF' }}
          />
        </RadioGroup>
      </FormControl>
      {paymentMethod === 'credit' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Card Number"
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Expiry Date"
              placeholder="MM/YY"
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: '#FFFFFF' } }}
            />
          </Grid>
        </Grid>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: '#9333ea',
          '&:hover': { backgroundColor: '#7c2cb4' },
        }}
      >
        Review Order
      </Button>
    </form>
  );

  const renderOrderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
        Order Summary
      </Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <ListItemAvatar>
              <Avatar alt={item.name} src={item.image} />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={`Size: ${item.size} | Color: ${item.color}`}
              sx={{ color: '#FFFFFF' }}
            />
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
              ₹{item.price * item.quantity}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2, borderColor: '#333333' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ color: '#FFFFFF' }}>Subtotal</Typography>
        <Typography sx={{ color: '#FFFFFF' }}>₹{calculateSubtotal()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ color: '#FFFFFF' }}>Shipping</Typography>
        <Typography sx={{ color: '#FFFFFF' }}>₹{calculateShipping()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ color: '#FFFFFF' }}>Tax (18%)</Typography>
        <Typography sx={{ color: '#FFFFFF' }}>₹{calculateTax()}</Typography>
      </Box>
      {couponApplied && discount > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ color: '#4caf50' }}>Coupon Applied{coupon ? ` (${coupon})` : ''}</Typography>
          <Typography sx={{ color: '#4caf50' }}>-₹{discount}</Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Total</Typography>
        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>₹{calculateTotal()}</Typography>
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={handlePlaceOrder}
        sx={{
          backgroundColor: '#9333ea',
          '&:hover': { backgroundColor: '#7c2cb4' },
        }}
      >
        Place Order
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4, '& .MuiStepLabel-label': { color: '#FFFFFF' } }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            {activeStep === 0 && renderShippingForm()}
            {activeStep === 1 && renderPaymentForm()}
            {activeStep === 2 && renderOrderReview()}
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
              Order Summary
            </Typography>
            <List>
              {cart.map((item) => (
                <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Qty: ${item.quantity}`}
                    sx={{ color: '#FFFFFF' }}
                  />
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    ₹{item.price * item.quantity}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2, borderColor: '#333333' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ color: '#FFFFFF' }}>Subtotal</Typography>
              <Typography sx={{ color: '#FFFFFF' }}>₹{calculateSubtotal()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ color: '#FFFFFF' }}>Shipping</Typography>
              <Typography sx={{ color: '#FFFFFF' }}>₹{calculateShipping()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ color: '#FFFFFF' }}>Tax (18%)</Typography>
              <Typography sx={{ color: '#FFFFFF' }}>₹{calculateTax()}</Typography>
            </Box>
            {couponApplied && discount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: '#4caf50' }}>Coupon Applied{coupon ? ` (${coupon})` : ''}</Typography>
                <Typography sx={{ color: '#4caf50' }}>-₹{discount}</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Total</Typography>
              <Typography variant="h6" sx={{ color: '#FFFFFF' }}>₹{calculateTotal()}</Typography>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout; 
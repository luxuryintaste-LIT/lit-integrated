import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#1a1a1a',
  color: '#FFFFFF',
  border: '1px solid #333333',
  textAlign: 'center',
}));

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0) + 10; // Adding shipping
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <StyledPaper>
        <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
        <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF', mb: 2 }}>
          Order Confirmed!
        </Typography>
        <Typography variant="body1" sx={{ color: '#CCCCCC', mb: 4 }}>
          Thank you for your purchase. Your order has been received and is being processed.
        </Typography>
        <Divider sx={{ my: 4, bgcolor: '#333333' }} />
        <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'left' }}>
          Order Details
        </Typography>
        <List>
          {cart.map((item) => (
            <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
              <ListItemAvatar>
                <Avatar src={item.image} alt={item.name} />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`Size: ${item.size} | Color: ${item.color} | Quantity: ${item.quantity}`}
                sx={{ color: '#FFFFFF' }}
              />
              <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                ${item.price * item.quantity}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2, bgcolor: '#333333' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ color: '#FFFFFF' }}>Shipping</Typography>
          <Typography sx={{ color: '#FFFFFF' }}>$10.00</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Total</Typography>
          <Typography variant="h6" sx={{ color: '#FFFFFF' }}>${calculateTotal()}</Typography>
        </Box>
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/shop')}
            sx={{
              borderColor: '#9333ea',
              color: '#9333ea',
              '&:hover': {
                borderColor: '#7c2cb4',
                backgroundColor: 'rgba(147, 51, 234, 0.1)',
              },
            }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/orders')}
            sx={{
              backgroundColor: '#9333ea',
              '&:hover': { backgroundColor: '#7c2cb4' },
            }}
          >
            View Orders
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default OrderConfirmation; 
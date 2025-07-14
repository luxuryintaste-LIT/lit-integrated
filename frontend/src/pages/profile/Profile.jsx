import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar, Button, Divider } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const Profile = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: { xs: '#121212', md: 'background.default' } 
    }}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            My Profile
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                JD
              </Avatar>
              <Typography variant="h5" gutterBottom>
                John Doe
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                john.doe@example.com
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Account Information
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1">John Doe</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">john.doe@example.com</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">+1 (555) 123-4567</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography variant="body1">January 2024</Typography>
                </Grid>
              </Grid>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Shipping Address
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" paragraph>
                123 Main Street
                <br />
                Apt 4B
                <br />
                New York, NY 10001
                <br />
                United States
              </Typography>
              <Button variant="outlined" startIcon={<EditIcon />}>
                Edit Address
              </Button>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Recent Orders
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No recent orders
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile; 
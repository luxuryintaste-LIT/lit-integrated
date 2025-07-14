import React from 'react';
import { Container, Typography, Box, Grid, TextField, Button, Paper } from '@mui/material';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
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
            Contact Us
          </Typography>
          <Typography variant="h5" paragraph>
            We'd love to hear from you
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" paragraph>
                Have questions about our products or services? We're here to help!
                Fill out the form and we'll get back to you as soon as possible.
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      autoComplete="given-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Message"
                      name="message"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Address
                </Typography>
                <Typography variant="body1" paragraph>
                  123 Gaming Street
                  <br />
                  Luxury City, LC 12345
                  <br />
                  United States
                </Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1" paragraph>
                  support@luxuryintaste.com
                </Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Phone
                </Typography>
                <Typography variant="body1" paragraph>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Business Hours
                </Typography>
                <Typography variant="body1" paragraph>
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact; 
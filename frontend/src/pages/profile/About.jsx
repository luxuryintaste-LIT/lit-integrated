import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const About = () => {
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
            About LIT
          </Typography>
          <Typography variant="h5" paragraph>
            Luxury in Gaming, Excellence in Experience
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              LIT was founded with a vision to revolutionize the gaming industry by
              combining luxury aesthetics with cutting-edge technology. We believe
              that gaming should be an immersive experience that engages all your
              senses.
            </Typography>
            <Typography variant="body1" paragraph>
              Our team of passionate gamers and designers work tirelessly to create
              products and experiences that exceed expectations and set new
              standards in the industry.
            </Typography>
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
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                To provide gamers with premium products and experiences that
                enhance their gaming journey while maintaining the highest
                standards of quality and innovation.
              </Typography>
              <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Our Values
              </Typography>
              <Typography variant="body1" component="div">
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li>Excellence in every detail</li>
                  <li>Innovation through technology</li>
                  <li>Customer satisfaction</li>
                  <li>Community engagement</li>
                  <li>Sustainable practices</li>
                </ul>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About; 
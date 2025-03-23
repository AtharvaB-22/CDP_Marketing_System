// src/pages/DashboardPage.js
import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
// src/pages/DashboardPage.jsx
import Chatbot from '../components/Chatbot';

const DashboardPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customer Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Policy Information</Typography>
              {/* Add policy data here */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Support Tickets</Typography>
              {/* Add support ticket data here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom>
        Customer Dashboard
      </Typography>
      <Chatbot />
    </Container>
  );
};

export default DashboardPage;
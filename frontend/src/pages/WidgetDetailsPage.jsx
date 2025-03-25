// src/pages/WidgetDetailsPage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const WidgetDetailsPage = () => {
  const { state } = useLocation();
  const { widget } = state;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{widget.title} Details</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {widget.content}
      </Typography>
    </Box>
  );
};

export default WidgetDetailsPage;

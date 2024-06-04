// Error.tsx:

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Error: React.FC = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          An unexpected error has occurred
        </Typography>
        <Typography variant="body1">
          Please try refreshing the page, or contact support if the problem persists.
        </Typography>
      </Box>
    </Container>
  );
}

export default Error;
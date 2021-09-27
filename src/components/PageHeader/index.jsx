import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const PageHeader = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        padding: theme.spacing(4, 0, 2),
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          {subtitle}
        </Typography>
      </Container>
    </Box>
  );
};

export default PageHeader;

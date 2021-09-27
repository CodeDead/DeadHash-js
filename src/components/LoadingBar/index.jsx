import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingBar = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
  }}
  >
    <CircularProgress />
  </div>
);

export default LoadingBar;

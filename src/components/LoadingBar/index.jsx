import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

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

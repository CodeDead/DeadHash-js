import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GridList from '../GridList';
import Hash from '../Hash';

const HashList = ({
  outputLabel, hashes, marginTop, copyLabel, compareHash,
}) => (
  <Box style={{ marginTop }}>
    <Typography component="h2" variant="h5" color="primary" gutterBottom>
      {outputLabel}
    </Typography>
    <GridList md={12} lg={12} xs={12} spacing={2}>
      {hashes.map((e, i) => (
        <Hash
          id={i}
          key={e.hash}
          content={e.hash}
          hashType={e.type}
          copy={copyLabel}
          compareString={compareHash}
        />
      ))}
    </GridList>
  </Box>
);

export default HashList;

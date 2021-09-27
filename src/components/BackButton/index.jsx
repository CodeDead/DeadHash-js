import React from 'react';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const BackButton = ({ goBack }) => {
  /**
   * Call the goBack event
   * @param e The event argument
   */
  const back = (e) => {
    if (e) e.preventDefault();
    if (goBack) goBack();
  };

  return (
    <Button color="primary" onClick={back}>
      <ArrowLeftIcon />
    </Button>
  );
};

export default BackButton;

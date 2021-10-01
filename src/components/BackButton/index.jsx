import React from 'react';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();
  /**
   * Call the goBack event
   * @param e The event argument
   */
  const back = (e) => {
    if (e) e.preventDefault();
    history.goBack();
  };

  return (
    <Button
      onClick={back}
      size="small"
    >
      <ArrowLeftIcon />
    </Button>
  );
};

export default BackButton;

import React from 'react';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  /**
   * Call the goBack event
   * @param e The event argument
   */
  const back = (e) => {
    if (e) e.preventDefault();
    navigate(-1);
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

import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

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

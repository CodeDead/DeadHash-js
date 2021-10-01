import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmationDialog = ({
  open, title, content, onAccept, onCancel, onClose, yes, no,
}) => {
  /**
   * Close the AlertDialog instance
   */
  const handleClose = () => {
    if (onClose) onClose();
  };

  /**
   * Accept the confirmation
   */
  const accept = () => {
    if (onAccept) onAccept();
    handleClose();
  };

  /**
   * Cancel the confirmation
   */
  const cancel = () => {
    if (onCancel) onCancel();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>
          {no}
        </Button>
        <Button onClick={accept} autoFocus>
          {yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

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
        <Button onClick={cancel} color="primary">
          {no}
        </Button>
        <Button onClick={accept} color="primary" autoFocus>
          {yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

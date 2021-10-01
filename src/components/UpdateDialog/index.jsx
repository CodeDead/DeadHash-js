import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const UpdateDialog = ({
  downloadUrl, infoUrl, newVersion, updateAvailable, newVersionText, information, download, cancel,
}) => {
  const [open, setOpen] = useState(true);

  /**
   * Close the UpdateDialog instance
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Open the information page
   */
  const openInformation = () => {
    window.open(infoUrl, '_blank');
  };

  /**
   * Open the download page
   */
  const openDownload = () => {
    window.open(downloadUrl, '_blank');
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{updateAvailable}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {newVersionText.replace('{x}', newVersion)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {cancel}
        </Button>
        <Button onClick={openInformation}>
          {information}
        </Button>
        <Button onClick={openDownload} autoFocus>
          {download}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;

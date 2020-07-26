import React, {useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

const UpdateDialog = ({downloadUrl, infoUrl, newVersion, updateAvailable, newVersionText, information, download, cancel}) => {

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
                    {newVersionText.replace("{x}", newVersion)}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    {cancel}
                </Button>
                <Button onClick={() => openInformation()} color="primary">
                    {information}
                </Button>
                <Button onClick={openDownload} color="primary" autoFocus>
                    {download}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateDialog;

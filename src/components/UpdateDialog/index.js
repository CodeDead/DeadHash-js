import React, {useState} from "react";
import {useSelector} from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

const UpdateDialog = ({downloadUrl, infoUrl, newVersion}) => {

    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
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
            <DialogTitle id="alert-dialog-title">{language.updateAvailable}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {language.newVersion.replace("{x}", newVersion)}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    {language.cancel}
                </Button>
                <Button onClick={() => openInformation()} color="primary">
                    {language.information}
                </Button>
                <Button onClick={openDownload} color="primary" autoFocus>
                    {language.download}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateDialog;

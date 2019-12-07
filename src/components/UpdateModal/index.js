import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    modal: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(1)
    }
}));

const UpdateModal = ({downloadUrl, infoUrl, newVersion}) => {

    const classes = useStyles();
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const openInformation = () => {
        window.open(infoUrl, '_blank');
    };

    const openDownload = () => {
        window.open(downloadUrl, '_blank');
        handleClose();
    };

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <div className={classes.modal}>
                <h2 id="simple-modal-title">{language.updateAvailable}</h2>
                <p id="simple-modal-description">
                    {language.newVersion.replace("{x}", newVersion)}
                </p>
                <div>
                    <Button className={classes.button} onClick={() => openInformation()}>
                        {language.information}
                    </Button>
                    <Button className={classes.button} variant={'contained'} color={'primary'} style={{float: 'right'}}
                            onClick={() => openDownload()}>
                        {language.download}
                    </Button>
                    <Button className={classes.button} variant={'contained'} color={'primary'} style={{float: 'right'}}
                            onClick={() => handleClose()}>
                        {language.cancel}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateModal;

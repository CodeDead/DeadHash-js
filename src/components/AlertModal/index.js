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
    }
}));

const AlertModal = ({title, content}) => {

    const classes = useStyles();
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const [open, setOpen] = React.useState(true);

    /**
     * Handle the closing of the alert modal
     */
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <div className={classes.modal}>
                <h2 id="simple-modal-title">{title}</h2>
                <p id="simple-modal-description">
                    {content}
                </p>
                <Button variant={'contained'} color={'primary'} onClick={() => handleClose()}>
                    {language.ok}
                </Button>
            </div>
        </Modal>
    );
};

export default AlertModal;

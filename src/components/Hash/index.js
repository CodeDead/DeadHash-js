import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
}));

const Hash = ({hashType, content, compareString}) => {

    const classes = useStyles();

    const compareIcon = compareString && compareString === content ? (
        <CheckIcon color={"inherit"} style={{float: 'right'}} />
    ) : null;

    return (
        <Paper className={classes.paper}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
                {hashType}{compareIcon}
            </Typography>
            <span>{content}</span>

        </Paper>
    )
};

export default Hash;

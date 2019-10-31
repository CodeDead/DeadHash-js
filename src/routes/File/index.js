import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4, 0, 2),
    }
}));

const File = () => {

    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch({type: 'SET_ACTIVE_LISTITEM', index: 1});
    }, []);

    return(
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                        {language.file}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        {language.fileSubtitle}
                    </Typography>
                </Container>
            </div>
        </div>
    );
};

export default File;
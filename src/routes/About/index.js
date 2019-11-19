import React, {useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    heroContent: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4, 0, 2),
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
}));

const About = () => {

    const classes = useStyles();
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'SET_ACTIVE_LISTITEM', index: 5});
    }, []);

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                        {language.about}
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        {language.aboutSubtitle}
                    </Typography>
                </Container>
            </div>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={classes.paper}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    <FavoriteIcon style={{color: 'red'}}/> {language.appName} - {language.about}
                                </Typography>
                                <div style={{whiteSpace: 'pre-wrap'}}>
                                    <p>
                                        {language.aboutMessage}
                                    </p>
                                </div>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Button target={"_blank"}
                                                style={{width: '100%'}}
                                                href={"http://codedead.com/Software/DeadHash/gpl.pdf"}
                                                color={"primary"} variant={"contained"}>
                                            {language.license}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Button target={"_blank"}
                                                style={{width: '100%'}}
                                                href={"http://codedead.com"}
                                                color={"primary"} variant={"contained"}>
                                            {language.codedead}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default About;

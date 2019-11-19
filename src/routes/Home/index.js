import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {useHistory} from "react-router";
import blank from "../../components/Theme/blank.png";
import axios from "axios";
import UpdateModal from "../../components/UpdateModal";
import ErrorModal from "../../components/ErrorModal";

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4, 0, 2),
    },
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    }
}));

const os = window.require('os');

const Home = () => {

    const autoUpdate = useSelector(state => state.MainReducer.autoUpdate);
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const updateChecked = useSelector(state => state.MainReducer.checkedForUpdates);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        dispatch({type: 'SET_ACTIVE_LISTITEM', index: 0});
        if (autoUpdate && !updateChecked) {
            checkForUpdates();
        }
    }, []);

    function checkForUpdates() {
        if (loading) return;

        setLoading(true);
        setErrorMessage(null);

        if (!updateChecked) {
            dispatch({type: 'SET_UPDATE_CHECKED', payload: true});
        }

        axios.get("https://codedead.com/Software/DeadHash/version.json")
            .then(res => {
                const platform = res.data.platforms[os.platform];
                console.log(platform);
            })
            .catch(err => {
                setErrorMessage(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function openFileHasher() {
        history.push("/file");
    }

    function openTextHasher() {
        history.push("/text");
    }

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                        {language.cryptography}
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        {language.cryptographySubtitle}
                    </Typography>
                </Container>
            </div>
            <main className={classes.content}>
                {updateAvailable ? (<UpdateModal/>) : null}
                {errorMessage && errorMessage.length > 0 ? (<ErrorModal content={errorMessage}/>) : null}
                <Container className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card>
                                <CardActionArea onClick={() => openFileHasher()}>
                                    <CardMedia
                                        title={language.file}
                                        image={blank}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {language.file}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {language.fileSubtitle}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" variant={"contained"}
                                            onClick={() => openFileHasher()}>
                                        {language.select}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card>
                                <CardActionArea onClick={() => openTextHasher()}>
                                    <CardMedia
                                        title={language.file}
                                        image={blank}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {language.text}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {language.textSubtitle}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" variant={"contained"}
                                            onClick={() => openTextHasher()}>
                                        {language.select}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default Home;

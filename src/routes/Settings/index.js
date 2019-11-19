import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GridList from "../../components/GridList";
import Theme from "../../components/Theme";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import lightBlue from "@material-ui/core/colors/lightBlue";
import lightGreen from "@material-ui/core/colors/lightGreen";
import grey from "@material-ui/core/colors/grey";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

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
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const Settings = () => {

    const themeIndex = useSelector(state => state.MainReducer.themeIndex);
    const languageIndex = useSelector(state => state.MainReducer.languageIndex);
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const autoUpdate = useSelector(state => state.MainReducer.autoUpdate);

    const md5 = useSelector(state => state.CryptoReducer.md5);
    const sha1 = useSelector(state => state.CryptoReducer.sha1);
    const sha224 = useSelector(state => state.CryptoReducer.sha224);
    const sha256 = useSelector(state => state.CryptoReducer.sha256);
    const sha3 = useSelector(state => state.CryptoReducer.sha3);
    const sha384 = useSelector(state => state.CryptoReducer.sha384);
    const sha512 = useSelector(state => state.CryptoReducer.sha512);
    const ripemd160 = useSelector(state => state.CryptoReducer.ripemd160);

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch({type: 'SET_ACTIVE_LISTITEM', index: 3});
    }, []);

    const changeTheme = (index) => {
        dispatch({type: 'SET_THEME_INDEX', payload: index});
    };

    const handleLanguageChange = (e) => {
        dispatch({type: 'SET_LANGUAGEINDEX', index: e.target.value});
    };

    const resetSettings = () => {
        dispatch({type: 'RESET_MAIN_REDUCER'});
        dispatch({type: 'RESET_CRYPTO_REDUCER'});
    };

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                        {language.settings}
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        {language.settingsSubtitle}
                    </Typography>
                </Container>
            </div>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                                {language.general}
                            </Typography>
                            <Paper className={classes.paper}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={autoUpdate}
                                            onChange={(e) => dispatch({type: 'SET_AUTO_UPDATE', payload: e.target.checked})}
                                            value="md5"
                                            color="primary"
                                        />
                                    }
                                    label={language.autoUpdate}
                                />
                                <FormControl>
                                    <InputLabel htmlFor="language-simple">{language.language}</InputLabel>
                                    <Select
                                        value={languageIndex}
                                        onChange={handleLanguageChange}
                                        inputProps={{
                                            name: 'language',
                                            id: 'language-simple',
                                        }}
                                    >
                                        <MenuItem value={0}>Deutsch</MenuItem>
                                        <MenuItem value={1}>English</MenuItem>
                                        <MenuItem value={2}>Français</MenuItem>
                                        <MenuItem value={3}>Italiano</MenuItem>
                                        <MenuItem value={4}>日本語</MenuItem>
                                        <MenuItem value={5}>Nederlands</MenuItem>
                                        <MenuItem value={6}>Pусский</MenuItem>
                                        <MenuItem value={7}>Türkçe</MenuItem>
                                    </Select>
                                </FormControl>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                                {language.cryptography}
                            </Typography>
                            <Paper className={classes.paper}>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={md5}
                                                onChange={(e) => dispatch({type: 'SET_MD5_STATE', payload: e.target.checked})}
                                                value="md5"
                                                color="primary"
                                            />
                                        }
                                        label={language.md5}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sha1}
                                                onChange={(e) => dispatch({type: 'SET_SHA1_STATE', payload: e.target.checked})}
                                                value="sha1"
                                                color="primary"
                                            />
                                        }
                                        label={language.sha1}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sha224}
                                                onChange={(e) => dispatch({type: 'SET_SHA224_STATE', payload: e.target.checked})}
                                                value="sha224"
                                                color="primary"
                                            />
                                        }
                                        label={language.sha224}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sha256}
                                                onChange={(e) => dispatch({type: 'SET_SHA256_STATE', payload: e.target.checked})}
                                                value="sha256"
                                                color="primary"
                                            />
                                        }
                                        label={language.sha256}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sha3}
                                                onChange={(e) => dispatch({type: 'SET_SHA3_STATE', payload: e.target.checked})}
                                                value="sha3"
                                                color="primary"
                                            />
                                        }
                                        label={language.sha3}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sha384}
                                                onChange={(e) => dispatch({type: 'SET_SHA384_STATE', payload: e.target.checked})}
                                                value="sha384"
                                                color="primary"
                                            />
                                        }
                                        label={language.sha384}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sha512}
                                                onChange={(e) => dispatch({type: 'SET_SHA512_STATE', payload: e.target.checked})}
                                                value="sha512"
                                                color="primary"
                                            />
                                        }
                                        label={language.sha512}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={ripemd160}
                                                onChange={(e) => dispatch({type: 'SET_RIPEMD160_STATE', payload: e.target.checked})}
                                                value="ripemd160"
                                                color="primary"
                                            />
                                        }
                                        label={language.ripemd160}
                                    />
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                                {language.theme}
                            </Typography>

                            <GridList spacing={2} xs={12} md={4} lg={3}>
                                <Theme title={language.default} description={language.defaultThemeDescription}
                                       color={blue[500]} selected={themeIndex === 0}
                                       actionText={language.select} onAction={() => changeTheme(0)}/>
                                <Theme title={language.lightBlue} description={language.lightBlueDescription}
                                       color={lightBlue[500]} selected={themeIndex === 1}
                                       actionText={language.select} onAction={() => changeTheme(1)}/>
                                <Theme title={language.red} description={language.redDescription}
                                       color={red[500]} selected={themeIndex === 2}
                                       actionText={language.select} onAction={() => changeTheme(2)}/>
                                <Theme title={language.green} description={language.greenDescription}
                                       color={green[500]} selected={themeIndex === 3}
                                       actionText={language.select} onAction={() => changeTheme(3)}/>
                                <Theme title={language.lightGreen} description={language.lightGreenDescription}
                                       color={lightGreen[500]} selected={themeIndex === 4}
                                       actionText={language.select} onAction={() => changeTheme(4)}/>
                                <Theme title={language.purple} description={language.purpleDescription}
                                       color={purple[500]} selected={themeIndex === 5}
                                       actionText={language.select} onAction={() => changeTheme(5)}/>
                                <Theme title={language.deepPurple} description={language.deepPurpleDescription}
                                       color={deepPurple[500]} selected={themeIndex === 6}
                                       actionText={language.select} onAction={() => changeTheme(6)}/>
                                <Theme title={language.grey} description={language.greyDescription}
                                       color={grey[500]} selected={themeIndex === 7}
                                       actionText={language.select} onAction={() => changeTheme(7)}/>
                            </GridList>
                        </Grid>
                    </Grid>
                    <Button color={"primary"} variant={"contained"} onClick={() => resetSettings()} className={classes.button} style={{float: 'right'}}>
                        {language.reset}
                    </Button>
                </Container>
            </main>
        </div>
    );
};

export default Settings;

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, makeStyles, Paper, FormControlLabel, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Hash from "../../components/Hash";
import GridList from "../../components/GridList";
import CopyPasteMenu from "../../components/CopyPasteMenu";
import {CryptoCalculator} from "../../utils/CryptoCalculator";

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

const Text = () => {

    const md5 = useSelector(state => state.CryptoReducer.md5);
    const sha1 = useSelector(state => state.CryptoReducer.sha1);
    const sha224 = useSelector(state => state.CryptoReducer.sha224);
    const sha256 = useSelector(state => state.CryptoReducer.sha256);
    const sha3 = useSelector(state => state.CryptoReducer.sha3);
    const sha384 = useSelector(state => state.CryptoReducer.sha384);
    const sha512 = useSelector(state => state.CryptoReducer.sha512);
    const ripemd160 = useSelector(state => state.CryptoReducer.ripemd160);
    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [input, setInput] = useState("");
    const [compare, setCompare] = useState(false);
    const [compareHash, setCompareHash] = useState("");
    const [hashes, setHashes] = useState(null);

    const compareField = compare ? (
        <CopyPasteMenu id={1} copyData={() => navigator.clipboard.writeText(compareHash)}
                       pasteData={() => pasteData(setCompareHash)}>
            <TextField
                id="outlined-basic"
                style={{width: '100%'}}
                margin="normal"
                value={compareHash}
                onChange={(e) => setCompareHash(e.target.value)}
                label={language.compareHash}
                variant="outlined"/>
        </CopyPasteMenu>
    ) : null;

    useEffect(() => {
        dispatch({type: 'SET_ACTIVE_LISTITEM', index: 2});
    }, []);

    const output = hashes && hashes.length > 0 ?
        <>
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                {language.output}
            </Typography>
            <GridList md={12} lg={12} xs={12} spacing={2}>
                {hashes.map((e, i) => {
                    return (
                        <Hash id={i} key={i} content={e.hash} hashType={e.type}
                              compareString={compare ? compareHash : null}/>
                    );
                })}
            </GridList>
        </>
        : null;

    function calculateHashes() {
        if (!input || input.length === 0) return;
        setHashes(null);

        let newHashes = CryptoCalculator(input, md5, sha1, sha224, sha256, sha3, sha384, sha512, ripemd160);

        if (newHashes.length === 0) newHashes = null;
        setHashes(newHashes);
    }

    function pasteData(func) {
        navigator.clipboard.readText()
            .then(text => {
                func(text);
            })
    }

    function clearData() {
        setInput("");
        setCompare(false);
        setCompareHash("");
        setHashes(null);
    }

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                        {language.text}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        {language.textSubtitle}
                    </Typography>
                </Container>
            </div>
            <main className={classes.content}>
                <Container className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                                {language.input}
                            </Typography>
                            <Paper className={classes.paper}>
                                <CopyPasteMenu id={0} copyData={() => navigator.clipboard.writeText(input)}
                                               pasteData={() => pasteData(setInput)}>
                                    <TextField
                                        style={{width: "100%"}}
                                        id="outlined-basic"
                                        margin="normal"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        multiline
                                        rowsMax={6}
                                        variant="outlined"/>
                                </CopyPasteMenu>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={compare}
                                            onChange={(e) => setCompare(e.target.checked)}
                                            value="compare"
                                            color="primary"
                                        />
                                    }
                                    label={language.compare}
                                />
                                {compareField}
                            </Paper>
                            {hashes && hashes.length > 0 ? (
                                <Button className={classes.button} color={"primary"} variant={"contained"}
                                        style={{float: 'left'}} onClick={() => clearData()}>
                                    {language.clear}
                                </Button>
                            ) : null}
                            <Button className={classes.button} color={"primary"} variant={"contained"}
                                    disabled={!input || input.length === 0}
                                    style={{float: 'right'}} onClick={() => calculateHashes()}>
                                {language.calculate}
                            </Button>
                        </Grid>
                    </Grid>
                    {output}
                </Container>
            </main>
        </div>
    );
};

export default Text;

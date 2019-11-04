import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, makeStyles, Paper, FormControlLabel, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import CryptoMd5 from "crypto-js/md5";
import CryptoSha1 from "crypto-js/sha1";
import CryptoSha256 from "crypto-js/sha256";
import CryptoSha384 from "crypto-js/sha384";
import CryptoSha512 from "crypto-js/sha512";
import CryptoRipemd160 from "crypto-js/ripemd160";
import CryptoSha224 from "crypto-js/sha224";
import CryptoSha3 from "crypto-js/sha3";
import Hash from "../../components/Hash";
import GridList from "../../components/GridList";

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
        marginTop: theme.spacing(1)
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
    const [hashes, setHashes] = useState();

    const compareField = compare ? (
        <TextField
            id="outlined-basic"
            margin="normal"
            value={compareHash}
            onChange={(e) => setCompareHash(e.target.value)}
            label={language.compareHash}
            variant="outlined"/>
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
                {hashes.map((e,i) => {
                    return(
                        <Hash id={i} key={i} content={e.hash} hashType={e.type} compareString={compare ? compareHash : null}/>
                    );
                })}
            </GridList>
        </>
     : null;

    function calculateHashes() {
        if (!input || input.length === 0) return;
        let newHashes = [];

        if (md5) {
            newHashes.push({type: "MD5", hash: CryptoMd5(input).toString()});
        }
        if (sha1) {
            newHashes.push({type: "SHA-1", hash: CryptoSha1(input).toString()});
        }
        if (sha224) {
            newHashes.push({type: "SHA-224", hash: CryptoSha224(input).toString()});
        }
        if (sha256) {
            newHashes.push({type: "SHA-256", hash: CryptoSha256(input).toString()});
        }
        if (sha3) {
            newHashes.push({type: "SHA-3", hash: CryptoSha3(input).toString()});
        }
        if (sha384) {
            newHashes.push({type: "SHA-384", hash: CryptoSha384(input).toString()});
        }
        if (sha512) {
            newHashes.push({type: "SHA-512", hash: CryptoSha512(input).toString()});
        }
        if (ripemd160) {
            newHashes.push({type: "RIPEMD-160", hash: CryptoRipemd160(input).toString()});
        }

        if (newHashes.length === 0) newHashes = null;
        setHashes(newHashes);
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
                                <TextField
                                    id="outlined-basic"
                                    margin="normal"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    multiline
                                    rowsMax={6}
                                    variant="outlined"/>

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

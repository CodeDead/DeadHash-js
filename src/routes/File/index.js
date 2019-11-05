import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, FormControlLabel, makeStyles, Paper} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import GridList from "../../components/GridList";
import Hash from "../../components/Hash";
import CopyPasteMenu from "../../components/CopyPasteMenu";
import TextField from "@material-ui/core/TextField";
import CryptoJs from "crypto-js/crypto-js";
import {FileDataReader} from "../../utils/FileDataReader";
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
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const File = () => {

    const language = useSelector(state => state.MainReducer.languages[state.MainReducer.languageIndex]);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [file, setFile] = useState(null);
    const [compare, setCompare] = useState(false);
    const [compareHash, setCompareHash] = useState("");
    const [hashes, setHashes] = useState(null);

    const md5 = useSelector(state => state.CryptoReducer.md5);
    const sha1 = useSelector(state => state.CryptoReducer.sha1);
    const sha224 = useSelector(state => state.CryptoReducer.sha224);
    const sha256 = useSelector(state => state.CryptoReducer.sha256);
    const sha3 = useSelector(state => state.CryptoReducer.sha3);
    const sha384 = useSelector(state => state.CryptoReducer.sha384);
    const sha512 = useSelector(state => state.CryptoReducer.sha512);
    const ripemd160 = useSelector(state => state.CryptoReducer.ripemd160);

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
        dispatch({type: 'SET_ACTIVE_LISTITEM', index: 1});
    }, []);

    const calculateHashes = async () => {
        if (!file || file.length === 0) return;
        setHashes(null);

        const data = await FileDataReader(file);
        if (!data || data.length === 0) return;

        const encoded = CryptoJs.enc.Latin1.parse(data);
        let newHashes = CryptoCalculator(encoded, md5, sha1, sha224, sha256, sha3, sha384, sha512, ripemd160);

        if (newHashes.length === 0) newHashes = null;
        setHashes(newHashes);
    };

    const pasteData = (func) => {
        navigator.clipboard.readText()
            .then(text => {
                func(text);
            })
    };

    const clearData = () => {
        setFile(null);
        setCompare(false);
        setCompareHash("");
        setHashes(null);
    };

    return (
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
            <main className={classes.content}>
                <Container className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                                {language.input}
                            </Typography>
                            <Paper className={classes.paper}>
                                <Button
                                    label={language.selectFile}>
                                    <input type="file" onChange={e => setFile(e.target.files[0])}/>
                                </Button>

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
                                    disabled={!file || file.length === 0}
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

export default File;

import React, {useContext, useEffect} from "react";
import {Checkbox, makeStyles, Paper, FormControlLabel, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Hash from "../../components/Hash";
import GridList from "../../components/GridList";
import CopyPasteMenu from "../../components/CopyPasteMenu";
import BackButton from "../../components/BackButton";
import CsvExport from "../../components/CsvExport";
import {useHistory} from "react-router";
import {setActiveListItem} from "../../reducers/MainReducer/Actions";
import {MainContext} from "../../contexts/MainContextProvider";
import {CryptoContext} from "../../contexts/CryptoContextReducer";
import {
    setTextCompareHash, setTextHashComparing, setTextHashError,
    setTextHashes,
    setTextHashLoading,
    setTextInput
} from "../../reducers/CryptoReducer/Actions";
import Loadingbar from "../../components/Loadingbar";
import AlertDialog from "../../components/AlertDialog";

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4, 0, 2)
    },
    content: {
        flexGrow: 1,
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const ipcRenderer = window.require('electron').ipcRenderer;

const Text = () => {

    const [state, d1] = useContext(MainContext);
    const [crypto, d2] = useContext(CryptoContext);

    const language = state.languages[state.languageIndex];

    const md4 = crypto.md4;
    const md5 = crypto.md5;
    const sha1 = crypto.sha1;
    const sha224 = crypto.sha224;
    const sha256 = crypto.sha256;
    const sha3_224 = crypto.sha3_224;
    const sha3_256 = crypto.sha3_256;
    const sha3_384 = crypto.sha3_384;
    const sha3_512 = crypto.sha3_512;
    const sha384 = crypto.sha384;
    const sha512 = crypto.sha512;
    const ripemd160 = crypto.ripemd160;
    const input = crypto.textInput;
    const hashes = crypto.textHashes;

    const compare = crypto.textComparing;
    const compareHash = crypto.textCompareHash;
    const loading = crypto.textHashLoading;
    const errorMessage = crypto.textErrorMessage;

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        d1(setActiveListItem(2));
    }, []);

    const compareField = compare ? (
        <CopyPasteMenu id={1} copyData={() => navigator.clipboard.writeText(compareHash)}
                       copy={language.copy} paste={language.paste}
                       pasteData={() =>
                           navigator.clipboard.readText()
                               .then(text => {
                                   d2(setTextCompareHash(text));
                               })
                       }>
            <TextField
                id="outlined-basic"
                style={{width: '100%'}}
                margin="normal"
                value={compareHash}
                onChange={(e) => d2(setTextCompareHash(e.target.value))}
                label={language.compareHash}
                variant="outlined"/>
        </CopyPasteMenu>
    ) : null;

    const output = hashes && hashes.length > 0 ?
        <>
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                {language.output}
            </Typography>
            <GridList md={12} lg={12} xs={12} spacing={2}>
                {hashes.map((e, i) => {
                    return (
                        <Hash id={i} key={i} content={e.hash} hashType={e.type} copy={language.copy}
                              compareString={compare ? compareHash : null}/>
                    );
                })}
            </GridList>
        </>
        : null;

    /**
     * Calculate the hashes for the specified input data
     */
    const calculateHashes = () => {
        if (!input || input.length === 0) return;

        d2(setTextHashes(null));
        d2(setTextHashLoading(true));
        d2(setTextHashError(null));

        ipcRenderer.send("calculate-text-hash", {
            text: input,
            md4: md4,
            md5: md5,
            sha1: sha1,
            sha224: sha224,
            sha256: sha256,
            sha3_224: sha3_224,
            sha3_256: sha3_256,
            sha3_384: sha3_384,
            sha3_512: sha3_512,
            sha384: sha384,
            sha512: sha512,
            ripemd160: ripemd160
        });
    };

    /**
     * Clear the user interface
     */
    const clearData = () => {
        d2(setTextHashError(null));
        d2(setTextInput(""));
        d2(setTextCompareHash(""));
        d2(setTextHashComparing(false));
        d2(setTextHashes(""));
    };

    /**
     * Go back to the previous page
     */
    const goBack = () => {
        history.goBack();
    };

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                        {language.text}
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        {language.textSubtitle}
                    </Typography>
                </Container>
            </div>
            <main className={classes.content}>
                {errorMessage && errorMessage.length > 0 ? (
                    <AlertDialog title={language.errorTitle} content={errorMessage} ok={language.ok}/>) : null}
                <Container className={classes.container}>
                    <Typography component="h2" variant="h5" color="primary" gutterBottom>
                        <BackButton goBack={goBack}/>
                        {language.input}
                    </Typography>
                    <Paper className={classes.paper}>
                        <CopyPasteMenu id={0} copyData={() => navigator.clipboard.writeText(input)}
                                       copy={language.copy} paste={language.paste}
                                       pasteData={() => navigator.clipboard.readText().then(text => {
                                           d2(setTextInput(text));
                                       })}>
                            <TextField
                                style={{width: "100%"}}
                                id="outlined-basic"
                                label={language.yourTextHere}
                                margin="normal"
                                value={input}
                                disabled={loading}
                                onChange={(e) => d2(setTextInput(e.target.value))}
                                multiline
                                rowsMax={6}
                                variant="outlined"/>
                        </CopyPasteMenu>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={compare}
                                    onChange={(e) => d2(setTextHashComparing(e.target.checked))}
                                    value="compare"
                                    color="primary"
                                />
                            }
                            label={language.compare}
                        />
                        {compareField}
                    </Paper>
                    {loading ? <Loadingbar/> : null}
                    {hashes && hashes.length > 0 ? (
                        <>
                            <Button className={classes.button} color={"primary"} variant={"contained"}
                                    onClick={() => clearData()}>
                                {language.clear}
                            </Button>

                            <CsvExport fileName={"DeadHash Export " + new Date() + ".csv"} data={hashes}>
                                <Button className={classes.button} color={"primary"} variant={"contained"}
                                        style={{marginLeft: 5}}>
                                    {language.export}
                                </Button>
                            </CsvExport>
                        </>
                    ) : null}
                    {loading ? null : (
                        <Button className={classes.button} color={"primary"} variant={"contained"}
                                disabled={!input || input.length === 0 || loading}
                                style={{float: 'right'}} onClick={() => calculateHashes()}>
                            {language.calculate}
                        </Button>
                    )}
                    {output}
                </Container>
            </main>
        </div>
    );
};

export default Text;

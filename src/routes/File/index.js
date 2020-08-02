import React, {useEffect, useRef, useContext} from "react";
import {Checkbox, FormControlLabel, makeStyles, Paper} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GridList from "../../components/GridList";
import Hash from "../../components/Hash";
import CopyPasteMenu from "../../components/CopyPasteMenu";
import TextField from "@material-ui/core/TextField";
import BackButton from "../../components/BackButton";
import CsvExport from "../../components/CsvExport";
import {useHistory} from "react-router";
import {setActiveListItem} from "../../reducers/MainReducer/Actions";
import {MainContext} from "../../contexts/MainContextProvider";
import {CryptoContext} from "../../contexts/CryptoContextReducer";
import {
    setCurrentFile, setFileCompareHash, setFileHashComparing, setFileHashError,
    setFileHashes,
    setFileHashLoading,
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
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const ipcRenderer = window.require('electron').ipcRenderer;

const File = () => {

    const [state, d1] = useContext(MainContext);
    const [crypto, d2] = useContext(CryptoContext);

    const hashes = crypto.fileHashes;
    const file = crypto.currentFile;

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

    const compare = crypto.fileComparing;
    const compareHash = crypto.fileCompareHash;
    const loading = crypto.fileHashLoading;
    const errorMessage = crypto.fileErrorMessage;

    const language = state.languages[state.languageIndex];

    const fileRef = useRef(null);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        d1(setActiveListItem(1));
    }, []);

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

    const compareField = compare ? (
        <CopyPasteMenu id={1} copyData={() => navigator.clipboard.writeText(compareHash)}
                       copy={language.copy} paste={language.paste}
                       pasteData={() => {
                           navigator.clipboard.readText()
                               .then(text => {
                                   d2(setFileCompareHash(text));
                               });
                       }}>
            <TextField
                style={{width: '100%'}}
                margin="normal"
                value={compareHash}
                onChange={(e) => d2(setFileCompareHash(e.target.value))}
                label={language.compareHash}
                variant="outlined"/>
        </CopyPasteMenu>
    ) : null;

    /**
     * Calculate the hashes of a specific file
     */
    const calculateHashes = (e) => {
        if (e) e.preventDefault();
        if (!file || file.length === 0) return;

        d2(setFileHashError(null));
        d2(setFileHashes(null));
        d2(setFileHashLoading(true));

        ipcRenderer.send("calculate-file-hash", {
            filePath: file.path,
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
        d2(setFileHashError(null));
        d2(setFileCompareHash(""));
        d2(setFileHashComparing(false));
        d2(setCurrentFile(null));
    };

    /**
     * Change the currently selected file
     * @param event The event that called this function
     */
    const onFileChange = (event) => {
        d2(setCurrentFile(event.target.files[0]));
        fileRef.current.value = "";
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
                        {language.file}
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        {language.fileSubtitle}
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
                        <TextField
                            margin="normal"
                            onClick={() => {
                                if (!loading) fileRef.current.click()
                            }}
                            disabled
                            id="filled-disabled"
                            value={file && file.path ? file.path : ""}
                            variant="outlined"
                            label={language.filePath}
                        />

                        <input ref={fileRef} type="file" onChange={onFileChange}
                               style={{display: 'none'}}/>

                        <Button color={"primary"} variant={"contained"} disabled={loading}
                                onClick={() => fileRef.current.click()}>{language.select}</Button>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={compare}
                                    onChange={(e) => d2(setFileHashComparing(e.target.checked))}
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
                                disabled={!file || file.length === 0 || loading}
                                style={{float: 'right'}} onClick={calculateHashes}>
                            {language.calculate}
                        </Button>
                    )}
                    {output}
                </Container>
            </main>
        </div>
    );
};

export default File;

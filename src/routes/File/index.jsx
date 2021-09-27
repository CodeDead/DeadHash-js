import React, { useEffect, useRef, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router';
import { useTheme } from '@mui/material/styles';
import GridList from '../../components/GridList';
import Hash from '../../components/Hash';
import CopyPasteMenu from '../../components/CopyPasteMenu';
import BackButton from '../../components/BackButton';
import CsvExport from '../../components/CsvExport';
import { setActiveListItem } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import { CryptoContext } from '../../contexts/CryptoContextReducer';
import {
  setCurrentFile, setFileCompareHash, setFileHashComparing, setFileHashError,
  setFileHashes,
  setFileHashLoading,
} from '../../reducers/CryptoReducer/Actions';
import LoadingBar from '../../components/LoadingBar';
import AlertDialog from '../../components/AlertDialog';
import PageHeader from '../../components/PageHeader';

const { ipcRenderer } = window.require('electron');

const File = () => {
  const [state, d1] = useContext(MainContext);
  const [crypto, d2] = useContext(CryptoContext);

  const hashes = crypto.fileHashes;
  const file = crypto.currentFile;

  const {
    md4, md5, sha1, sha224, sha256, sha384, sha512, ripemd160,
    crc1, crc8, crc16, crc24, crc32,
  } = crypto;

  const compare = crypto.fileComparing;
  const compareHash = crypto.fileCompareHash;
  const loading = crypto.fileHashLoading;
  const errorMessage = crypto.fileErrorMessage;

  const language = state.languages[state.languageIndex];

  const fileRef = useRef(null);

  const history = useHistory();
  const theme = useTheme();

  useEffect(() => {
    d1(setActiveListItem(1));
  }, []);

  const output = hashes && hashes.length > 0
    ? (
      <>
        <Typography component="h2" variant="h5" color="primary" gutterBottom>
          {language.output}
        </Typography>
        <GridList md={12} lg={12} xs={12} spacing={2}>
          {hashes.map((e, i) => (
            <Hash
              id={i}
              /* eslint-disable-next-line react/no-array-index-key */
              key={i}
              content={e.hash}
              hashType={e.type}
              copy={language.copy}
              compareString={compare ? compareHash : null}
            />
          ))}
        </GridList>
      </>
    )
    : null;

  const compareField = compare ? (
    <CopyPasteMenu
      id={1}
      copyData={() => navigator.clipboard.writeText(compareHash)}
      copy={language.copy}
      paste={language.paste}
      pasteData={() => {
        navigator.clipboard.readText()
          .then((text) => {
            d2(setFileCompareHash(text));
          });
      }}
    >
      <TextField
        style={{ width: '100%' }}
        margin="normal"
        value={compareHash}
        onChange={(e) => d2(setFileCompareHash(e.target.value))}
        label={language.compareHash}
        variant="outlined"
      />
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

    ipcRenderer.send('calculate-file-hash', {
      filePath: file.path,
      md4,
      md5,
      sha1,
      sha224,
      sha256,
      sha384,
      sha512,
      ripemd160,
      crc1,
      crc8,
      crc16,
      crc24,
      crc32,
    });
  };

  /**
   * Clear the user interface
   */
  const clearData = () => {
    d2(setFileHashError(null));
    d2(setFileCompareHash(''));
    d2(setFileHashComparing(false));
    d2(setCurrentFile(null));
  };

  /**
   * Change the currently selected file
   * @param event The event that called this function
   */
  const onFileChange = (event) => {
    d2(setCurrentFile(event.target.files[0]));
    fileRef.current.value = '';
  };

  /**
   * Go back to the previous page
   */
  const goBack = () => {
    history.goBack();
  };

  /**
   * Method that is called when the error dialog is called
   */
  const onErrorClose = () => {
    d2(setFileHashError(null));
  };

  return (
    <div>
      <PageHeader title={language.file} subtitle={language.fileSubtitle} />
      <main
        style={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        {errorMessage && errorMessage.length > 0 ? (
          <AlertDialog
            title={language.errorTitle}
            content={errorMessage}
            ok={language.ok}
            onClose={onErrorClose}
          />
        ) : null}
        <Container
          sx={{
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
          }}
        >
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            <BackButton goBack={goBack} />
            {language.input}
          </Typography>
          <Paper
            sx={{
              padding: theme.spacing(2),
              marginBottom: theme.spacing(1),
              display: 'flex',
              overflow: 'auto',
              flexDirection: 'column',
            }}
          >
            <TextField
              margin="normal"
              onClick={() => {
                if (!loading) fileRef.current.click();
              }}
              disabled
              id="filled-disabled"
              value={file && file.path ? file.path : ''}
              variant="outlined"
              label={language.filePath}
            />

            <input
              ref={fileRef}
              type="file"
              onChange={onFileChange}
              style={{ display: 'none' }}
            />

            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              onClick={() => fileRef.current.click()}
            >
              {language.select}
            </Button>

            <FormControlLabel
              control={(
                <Checkbox
                  checked={compare}
                  onChange={(e) => d2(setFileHashComparing(e.target.checked))}
                  value="compare"
                  color="primary"
                />
              )}
              label={language.compare}
            />
            {compareField}
          </Paper>
          {loading ? <LoadingBar /> : null}
          {hashes && hashes.length > 0 ? (
            <>
              <Button
                sx={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                }}
                color="primary"
                variant="contained"
                onClick={() => clearData()}
              >
                {language.clear}
              </Button>

              <CsvExport fileName={`DeadHash Export ${new Date()}.csv`} data={hashes}>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(1),
                    marginLeft: 5,
                  }}
                >
                  {language.export}
                </Button>
              </CsvExport>
            </>

          ) : null}
          {loading ? null : (
            <Button
              sx={{
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
                float: 'right',
              }}
              color="primary"
              variant="contained"
              disabled={!file || file.length === 0 || loading}
              onClick={calculateHashes}
            >
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

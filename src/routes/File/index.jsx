import React, { useEffect, useRef, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CopyPasteMenu from '../../components/CopyPasteMenu';
import CsvExport from '../../components/CsvExport';
import { setActiveListItem } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import { CryptoContext } from '../../contexts/CryptoContextReducer';
import {
  setCurrentFile,
  setFileCompareHash,
  setFileHashComparing,
  setFileHashError,
  setFileHashes,
  setFileHashLoading,
} from '../../reducers/CryptoReducer/Actions';
import LoadingBar from '../../components/LoadingBar';
import AlertDialog from '../../components/AlertDialog';
import PageHeader from '../../components/PageHeader';
import HashList from '../../components/HashList';

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

  useEffect(() => {
    d1(setActiveListItem(1));
  }, []);

  const output = hashes && hashes.length > 0
    ? (
      <HashList
        marginTop={10}
        compareHash={compare ? compareHash : null}
        hashes={hashes}
        copyLabel={language.copy}
        outputLabel={language.output}
      />
    )
    : null;

  const compareField = compare ? (
    <Grid item xs={12} md={12} lg={12}>
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
          fullWidth
          value={compareHash}
          onChange={(e) => d2(setFileCompareHash(e.target.value))}
          label={language.compareHash}
        />
      </CopyPasteMenu>
    </Grid>
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
   * Method that is called when the error dialog is called
   */
  const onErrorClose = () => {
    d2(setFileHashError(null));
  };

  return (
    <div>
      <PageHeader title={language.file} subtitle={language.fileSubtitle} backButton />
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
        <Container style={{ marginTop: 10 }}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={10} lg={10}>
                  <TextField
                    fullWidth
                    onClick={() => {
                      if (!loading) fileRef.current.click();
                    }}
                    disabled
                    id="filled-disabled"
                    value={file && file.path ? file.path : ''}
                    label={language.filePath}
                  />

                  <input
                    ref={fileRef}
                    type="file"
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                  />
                </Grid>
                <Grid item xs={12} md={2} lg={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ height: '100%' }}
                    disabled={loading}
                    onClick={() => fileRef.current.click()}
                  >
                    {language.select}
                  </Button>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={compare}
                        onChange={(e) => d2(setFileHashComparing(e.target.checked))}
                        value="compare"
                      />
                    )}
                    label={language.compare}
                  />
                </Grid>
                {compareField}
              </Grid>
            </CardContent>
          </Card>
          {hashes && hashes.length > 0 ? (
            <>
              <Button
                variant="contained"
                onClick={clearData}
                style={{ marginTop: 10 }}
              >
                {language.clear}
              </Button>

              <CsvExport fileName={`DeadHash Export ${new Date()}.csv`} data={hashes}>
                <Button
                  variant="contained"
                  style={{ marginLeft: 5, marginTop: 10 }}
                >
                  {language.export}
                </Button>
              </CsvExport>
            </>
          ) : null}
          {loading ? <LoadingBar marginTop={10} /> : (
            <Button
              style={{
                float: 'right',
                marginTop: 10,
              }}
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

import React, { useContext, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
  setTextCompareHash,
  setTextHashComparing,
  setTextHashError,
  setTextHashes,
  setTextHashLoading,
  setTextInput,
} from '../../reducers/CryptoReducer/Actions';
import LoadingBar from '../../components/LoadingBar';
import AlertDialog from '../../components/AlertDialog';
import PageHeader from '../../components/PageHeader';
import HashList from '../../components/HashList';
import CompareField from '../../components/CompareField';

const { ipcRenderer } = window.require('electron');

const Text = () => {
  const [state, d1] = useContext(MainContext);
  const [crypto, d2] = useContext(CryptoContext);

  const language = state.languages[state.languageIndex];

  const {
    md4, md5, sha1, sha224, sha256, sha384, sha512, ripemd160,
    crc1, crc8, crc16, crc24, crc32,
  } = crypto;

  const input = crypto.textInput;
  const hashes = crypto.textHashes;

  const compare = crypto.textComparing;
  const compareHash = crypto.textCompareHash;
  const loading = crypto.textHashLoading;
  const errorMessage = crypto.textErrorMessage;

  useEffect(() => {
    d1(setActiveListItem(2));
  }, []);

  const compareField = compare ? (
    <Grid item xs={12} md={12} lg={12}>
      <CompareField
        copyLabel={language.copy}
        pasteLabel={language.paste}
        compareLabel={language.compareHash}
        onChange={(e) => d2(setTextCompareHash(e))}
        value={compareHash}
        onPaste={() => navigator.clipboard.readText().then((text) => {
          d2(setTextCompareHash(text));
        })}
      />
    </Grid>
  ) : null;

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

  /**
   * Calculate the hashes for the specified input data
   */
  const calculateHashes = () => {
    if (!input || input.length === 0) return;

    d2(setTextHashes(null));
    d2(setTextHashLoading(true));
    d2(setTextHashError(null));

    ipcRenderer.send('calculate-text-hash', {
      text: input,
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
    d2(setTextHashError(null));
    d2(setTextInput(''));
    d2(setTextCompareHash(''));
    d2(setTextHashComparing(false));
    d2(setTextHashes(''));
  };

  /**
   * Method that is called when the error dialog is called
   */
  const onErrorClose = () => {
    d2(setTextHashError(null));
  };

  return (
    <div>
      <PageHeader title={language.text} subtitle={language.textSubtitle} backButton />
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
                <Grid item xs={12} md={12} lg={12}>
                  <CopyPasteMenu
                    id={0}
                    copyData={() => navigator.clipboard.writeText(input)}
                    copy={language.copy}
                    paste={language.paste}
                    pasteData={() => navigator.clipboard.readText()
                      .then((text) => {
                        d2(setTextInput(text));
                      })}
                  >
                    <TextField
                      fullWidth
                      label={language.yourTextHere}
                      value={input}
                      disabled={loading}
                      onChange={(e) => d2(setTextInput(e.target.value))}
                      multiline
                      maxRows={6}
                    />
                  </CopyPasteMenu>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={compare}
                        onChange={(e) => d2(setTextHashComparing(e.target.checked))}
                        value="compare"
                      />
                    )}
                    label={language.compare}
                  />
                </Grid>
              </Grid>
              {compareField}
            </CardContent>
          </Card>
          {hashes && hashes.length > 0 ? (
            <>
              <Button
                style={{ marginTop: 10 }}
                variant="contained"
                onClick={clearData}
              >
                {language.clear}
              </Button>

              <CsvExport fileName={`DeadHash Export ${new Date()}.csv`} data={hashes}>
                <Button
                  style={{ marginLeft: 5, marginTop: 10 }}
                  variant="contained"
                >
                  {language.export}
                </Button>
              </CsvExport>
            </>
          ) : null}
          {loading ? (<LoadingBar marginTop={10} />) : (
            <Button
              style={{
                float: 'right',
                marginTop: 10,
              }}
              variant="contained"
              disabled={!input || input.length === 0 || loading}
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

export default Text;

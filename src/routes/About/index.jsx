import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Updater from '../../utils/Updater';
import UpdateDialog from '../../components/UpdateDialog';
import AlertDialog from '../../components/AlertDialog';
import { setActiveListItem } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import PageHeader from '../../components/PageHeader';

const os = window.require('os');
const { ipcRenderer } = window.require('electron');

let appVersion;

ipcRenderer.on('get-version-reply', (e, version) => {
  appVersion = version;
});

ipcRenderer.send('get-version');

const About = () => {
  const [state, dispatch] = useContext(MainContext);
  const language = state.languages[state.languageIndex];

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    dispatch(setActiveListItem(5));
  }, []);

  /**
   * Check for updates
   */
  const checkForUpdates = () => {
    if (loading) return;

    setLoading(true);
    setUpdate(null);
    setErrorMessage(null);

    Updater(os)
      .then((res) => {
        setUpdate(res);
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <PageHeader title={language.about} subtitle={language.aboutSubtitle} backButton />
      <main
        style={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        {update && update.updateAvailable ? (
          <UpdateDialog
            downloadUrl={update.updateUrl}
            infoUrl={update.infoUrl}
            cancel={language.cancel}
            download={language.download}
            information={language.information}
            newVersionText={language.newVersion}
            updateAvailable={language.updateAvailable}
            newVersion={update.version}
          />
        ) : null}
        {update && !update.updateAvailable ? (
          <AlertDialog
            title={language.noUpdatesTitle}
            content={language.noUpdatesMessage}
            ok={language.ok}
          />
        ) : null}
        {errorMessage && errorMessage.length > 0 ? (
          <AlertDialog
            title={language.errorTitle}
            content={errorMessage}
            ok={language.ok}
          />
        ) : null}
        <Container
          maxWidth="lg"
          style={{ marginTop: 10 }}
        >
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <Typography style={{ whiteSpace: 'pre-wrap' }}>
                    {language.aboutMessage.replace('{x}', appVersion)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Button
                    target="_blank"
                    fullWidth
                    href="https://codedead.com/Software/DeadHash/gpl.pdf"
                    variant="contained"
                  >
                    {language.license}
                  </Button>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Button
                    target="_blank"
                    fullWidth
                    href="https://codedead.com"
                    variant="contained"
                  >
                    {language.codedead}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Button
            onClick={checkForUpdates}
            disabled={loading}
            style={{ marginTop: 10 }}
          >
            <RefreshIcon />
            {language.checkForUpdates}
          </Button>
        </Container>
      </main>
    </div>
  );
};

export default About;

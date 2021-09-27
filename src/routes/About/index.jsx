import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import BackButton from '../../components/BackButton';
import Updater from '../../utils/Updater';
import UpdateDialog from '../../components/UpdateDialog';
import AlertDialog from '../../components/AlertDialog';
import { setActiveListItem } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';

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

  const theme = useTheme();
  const history = useHistory();

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

  /**
   * Go back to the previous page
   */
  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          padding: theme.spacing(4, 0, 2),
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
            {language.about}
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            {language.aboutSubtitle}
          </Typography>
        </Container>
      </Box>
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
          sx={{
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
          }}
        >
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            <BackButton goBack={goBack} />
            {language.appName}
            {' '}
            -
            {language.about}
          </Typography>
          <Paper
            sx={{
              padding: theme.spacing(2),
              display: 'flex',
              overflow: 'auto',
              flexDirection: 'column',
            }}
          >
            <div style={{ whiteSpace: 'pre-wrap' }}>
              <p>
                {language.aboutMessage.replace('{x}', appVersion)}
              </p>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <Button
                  target="_blank"
                  style={{ width: '100%' }}
                  href="http://codedead.com/Software/DeadHash/gpl.pdf"
                  color="primary"
                  variant="contained"
                >
                  {language.license}
                </Button>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Button
                  target="_blank"
                  style={{ width: '100%' }}
                  href="http://codedead.com"
                  color="primary"
                  variant="contained"
                >
                  {language.codedead}
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Button
            color="primary"
            onClick={() => checkForUpdates()}
            disabled={loading}
            style={{ marginTop: 5 }}
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

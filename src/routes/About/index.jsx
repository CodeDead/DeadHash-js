import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useHistory } from 'react-router';
import BackButton from '../../components/BackButton';
import Updater from '../../utils/Updater';
import UpdateDialog from '../../components/UpdateDialog';
import AlertDialog from '../../components/AlertDialog';
import { setActiveListItem } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 2),
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
}));

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

  const classes = useStyles();
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
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
            {language.about}
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            {language.aboutSubtitle}
          </Typography>
        </Container>
      </div>
      <main className={classes.content}>
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
        <Container maxWidth="lg" className={classes.container}>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            <BackButton goBack={goBack} />
            {language.appName}
            {' '}
            -
            {language.about}
          </Typography>
          <Paper className={classes.paper}>
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
            className={classes.button}
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

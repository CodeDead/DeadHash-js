import React, { useContext, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { useHistory } from 'react-router';
import blank from '../../components/Theme/blank.png';
import Updater from '../../utils/Updater';
import UpdateDialog from '../../components/UpdateDialog';
import AlertDialog from '../../components/AlertDialog';
import { setActiveListItem, setUpdateChecked } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
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
}));

const os = window.require('os');

const Home = () => {
  const [state, dispatch] = useContext(MainContext);

  const { autoUpdate } = state;
  const language = state.languages[state.languageIndex];
  const updateChecked = state.checkedForUpdates;

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [update, setUpdate] = useState(null);

  const classes = useStyles();
  const history = useHistory();

  /**
   * Check for application updates
   */
  const checkForUpdates = () => {
    if (loading) return;

    setLoading(true);
    setErrorMessage(null);
    setUpdate(null);

    if (!updateChecked) {
      dispatch(setUpdateChecked(true));
    }

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

  useEffect(() => {
    dispatch(setActiveListItem(0));
    if (autoUpdate && !updateChecked) {
      checkForUpdates();
    }
  }, []);

  /**
   * Open the file hasher page
   */
  const openFileHasher = () => {
    history.push('/file');
  };

  /**
   * Open the text hasher page
   */
  const openTextHasher = () => {
    history.push('/text');
  };

  return (
    <div>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
            {language.cryptography}
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            {language.cryptographySubtitle}
          </Typography>
        </Container>
      </div>
      <main className={classes.content}>
        {update && update.updateAvailable ? (
          <UpdateDialog
            downloadUrl={update.updateUrl}
            infoUrl={update.infoUrl}
            information={language.information}
            updateAvailable={language.updateAvailable}
            newVersionText={language.newVersion}
            download={language.download}
            cancel={language.cancel}
            newVersion={update.version}
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <CardActionArea onClick={() => openFileHasher()}>
                  <CardMedia
                    title={language.file}
                    image={blank}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {language.file}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {language.fileSubtitle}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <CardActionArea onClick={() => openTextHasher()}>
                  <CardMedia
                    title={language.file}
                    image={blank}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {language.text}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {language.textSubtitle}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Home;

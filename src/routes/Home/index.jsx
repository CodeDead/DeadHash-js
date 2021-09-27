import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { useHistory } from 'react-router';
import { useTheme } from '@mui/material/styles';
import blank from '../../components/Theme/blank.png';
import Updater from '../../utils/Updater';
import UpdateDialog from '../../components/UpdateDialog';
import AlertDialog from '../../components/AlertDialog';
import { setActiveListItem, setUpdateChecked } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import PageHeader from '../../components/PageHeader';

const os = window.require('os');

const Home = () => {
  const [state, dispatch] = useContext(MainContext);

  const { autoUpdate } = state;
  const language = state.languages[state.languageIndex];
  const updateChecked = state.checkedForUpdates;

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [update, setUpdate] = useState(null);

  const theme = useTheme();
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
      <PageHeader title={language.cryptography} subtitle={language.cryptographySubtitle} />
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
        <Container
          maxWidth="lg"
          sx={{
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
          }}
        >
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

import React, { useContext, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {
  FormLabel, makeStyles, Radio, RadioGroup,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useHistory } from 'react-router';
import Updater from '../../utils/Updater';
import BackButton from '../../components/BackButton';
import UpdateDialog from '../../components/UpdateDialog';
import AlertDialog from '../../components/AlertDialog';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Theme from '../../components/Theme';
import GridList from '../../components/GridList';
import {
  resetMainReducer,
  setActiveListItem,
  setAutoUpdate, setCanDragDrop, setLanguageButtonStatus,
  setLanguageIndex, setMaximizeStatus, setMinimizeStatus,
  setThemeIndex, setThemeStyle,
} from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import { CryptoContext } from '../../contexts/CryptoContextReducer';
import {
  resetCryptoReducer, setMd4State,
  setMd5State,
  setRipeMd160State,
  setSha1State,
  setSha224State,
  setSha256State,
  setSha384State,
  setSha512State,
} from '../../reducers/CryptoReducer/Actions';

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
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const os = window.require('os');

const Settings = () => {
  const [state, d1] = useContext(MainContext);
  const [crypto, d2] = useContext(CryptoContext);

  const { themeIndex, themeStyle } = state;
  const { languageIndex } = state;
  const language = state.languages[languageIndex];
  const dragDrop = state.canDragDrop;
  const { autoUpdate } = state;
  const minimize = state.minimizeEnabled;
  const maximize = state.maximizeEnabled;
  const languageStatus = state.languageEnabled;

  const {
    md4, md5, sha1, sha224, sha256, sha384, sha512, ripemd160,
  } = crypto;

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    d1(setActiveListItem(3));
  }, []);

  /**
   * Change the theme
   * @param index The index of the theme
   */
  const changeTheme = (index) => {
    d1(setThemeIndex(index));
  };

  /**
   * Dispatch an event to change the language
   * @param e The event that contains the language index
   */
  const handleLanguageChange = (e) => {
    d1(setLanguageIndex(e.target.value));
  };

  /**
   * Reset all settings to their default values
   */
  const resetSettings = () => {
    d1(resetMainReducer());
    d2(resetCryptoReducer());
  };

  /**
   * Check for application updates
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
   * Change the theme style
   * @param event The event argument
   */
  const changeThemeStyle = (event) => {
    d1(setThemeStyle(event.target.value));
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
            {language.settings}
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            {language.settingsSubtitle}
          </Typography>
        </Container>
      </div>
      <main className={classes.content}>
        {update && update.updateAvailable ? (
          <UpdateDialog
            downloadUrl={update.updateUrl}
            infoUrl={update.infoUrl}
            download={language.download}
            cancel={language.cancel}
            newVersionText={language.newVersion}
            updateAvailable={language.updateAvailable}
            information={language.information}
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                <BackButton goBack={goBack} />
                {language.general}
              </Typography>
              <Paper className={classes.paper}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={autoUpdate}
                      onChange={(e) => d1(setAutoUpdate(e.target.checked))}
                      value="autoUpdate"
                      color="primary"
                    />
                  )}
                  label={language.autoUpdate}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={dragDrop}
                      onChange={(e) => d1(setCanDragDrop(e.target.checked))}
                      value="dragDrop"
                      color="primary"
                    />
                  )}
                  label={language.dragAndDrop}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={minimize}
                      onChange={(e) => d1(setMinimizeStatus(e.target.checked))}
                      value="minimize"
                      color="primary"
                    />
                  )}
                  label={language.minimizeEnabled}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={maximize}
                      onChange={(e) => d1(setMaximizeStatus(e.target.checked))}
                      value="maximize"
                      color="primary"
                    />
                  )}
                  label={language.maximizeEnabled}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={languageStatus}
                      onChange={(e) => d1(setLanguageButtonStatus(e.target.checked))}
                      value="language"
                      color="primary"
                    />
                  )}
                  label={language.languageEnabled}
                />
                <FormControl variant="outlined" style={{ marginTop: 5 }}>
                  <InputLabel id="language-label">{language.language}</InputLabel>
                  <Select
                    value={languageIndex}
                    onChange={handleLanguageChange}
                    id="language-simple"
                    labelId="language-label"
                  >
                    <MenuItem value={0}>Deutsch</MenuItem>
                    <MenuItem value={1}>English</MenuItem>
                    <MenuItem value={2}>Español</MenuItem>
                    <MenuItem value={3}>Français</MenuItem>
                    <MenuItem value={4}>Italiano</MenuItem>
                    <MenuItem value={5}>日本語</MenuItem>
                    <MenuItem value={6}>Nederlands</MenuItem>
                    <MenuItem value={7}>Português</MenuItem>
                    <MenuItem value={8}>Pусский</MenuItem>
                    <MenuItem value={9}>Türkçe</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                {language.cryptography}
              </Typography>
              <Paper className={classes.paper}>
                <div>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={md4}
                        onChange={(e) => d2(setMd4State(e.target.checked))}
                        value="md4"
                        color="primary"
                      />
                    )}
                    label={language.md4}
                  />

                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={md5}
                        onChange={(e) => d2(setMd5State(e.target.checked))}
                        value="md5"
                        color="primary"
                      />
                    )}
                    label={language.md5}
                  />

                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={sha1}
                        onChange={(e) => d2(setSha1State(e.target.checked))}
                        value="sha1"
                        color="primary"
                      />
                    )}
                    label={language.sha1}
                  />

                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={sha224}
                        onChange={(e) => d2(setSha224State(e.target.checked))}
                        value="sha224"
                        color="primary"
                      />
                    )}
                    label={language.sha224}
                  />

                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={sha256}
                        onChange={(e) => d2(setSha256State(e.target.checked))}
                        value="sha256"
                        color="primary"
                      />
                    )}
                    label={language.sha256}
                  />

                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={sha384}
                        onChange={(e) => d2(setSha384State(e.target.checked))}
                        value="sha384"
                        color="primary"
                      />
                    )}
                    label={language.sha384}
                  />

                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={sha512}
                        onChange={(e) => d2(setSha512State(e.target.checked))}
                        value="sha512"
                        color="primary"
                      />
                    )}
                    label={language.sha512}
                  />

                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={ripemd160}
                        onChange={(e) => d2(setRipeMd160State(e.target.checked))}
                        value="ripemd160"
                        color="primary"
                      />
                    )}
                    label={language.ripemd160}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                {language.theme}
              </Typography>

              <GridList spacing={2} xs={6} md={4} lg={4}>
                <Theme
                  title={language.default}
                  description={language.defaultThemeDescription}
                  color={blue[500]}
                  selected={themeIndex === 0}
                  onAction={() => changeTheme(0)}
                />
                <Theme
                  title={language.lightBlue}
                  description={language.lightBlueDescription}
                  color={lightBlue[500]}
                  selected={themeIndex === 1}
                  onAction={() => changeTheme(1)}
                />
                <Theme
                  title={language.red}
                  description={language.redDescription}
                  color={red[500]}
                  selected={themeIndex === 2}
                  onAction={() => changeTheme(2)}
                />
                <Theme
                  title={language.green}
                  description={language.greenDescription}
                  color={green[500]}
                  selected={themeIndex === 3}
                  onAction={() => changeTheme(3)}
                />
                <Theme
                  title={language.lightGreen}
                  description={language.lightGreenDescription}
                  color={lightGreen[500]}
                  selected={themeIndex === 4}
                  onAction={() => changeTheme(4)}
                />
                <Theme
                  title={language.purple}
                  description={language.purpleDescription}
                  color={purple[500]}
                  selected={themeIndex === 5}
                  onAction={() => changeTheme(5)}
                />
                <Theme
                  title={language.deepPurple}
                  description={language.deepPurpleDescription}
                  color={deepPurple[500]}
                  selected={themeIndex === 6}
                  onAction={() => changeTheme(6)}
                />
                <Theme
                  title={language.grey}
                  description={language.greyDescription}
                  color={grey[500]}
                  selected={themeIndex === 7}
                  onAction={() => changeTheme(7)}
                />
                <Theme
                  title={language.orange}
                  description={language.orangeThemeDescription}
                  color={orange[500]}
                  selected={themeIndex === 8}
                  onAction={() => changeTheme(8)}
                />
              </GridList>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl style={{ marginTop: 10 }}>
                <FormLabel>{language.themeStyle}</FormLabel>
                <RadioGroup value={themeStyle} onChange={changeThemeStyle}>
                  <FormControlLabel value="light" control={<Radio />} label={language.light} />
                  <FormControlLabel value="dark" control={<Radio />} label={language.dark} />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            className={classes.button}
            color="primary"
            onClick={() => checkForUpdates()}
            disabled={loading}
          >
            <RefreshIcon />
            {language.checkForUpdates}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setConfirmOpen(true)}
            className={classes.button}
            style={{ float: 'right' }}
          >
            {language.reset}
          </Button>
        </Container>
        <ConfirmationDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          yes={language.yes}
          no={language.no}
          title={language.confirmation}
          content={language.confirmResetSettings}
          onAccept={() => resetSettings()}
        />
      </main>
    </div>
  );
};

export default Settings;

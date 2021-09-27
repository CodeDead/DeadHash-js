import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import blue from '@mui/material/colors/blue';
import purple from '@mui/material/colors/purple';
import deepPurple from '@mui/material/colors/deepPurple';
import lightBlue from '@mui/material/colors/lightBlue';
import red from '@mui/material/colors/red';
import green from '@mui/material/colors/green';
import lightGreen from '@mui/material/colors/lightGreen';
import grey from '@mui/material/colors/grey';
import orange from '@mui/material/colors/orange';
import deepOrange from '@mui/material/colors/deepOrange';
import amber from '@mui/material/colors/amber';
import brown from '@mui/material/colors/brown';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useHistory } from 'react-router';
import { useTheme } from '@mui/material/styles';
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
  setAutoUpdate,
  setCanDragDrop,
  setLanguageButtonStatus,
  setLanguageIndex,
  setMaximizeStatus,
  setMinimizeStatus,
  setThemeIndex,
  setThemeStyle,
  setThemeToggleStatus,
} from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import { CryptoContext } from '../../contexts/CryptoContextReducer';
import {
  resetCryptoReducer,
  setMd4State,
  setMd5State,
  setRipeMd160State,
  setSha1State,
  setSha224State,
  setSha256State,
  setSha384State,
  setSha512State,
  setCrc1State,
  setCrc8State,
  setCrc16State,
  setCrc24State,
  setCrc32State,
} from '../../reducers/CryptoReducer/Actions';
import PageHeader from '../../components/PageHeader';

const os = window.require('os');

const Settings = () => {
  const [state, d1] = useContext(MainContext);
  const [crypto, d2] = useContext(CryptoContext);

  const {
    themeIndex,
    themeStyle,
    languageIndex,
    canDragDrop,
    minimizeEnabled,
    maximizeEnabled,
    languageEnabled,
    autoUpdate,
    themeToggleEnabled,
  } = state;

  const language = state.languages[languageIndex];

  const {
    md4, md5, sha1, sha224, sha256, sha384, sha512, ripemd160,
    crc1, crc8, crc16, crc24, crc32,
  } = crypto;

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const theme = useTheme();
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
      <PageHeader title={language.settings} subtitle={language.settingsSubtitle} />
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
        <Container
          maxWidth="lg"
          sx={{
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                <BackButton goBack={goBack} />
                {language.general}
              </Typography>
              <Paper
                sx={{
                  padding: theme.spacing(2),
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                }}
              >
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
                      checked={canDragDrop}
                      onChange={(e) => d1(setCanDragDrop(e.target.checked))}
                      value="canDragDrop"
                      color="primary"
                    />
                  )}
                  label={language.dragAndDrop}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={minimizeEnabled}
                      onChange={(e) => d1(setMinimizeStatus(e.target.checked))}
                      value="minimizeEnabled"
                      color="primary"
                    />
                  )}
                  label={language.minimizeEnabled}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={maximizeEnabled}
                      onChange={(e) => d1(setMaximizeStatus(e.target.checked))}
                      value="maximizeEnabled"
                      color="primary"
                    />
                  )}
                  label={language.maximizeEnabled}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={languageEnabled}
                      onChange={(e) => d1(setLanguageButtonStatus(e.target.checked))}
                      value="languageEnabled"
                      color="primary"
                    />
                  )}
                  label={language.languageEnabled}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={themeToggleEnabled}
                      onChange={(e) => d1(setThemeToggleStatus(e.target.checked))}
                      value="themeToggleEnabled"
                      color="primary"
                    />
                  )}
                  label={language.themeToggleEnabled}
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
              <Paper
                sx={{
                  padding: theme.spacing(2),
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                }}
              >
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
                {language.cyclicRedundancyCheck}
              </Typography>
              <Paper
                sx={{
                  padding: theme.spacing(2),
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                }}
              >
                <div>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={crc1}
                        onChange={(e) => d2(setCrc1State(e.target.checked))}
                        value="crc1"
                        color="primary"
                      />
                    )}
                    label={language.crc1}
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={crc8}
                        onChange={(e) => d2(setCrc8State(e.target.checked))}
                        value="crc8"
                        color="primary"
                      />
                    )}
                    label={language.crc8}
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={crc16}
                        onChange={(e) => d2(setCrc16State(e.target.checked))}
                        value="crc16"
                        color="primary"
                      />
                    )}
                    label={language.crc16}
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={crc24}
                        onChange={(e) => d2(setCrc24State(e.target.checked))}
                        value="crc24"
                        color="primary"
                      />
                    )}
                    label={language.crc24}
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={crc32}
                        onChange={(e) => d2(setCrc32State(e.target.checked))}
                        value="crc32"
                        color="primary"
                      />
                    )}
                    label={language.crc32}
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
                <Theme
                  title={language.deepOrange}
                  description={language.deepOrangeDescription}
                  color={deepOrange[500]}
                  selected={themeIndex === 9}
                  onAction={() => changeTheme(9)}
                />
                <Theme
                  title={language.amber}
                  description={language.amberDescription}
                  color={amber[500]}
                  selected={themeIndex === 10}
                  onAction={() => changeTheme(10)}
                />
                <Theme
                  title={language.brown}
                  description={language.brownDescription}
                  color={brown[500]}
                  selected={themeIndex === 11}
                  onAction={() => changeTheme(11)}
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
            sx={{
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
            }}
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
            sx={{
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
              float: 'right',
            }}
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

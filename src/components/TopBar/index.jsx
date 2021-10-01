import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MinimizeIcon from '@mui/icons-material/Minimize';
import FullScreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Box from '@mui/material/Box';
import DrawerBar from '../DrawerBar';
import { setLanguageIndex, setThemeStyle } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';

const { ipcRenderer } = window.require('electron');

const TopBar = () => {
  const [state, d1] = useContext(MainContext);

  const {
    languageIndex,
    minimizeEnabled,
    maximizeEnabled,
    languageEnabled,
    themeStyle,
    themeToggleEnabled,
  } = state;
  const language = state.languages[languageIndex];

  const [anchorEl, setAnchorEl] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const languageOpen = Boolean(anchorEl);

  /**
   * Set full screen to true
   */
  const fullScreenEvent = () => {
    setFullScreen(true);
  };

  /**
   * Set fullscreen to false
   */
  const exitFullScreenEvent = () => {
    setFullScreen(false);
  };

  useEffect(() => {
    ipcRenderer.on('window-maximized', fullScreenEvent);
    ipcRenderer.on('window-unmaximized', exitFullScreenEvent);
  }, []);

  /**
   * Open the drawer
   */
  const openDrawer = () => {
    setDrawerOpen(true);
  };

  /**
   * Handle the closing of the top bar
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Change the language of the application
   * @param lang The language index
   */
  const changeLanguage = (lang) => {
    handleClose();
    d1(setLanguageIndex(lang));
  };

  /**
   * Handle menu event
   * @param event The event of the menu
   */
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Minimize the window
   */
  const minimize = () => {
    ipcRenderer.send('handle-minimize');
  };

  /**
   * Maximize or restore the previous state of the window
   */
  const maximize = () => {
    ipcRenderer.send('handle-maximize');
  };

  /**
   * Change the theme style
   */
  const changeThemeStyle = () => {
    d1(setThemeStyle(themeStyle === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
      >
        <Toolbar
          variant="dense"
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{
              WebkitAppRegion: 'drag',
              flexGrow: 1,
            }}
          >
            {language.appName}
          </Typography>

          {themeToggleEnabled ? (
            <IconButton color="inherit" onClick={changeThemeStyle}>
              {themeStyle === 'dark' ? <Brightness5Icon /> : <Brightness7Icon />}
            </IconButton>
          ) : null}

          {languageEnabled
            ? (
              <div>
                <IconButton
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <LanguageIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={languageOpen}
                  onClose={handleClose}
                >

                  <MenuItem
                    onClick={() => changeLanguage(0)}
                    selected={languageIndex === 0}
                  >
                    Deutsch
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage(1)}
                    selected={languageIndex === 1}
                  >
                    English
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage(2)}
                    selected={languageIndex === 2}
                  >
                    Español
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage(3)}
                    selected={languageIndex === 3}
                  >
                    Français
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage(4)}
                    selected={languageIndex === 4}
                  >
                    Italiano
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage(5)}
                    selected={languageIndex === 5}
                  >
                    日本語
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage(6)}
                    selected={languageIndex === 6}
                  >
                    Nederlands
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage(7)}
                    selected={languageIndex === 7}
                  >
                    Português
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage(8)}
                    selected={languageIndex === 8}
                  >
                    Pусский
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage(9)}
                    selected={languageIndex === 9}
                  >
                    Türkçe
                  </MenuItem>
                </Menu>
              </div>
            )
            : null}
          {minimizeEnabled
            ? (
              <IconButton
                color="inherit"
                onClick={() => minimize()}
              >
                <MinimizeIcon />
              </IconButton>
            )
            : null}
          {maximizeEnabled
            ? (
              <IconButton
                color="inherit"
                onClick={() => maximize()}
              >
                {fullScreen ? <FullscreenExitIcon /> : <FullScreenIcon />}
              </IconButton>
            )
            : null}
          <IconButton
            color="inherit"
            onClick={() => ipcRenderer.send('handle-close')}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DrawerBar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Toolbar />
    </Box>
  );
};

export default TopBar;

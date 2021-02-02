import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from '../../routes/Home';
import Settings from '../../routes/Settings';
import ThemeSelector from '../../utils/ThemeSelector';
import Topbar from '../Topbar';
import About from '../../routes/About';
import File from '../../routes/File';
import Text from '../../routes/Text';
import DropZone from '../DropZone';
import { MainContext } from '../../contexts/MainContextProvider';
import { CryptoContext } from '../../contexts/CryptoContextReducer';
import {
  setCurrentFile,
  setFileHashError,
  setFileHashes,
  setFileHashLoading, setTextHashError, setTextHashes, setTextHashLoading,
} from '../../reducers/CryptoReducer/Actions';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [state] = useContext(MainContext);
  const [, dispatch] = useContext(CryptoContext);

  const enabled = state.canDragDrop;
  const { themeIndex, themeStyle } = state;

  const color = ThemeSelector(themeIndex);

  const theme = createMuiTheme({
    palette: {
      primary: color,
      type: themeStyle,
    },
  });

  useEffect(() => {
    ipcRenderer.on('file-hash-calculated', (e, data) => {
      dispatch(setFileHashes(data));
      dispatch(setFileHashLoading(false));
    });

    ipcRenderer.on('text-hash-calculated', (e, data) => {
      dispatch(setTextHashes(data));
      dispatch(setTextHashLoading(false));
    });

    ipcRenderer.on('file-hash-calculation-error', (e, data) => {
      dispatch(setFileHashError(data.message));
      dispatch(setFileHashLoading(false));
    });

    ipcRenderer.on('text-hash-calculation-error', (e, data) => {
      dispatch(setTextHashError(data.message));
      dispatch(setTextHashLoading(false));
    });
  }, []);

  /**
   * Method that is called when a file is dropped
   * @param item The item that was dropped
   */
  const onDrop = (item) => {
    dispatch(setCurrentFile(item));
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <DropZone enabled={enabled} onDrop={onDrop} reRoute="/file">
          <Topbar />
          <CssBaseline />
          <Switch>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/file">
              <File />
            </Route>
            <Route path="/text">
              <Text />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </DropZone>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

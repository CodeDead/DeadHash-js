import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThemeSelector from '../../utils/ThemeSelector';
import TopBar from '../TopBar';
import DropZone from '../DropZone';
import { MainContext } from '../../contexts/MainContextProvider';
import { CryptoContext } from '../../contexts/CryptoContextReducer';
import {
  setCurrentFile,
  setFileHashError,
  setFileHashes,
  setFileHashLoading, setTextHashError, setTextHashes, setTextHashLoading,
} from '../../reducers/CryptoReducer/Actions';
import Home from '../../routes/Home';
import Text from '../../routes/Text';
import File from '../../routes/File';
import About from '../../routes/About';
import Settings from '../../routes/Settings';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [state] = useContext(MainContext);
  const [, dispatch] = useContext(CryptoContext);

  const enabled = state.canDragDrop;
  const { themeIndex, themeStyle } = state;

  const color = ThemeSelector(themeIndex);

  const theme = createTheme({
    palette: {
      primary: color,
      mode: themeStyle,
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
          <TopBar />
          <CssBaseline />
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/file" element={<File />} />
            <Route path="/text" element={<Text />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </DropZone>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

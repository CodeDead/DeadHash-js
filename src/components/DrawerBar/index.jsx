import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import CryptographyMenu from '../CryptographyMenu';
import { MainContext } from '../../contexts/MainContextProvider';

const { ipcRenderer } = window.require('electron');

const DrawerBar = ({ open, onClose }) => {
  const [state] = useContext(MainContext);
  const language = state.languages[state.languageIndex];
  const selectedItem = state.selectedListItem;

  const navigate = useNavigate();
  const theme = useTheme();

  /**
   * Function that is called when the drawer should close
   */
  const handleDrawerClose = () => {
    onClose();
  };

  /**
   * Handle a page change
   * @param index The index of the page
   */
  const handleIndexChange = (index) => {
    onClose();
    if (selectedItem === index) return;

    switch (index) {
      case 1:
        navigate('/file');
        break;
      case 2:
        navigate('/text');
        break;
      case 3:
        navigate('/settings');
        break;
      case 4:
        window.open('https://codedead.com/Software/DeadHash/help.pdf', '_blank');
        break;
      case 5:
        navigate('/about');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          ...theme.mixins.toolbar,
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <Divider />

      <Box style={{ width: 240 }}>
        <CryptographyMenu
          handleIndexChange={handleIndexChange}
          selectedIndex={selectedItem}
          cryptography={language.cryptography}
          file={language.file}
          text={language.text}
        />

        <Divider />

        <List>
          <ListItemButton onClick={() => handleIndexChange(3)} selected={selectedItem === 3}>
            <ListItemIcon><BuildIcon color="inherit" /></ListItemIcon>
            <ListItemText primary={language.settings} />
          </ListItemButton>
        </List>

        <Divider />

        <List>
          <ListItemButton onClick={() => handleIndexChange(4)}>
            <ListItemIcon><HelpIcon color="inherit" /></ListItemIcon>
            <ListItemText primary={language.help} />
          </ListItemButton>

          <ListItemButton onClick={() => handleIndexChange(5)} selected={selectedItem === 5}>
            <ListItemIcon><InfoIcon color="inherit" /></ListItemIcon>
            <ListItemText primary={language.about} />
          </ListItemButton>
        </List>

        <Divider />

        <List>
          <ListItemButton onClick={() => ipcRenderer.send('handle-close')}>
            <ListItemIcon><CloseIcon color="inherit" /></ListItemIcon>
            <ListItemText primary={language.exit} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerBar;

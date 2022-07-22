import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyIcon from '@mui/icons-material/VpnKey';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material';

const CryptographyMenu = ({
  handleIndexChange, selectedIndex, cryptography, file, text,
}) => {
  const theme = useTheme();
  const [openCollapse, setOpenCollapse] = useState(true);

  /**
   * Open the menu
   */
  const handleOpenMenu = () => {
    setOpenCollapse(!openCollapse);
  };

  return (
    <List>
      <ListItemButton selected={selectedIndex === 0}>
        <ListItemIcon onClick={handleOpenMenu}><KeyIcon /></ListItemIcon>
        <ListItemText onClick={handleOpenMenu} primary={cryptography} />
        {openCollapse ? <ExpandLessIcon color="inherit" onClick={handleOpenMenu} />
          : <ExpandMoreIcon color="inherit" onClick={handleOpenMenu} />}
      </ListItemButton>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            selected={selectedIndex === 1}
            sx={{
              paddingLeft: theme.spacing(4),
            }}
            onClick={() => handleIndexChange(1)}
          >
            <ListItemText inset primary={file} />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            sx={{
              paddingLeft: theme.spacing(4),
            }}
            onClick={() => handleIndexChange(2)}
          >
            <ListItemText inset primary={text} />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default CryptographyMenu;

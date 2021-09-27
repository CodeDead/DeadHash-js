import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyIcon from '@mui/icons-material/VpnKey';
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
      <ListItem button selected={selectedIndex === 0}>
        <ListItemIcon onClick={() => handleIndexChange(0)}><KeyIcon /></ListItemIcon>
        <ListItemText onClick={() => handleIndexChange(0)} primary={cryptography} />
        {openCollapse ? <ExpandLessIcon color="inherit" onClick={handleOpenMenu} />
          : <ExpandMoreIcon color="inherit" onClick={handleOpenMenu} />}
      </ListItem>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            selected={selectedIndex === 1}
            button
            sx={{
              paddingLeft: theme.spacing(4),
            }}
            onClick={() => handleIndexChange(1)}
          >
            <ListItemText inset primary={file} />
          </ListItem>
          <ListItem
            selected={selectedIndex === 2}
            button
            sx={{
              paddingLeft: theme.spacing(4),
            }}
            onClick={() => handleIndexChange(2)}
          >
            <ListItemText inset primary={text} />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default CryptographyMenu;

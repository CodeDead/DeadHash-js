import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CopyIcon from '@mui/icons-material/FileCopy';
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import { useTheme } from '@mui/material/styles';

const Hash = ({
  hashType, content, compareString, id, copy,
}) => {
  const theme = useTheme();
  const MENU_ID = `hashMenu${id}`;

  let compareColor = null;
  let compareIcon = null;
  if (compareString && compareString === content) {
    compareIcon = <CheckIcon color="inherit" style={{ float: 'right' }} />;
    compareColor = { color: 'green' };
  }

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  /**
   * Handle the context menu event
   * @param event The event argument
   */
  const handleContextMenu = (event) => {
    event.preventDefault();
    show(event, {
      props: {
        key: 'value',
      },
    });
  };

  return (
    <Paper
      sx={{
        padding: theme.spacing(2),
        overflow: 'auto',
        flex: 'auto',
        flexDirection: 'column',
      }}
    >
      <Typography variant="subtitle1" color="primary" gutterBottom>
        {hashType}
        {compareIcon}
      </Typography>
      <div onContextMenu={handleContextMenu}>
        <span style={compareColor}>{content}</span>
      </div>
      <Menu id={`hashMenu${id}`}>
        <Item onClick={() => navigator.clipboard.writeText(content)}>
          <CopyIcon />
          {' '}
          {copy}
        </Item>
      </Menu>
    </Paper>
  );
};

export default Hash;

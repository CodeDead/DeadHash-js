import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import CopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
    flex: 'auto',
    flexDirection: 'column',
  },
}));

const Hash = ({
  hashType, content, compareString, id, copy,
}) => {
  const MENU_ID = `hashMenu${id}`;
  const classes = useStyles();

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
    <Paper className={classes.paper}>
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

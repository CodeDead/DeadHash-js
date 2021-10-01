import React from 'react';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CopyIcon from '@mui/icons-material/FileCopy';
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Hash = ({
  hashType, content, compareString, id, copy,
}) => {
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
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default Hash;

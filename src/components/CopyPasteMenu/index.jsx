import React from 'react';
import { Item, Menu, useContextMenu } from 'react-contexify';
import CopyIcon from '@mui/icons-material/FileCopy';
import PasteIcon from '@mui/icons-material/Assignment';

const CopyPasteMenu = ({
  id, children, copyData, pasteData, copy, paste,
}) => {
  const MENU_ID = `copyPasteMenu${id}`;

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
    <>
      <div
        style={{ width: '100%' }}
        onContextMenu={handleContextMenu}
      >
        {children}
      </div>
      <Menu id={MENU_ID}>
        <Item onClick={() => copyData()}>
          <CopyIcon />
          {` ${copy}`}
        </Item>
        <Item onClick={() => pasteData()}>
          <PasteIcon />
          {` ${paste}`}
        </Item>
      </Menu>
    </>
  );
};

export default CopyPasteMenu;

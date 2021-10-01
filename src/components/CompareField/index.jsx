import React from 'react';
import TextField from '@mui/material/TextField';
import CopyPasteMenu from '../CopyPasteMenu';

const CompareField = ({
  copyLabel, pasteLabel, onPaste, compareLabel, value, onChange,
}) => {
  /**
   * Paste data
   */
  const paste = () => {
    if (onPaste) {
      onPaste();
    }
  };

  /**
   * Change the value
   * @param e The event argument
   */
  const changeValue = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <CopyPasteMenu
      id={1}
      copyData={() => navigator.clipboard.writeText(value)}
      copy={copyLabel}
      paste={pasteLabel}
      pasteData={paste}
    >
      <TextField
        fullWidth
        value={value}
        onChange={changeValue}
        label={compareLabel}
      />
    </CopyPasteMenu>
  );
};

export default CompareField;

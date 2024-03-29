import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropZone = ({
  children, onDrop, enabled, reRoute,
}) => {
  const navigate = useNavigate();

  /**
   * Event that is fired when one or more files are dropped
   * @param e The event that contains the drop details
   */
  const drop = (e) => {
    if (e) e.preventDefault();
    if (!enabled) return;

    if (onDrop) onDrop(e.dataTransfer.files[0]);
    if (reRoute) navigate(reRoute);
  };

  /**
   * Event that is fired when a drag over event is detected
   * @param event The event that contains the drag over details
   */
  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onDragOver={onDragOver}
      onDrop={drop}
    >
      {children}
    </div>
  );
};

export default DropZone;

import { Draggable } from '@mui/core';
import { Typography } from '@mui/material';

const LogoutDraggable = ({ onLogout }) => {
  const handleDragEnd = (event, info) => {
    if (info.offset.x >= 200) {
      onLogout();
    }
  };

  return (
    <Draggable onDragEnd={handleDragEnd}>
      <Typography variant="h6" component="div" sx={{ cursor: 'move' }}>
        Drag to log out
      </Typography>
    </Draggable>
  );
};

export default LogoutDraggable;

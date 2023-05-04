import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import {logout, reset} from '../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle';

const UserIconWithDrop = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')

  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserIconWithDrop;

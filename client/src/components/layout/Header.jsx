import React, { Suspense, useState, lazy } from 'react';
import { 
  AppBar,
  Box,
  IconButton, 
  Toolbar, 
  Tooltip, 
  Typography,
  Backdrop,
} from "@mui/material";
import { 
  Menu as MenuIcon, 
  Search as SearchIcon, 
  Add as AddIcon, 
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { orange } from '../../constants/Color.js';
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";


const SearchDialog = lazy( () => import("../specific/Search.jsx") );
const NotificationDialog = lazy( () => import("../specific/Notifications.jsx") );
const NewGroupDialog = lazy( () => import("../specific/NewGroup.jsx") );
// import { resetNotificationCount } from "../../redux/reducers/chat";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  // const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => dispatch(setIsNewGroup(true));

  const openNotification = () => {
    dispatch(setIsNotification(true));
    // dispatch(resetNotificationCount());
  };
  
  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };


  return <>
  
    <Box sx={{ flexGrow: 1, height: "3rem" }} >
      <AppBar position='static' sx={{
        bgcolor: orange,
        height: "100%",
      }} >
        <Toolbar sx={{
          minHeight: { xs: "3rem", sm: "3rem" },
        }}>

          <Typography 
            variant='h7'
            sx={{
              display: { xs:"none", sm:"block" }
            }}
          > ChatPro </Typography>

          <Box
            sx={{
              display:{ xs:"block", sm:"none" }
            }}
          >
            <IconButton color='inherit' onClick={handleMobile} >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow:1 }} />

          <Box>

            <IconBtn title={"Search"} icon={<SearchIcon />} onClick={openSearch} />

            <IconBtn title={"New Group"} icon={<AddIcon />} onClick={openNewGroup} />

            <IconBtn title={"Manage Group"} icon={<GroupIcon />} onClick={navigateToGroup} />

            <IconBtn title={"Notifications"} icon={<NotificationIcon />} onClick={openNotification} />

            <IconBtn title={"Logout"} icon={<LogoutIcon />} onClick={logoutHandler} />

          </Box>

        </Toolbar>
      </AppBar > 
    </Box>

    {
      isSearch && (
        <Suspense fallback={ <Backdrop open /> } >
          <SearchDialog />
        </Suspense>
      )
    }

    {
      isNotification && (
        <Suspense fallback={ <Backdrop open /> } >
          <NotificationDialog />
        </Suspense>
      )
    }

    {
      isNewGroup && (
        <Suspense fallback={ <Backdrop open /> } >
          <NewGroupDialog />
        </Suspense>
      )
    }

  </>
};


const IconBtn = ({ title, icon, onClick }) => {

  return (
    <Tooltip title={title} >
      <IconButton color='inherit' size='large' onClick={onClick} >
        {icon}
      </IconButton>
    </Tooltip>
  );

}

export default Header;

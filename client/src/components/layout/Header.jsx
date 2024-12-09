
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


const SearchDialog = lazy( () => import("../specific/Search.jsx") );
const NotificationDialog = lazy( () => import("../specific/Notifications.jsx") );
const NewGroupDialog = lazy( () => import("../specific/NewGroup.jsx") );


const Header = () => {

  const navigate = useNavigate();


  const [isMobile,setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);



  const handleMobile = () => {
    console.log(isMobile);
    setIsMobile( prev => !prev );
  };

  const openSearch = () => {
    setIsSearch( prev => !prev );
  };

  const openNewGroup = () => {
    setIsNewGroup( prev => !prev );
  };

  const openNotification = () => {
    setIsNotification( prev => !prev );
  }
  
  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = () => {
    console.log("logoutHandler");
  };

  const oranges = "#ea7070";


  return <>
  
    <Box sx={{ flexGrow: 1, height: "3rem" }} >
      <AppBar position='static' sx={{
        bgcolor: oranges,
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

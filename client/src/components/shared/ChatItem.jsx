import { Stack } from 'react-router-dom';
import React from 'react';
import { Link } from '../styles/StyledComponents.jsx';
import { Box, Typography } from '@mui/material';

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return <Link to={`/chat/${_id}`}>
    <div style={{
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
      padding: "1rem",
      backgroundColor: sameSender ? "black" : "unset",
      color: sameSender ? "white" : "unset",
      position: "relative"
    }}>

      <Stack >
        <Typography>{name}</Typography>
        {
          newMessageAlert && (
            <Typography> { newMessageAlert.count} New Messsage </Typography>
          )
        }
      </Stack>

      {
        isOnline && <Box>
          
        </Box>
      }

    </div>
  </Link>
}

export default ChatItem
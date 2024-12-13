import React, { memo } from 'react'
import { 
  Dialog, 
  DialogTitle,  
  ListItem,
  Avatar,
  Stack,  
  Typography,
  Button
} from "@Mui/material";
import { sampleNotification } from '../../constants/sampleData';


const Notifications = () => {


  const friendRequestHandler = ({ _id,accept }) => {
    console.log(_id);
  }

  return (
    <Dialog open >
      <Stack p={{ xs: "0.5rem", sm: "1rem" }} maxWidth={"20rem"} >

        <DialogTitle> Notifications</DialogTitle>

        {
          sampleNotification.length > 0 
          ?
            (
              sampleNotification.map( (i) => 
                <NotificationsItems 
                  sender={i.sender} 
                  _id={i._id} 
                  handler={friendRequestHandler} 
                  key={i._id} 
                /> 
              )
            )
          : 
            <Typography textAlign={"center"} >No Notifications</Typography>
        }

      </Stack>
    </Dialog>
  )
}

const NotificationsItems = memo(({ sender,_id, handler  }) => {

  const { name, avatar } = sender;

  return (
    <ListItem >
      <Stack direction={"row"} alignItems='center' spacing={"1rem"} width={"100%"} >

        <Avatar />

        <Typography 
          variant='body1' 
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width:"100%"
          }} 
        > {name} send you the friend request </Typography>

        <Stack direction={{
          xs : "column",
          sm : "row",
        }} >
          <Button onClick={ ()=>handler({_id,accept:true})} > Accept </Button>
          <Button color='error' onClick={ ()=>handler({_id,accept:false})} > Reject </Button>
        </Stack>

      </Stack>
    </ListItem>
  )
});

export default Notifications

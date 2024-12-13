
import React, { useState } from 'react'
import { 
  Dialog, 
  DialogTitle,
  Stack,  
  Typography,
  Button,
  TextField
} from "@Mui/material";
import { sampleUsers as users } from "../../constants/sampleData.js";
import UserItem from '../shared/UserItem';
import { useInputValidation } from "6pp";


const NewGroup = () => {


  const [ members,setMembers ] = useState( users );
  const [ selectedMembers,setSelectedMembers ] = useState([]);


  const  selectMemberHandler = (id) => {

    // setMembers( (prev) => 
    //   prev.map( user => 
    //     user._id === id 
    //       ? { ...user, isAdded : !user.isAdded }
    //       : user
    //   ) 
    // );

    setSelectedMembers( (prev) => 
      ( prev.includes(id) 
      ? prev.filter( (currentid) => currentid !== id ) 
      : [...prev,id] ) 
    );
  };
  console.log(selectedMembers);

  const groupName = useInputValidation("");
  const submitHandler = () => {};

  const closeHandler = () => {};


  return (
    <Dialog open onClose={closeHandler} >
      <Stack p={{ xs: "0.5rem", sm: "2rem" }} spacing={"1.5rem"} width={"20rem"} >

        <DialogTitle textAlign={"center"} variant='h5' > New Group</DialogTitle>

        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />

        <Typography variant="body1" >Members</Typography>

        <Stack>
          {members.map( (i) => (
            <UserItem
              user={i}
              key={i._id} 
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"} >
          <Button variant='text' color='error' >Cancle</Button>
          <Button variant='contained' onClick={submitHandler} >Create</Button>
        </Stack>

      </Stack>
    </Dialog>
  )
}

export default NewGroup
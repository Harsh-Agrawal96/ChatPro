
import React, { useState } from 'react'
import { 
  Dialog, 
  DialogTitle, 
  InputAdornment, 
  List, 
  Stack, 
  TextField, 
  Typography 
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';


const Search = () => {

  const search = useInputValidation("");

  let isLoadingSendFriendRequest = false;
  const [ users, setUsers ] = useState(sampleUsers);

  const addFriendHandler = ( id ) => {
    console.log(id);
  }

  return (
    <Dialog open >
      <Stack p={"1.5rem"} direction={"column"} width={"20rem"} >

        <DialogTitle textAlign={"center"} > Find People </DialogTitle>

        <TextField 
          label="" 
          value={search.value} 
          onChange={search.changeHandler} 
          variant='outlined'
          size='small'
          InputProps={{
            startAdornment:(
              <InputAdornment position='start' >
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <List >
          {
            users.map( (i) => (
              <UserItem
                user={i}
                key={i._id} 
                handler={addFriendHandler} 
                handlerIsLoading={isLoadingSendFriendRequest} 
              />  
            ))
          }
        </List>
      
      </Stack>
    </Dialog>

  )
}

export default Search

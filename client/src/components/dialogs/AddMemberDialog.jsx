import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
// import {
//   useAddGroupMembersMutation,
//   useAvailableFriendsQuery,
// } from "../../redux/api/api";
// import { useAsyncMutation, useErrors } from "../../hooks/hook";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsAddMember } from "../../redux/reducers/misc";
// const AddMemberDialog = ({ chatId }) => {
const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
//   const dispatch = useDispatch();

//   const { isAddMember } = useSelector((state) => state.misc);

//   const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

//   const [addMembers, isLoadingAddMembers] = useAsyncMutation(
//     useAddGroupMembersMutation
//   );

//   const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    // dispatch(setIsAddMember(false));
    setSelectedMembers([]);
    setMembers([]);
  };
  const addMemberSubmitHandler = () => {
    // addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

//   useErrors([{ isError, error }]);

   
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {
          members.length > 0 ? (
            members.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          {/* <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Submit Changes
          </Button> */}
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;

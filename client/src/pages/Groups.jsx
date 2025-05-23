import { KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon, Edit as EditIcon, Done as DoneIcon, Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Box, Drawer, Grid2, IconButton, Tooltip, Stack, Typography, TextField, Button, Backdrop } from "@mui/material";
import React, { useState, memo, useEffect, lazy, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { sampleChats, sampleUsers } from "../constants/sampleData.js";
import { bgGradient, matBlack } from "../constants/color";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const isAddMember = false;


const Groups = () => {

    const chatId = useSearchParams()[0].get("group");
    const navigate = useNavigate();
    console.log(chatId);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

    const navigateBack = () => {
        navigate("/");
    };

    const handleMobile = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };
    const handleMobileClose = () => setIsMobileMenuOpen(false);

    const removeMemberHandler = (userId) => {
      console.log("remove member", userid)
      // removeMember("Removing Member...", { chatId, userId });
    };

    const updateGroupName = () => {
        setIsEdit(false);
        // updateGroup("Updating Group Name...", {
        //   chatId,
        //   name: groupNameUpdatedValue,
        // });
        console.log(groupNameUpdatedValue);
    };

    const openConfirmDeleteHandler = () => {
      setConfirmDeleteDialog(true);
      console.log("delete group")
    };

    const closeConfirmDeleteHandler = () => {
      setConfirmDeleteDialog(false);
    };

    const openAddMemberHandler = () => {
      console.log("add memeber")
      // dispatch(setIsAddMember(true));
    };

    const deleteHandler = () => {
      console.log("delete handler")
      closeConfirmDeleteHandler();
      // deleteGroup("Deleting Group...", chatId);
      // closeConfirmDeleteHandler();
      // navigate("/groups");
    };

    // const removeMemberHandler = (userId) => {
    //   console.log("remove handler")
    //   // removeMember("Removing Member...", { chatId, userId });
    // };

    useEffect(() => {
      if (chatId) {
        setGroupName(`Group Name ${chatId}`);
        setGroupNameUpdatedValue(`Group Name ${chatId}`);
      }

      return () => {
        setGroupName("");
        setGroupNameUpdatedValue("");
        setIsEdit(false);
      };
    }, [chatId]);


    const IconBtns = <>

        <Box sx={{
            display:{
                xs: "block",
                sm: "none",
                position: "fixed",
                right: "1rem",
                top: "1rem",
            }
        }} >
            <IconButton onClick={handleMobile}>
                <MenuIcon />
            </IconButton>
        </Box>

        <Tooltip title="back" >
            <IconButton
            sx={{
                position:"absolute",
                top:"2rem",
                left:"2rem",
                bgcolor:matBlack,
                color:"white",
                ":hover": {
                bgcolor:"rgba(0,0,0,0.7)",
                }
            }}
            onClick={navigateBack}
            >
                <KeyboardBackspaceIcon />
            </IconButton>
        </Tooltip>

    </>;

    const GroupName = (
        <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={"1rem"}
        padding={"3rem"}
        >
        {isEdit ? (
            <>
            <TextField
                value={groupNameUpdatedValue}
                onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            />
            <IconButton onClick={updateGroupName}
            //   disabled={isLoadingGroupName}
            >
                <DoneIcon />
            </IconButton>
            </>
        ) : (
            <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton
                // disabled={isLoadingGroupName}
                onClick={() => setIsEdit(true)}
            >
                <EditIcon />
            </IconButton>
            </>
        )}
        </Stack>
    );

    const ButtonGroup = (
      <Stack
        direction={{
          xs: "column-reverse",
          sm: "row",
        }}
        spacing={"1rem"}
        p={{
          xs: "0",
          sm: "1rem",
          md: "1rem 4rem",
        }}
      >
        <Button
          size="large"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={openConfirmDeleteHandler}
        >
          Delete Group
        </Button>
        <Button
          size="large"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddMemberHandler}
        >
          Add Member
        </Button>
      </Stack>
    );


    return (
        <Grid2 container height={"100vh"} >
            <Grid2
                item
                sx={{
                    display:{ xs: "none", sm: "block" }
                }}
                size={{ sm: 4 }}
                bgcolor={"bisque"}
            >
                <GroupsList myGroups={sampleChats} chatId={chatId} />
            </Grid2>
                    
            <Grid2 
                item
                height={"100%"}
                size={{ xs:12, sm: 8 }}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    padding: "1rem 3rem",
                }}
            >
              {IconBtns}

              {groupName && (
                <>
                  {GroupName}

                  <Typography
                    margin={"2rem"}
                    alignSelf={"flex-start"}
                    variant="body1"
                  >
                    Members
                  </Typography>

                  <Stack
                    maxWidth={"45rem"}
                    width={"100%"}
                    boxSizing={"border-box"}
                    padding={{
                      sm: "1rem",
                      xs: "0",
                      md: "1rem 4rem",
                    }}
                    spacing={"2rem"}
                    height={"50vh"}
                    overflow={"auto"}
                  >
                    {/* Members */}

                    {
                      sampleUsers.map((i) => (
                        <UserItem
                          user={i}
                          key={i._id}
                          isAdded
                          styling={{
                            boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                            padding: "1rem 2rem",
                            borderRadius: "1rem",
                          }}
                          handler={removeMemberHandler}
                        />
                      )
                    )}
                  </Stack>

                  {ButtonGroup}
                </>
              )}
            </Grid2>

            {isAddMember && (
              <Suspense fallback={<Backdrop open />}>
                <AddMemberDialog chatId={chatId} />
              </Suspense>
            )}

            {confirmDeleteDialog && (
              <Suspense fallback={<Backdrop open />}>
                <ConfirmDeleteDialog
                  open={confirmDeleteDialog}
                  handleClose={closeConfirmDeleteHandler}
                  deleteHandler={deleteHandler}
                />
              </Suspense>
            )}

            <Drawer sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}
              open={isMobileMenuOpen}
              onClose={handleMobileClose}
            >
                <GroupsList
                  w={"50vw"}
                />
            </Drawer>

        </Grid2>
    )

}


const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      backgroundImage: bgGradient,
      height: "100vh",
      overflow: "auto",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
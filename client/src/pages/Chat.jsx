
import React, { Fragment, useRef, useState } from "react";
import { Container, IconButton, Paper, Stack } from '@mui/material';
import AppLayout from "../components/layout/AppLayout";
import { AttachFile as AttackFileIcon, Send as SendIcon } from "@mui/icons-material";
import { grayColor,orange } from "../constants/Color";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu.jsx";
import { sampleMessages } from "../constants/sampleData.js";
import MessageComponent from "../components/shared/MessageComponent.jsx";


const user = {
    _id : "saidfasdfasdf",
    name : "Harsh"
}

const Chat = () => {


    const containerRef = useRef(null);

    // const fileMenuRef = useRef(null);
  
    return (
        <Fragment>

            <Stack
                ref={containerRef}
                padding={"0.5rem"}
                spacing={"0.5rem"}
                bgcolor={grayColor}
                height={"90%"}
                sx={{
                    overflowX: "hidden",
                    overflowY: "auto"
                }}
            >
                {
                    sampleMessages.map((i) => (
                        <MessageComponent message={i} user={user} />
                    ))
                }
            </Stack>
            <form style={{
                height: "10%",
            }}>
                <Stack 
                    direction={"row"} 
                    height={"100%"}
                    padding={"0.5rem"}
                    alignItems={"center"}
                    position={"relative"} 
                >
                    <IconButton 
                        sx={{
                            position: "absolute",
                            left: "1rem",
                            rotate:"30deg"
                        }}
                        // ref={fileMenuRef}
                    >
                        <AttackFileIcon  />
                    </IconButton>

                    <InputBox placeholder="Type Message Here..." />

                    <IconButton 
                        type="submit" 
                        sx={{
                            rotate: "-30deg",
                            backgroundColor: orange,
                            color: "white",
                            marginLeft: "0.5rem",
                            padding: "0.5rem",
                            "&:hover": {
                                bgcolor: "error.dark",
                                
                            }
                    }} >
                        <SendIcon  />
                    </IconButton>
                </Stack>
            </form>

            <FileMenu  />

        </Fragment>
    )

}

export default AppLayout()(Chat);
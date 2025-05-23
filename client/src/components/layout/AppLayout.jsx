import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from './Header';
import Title from '../shared/Title';
import { 
    Grid2,
    Drawer,
    Skeleton
} from "@mui/material";
import ChatList from './ChatList.jsx';
import { sampleChats } from '../../constants/sampleData';
import { useNavigate, useParams } from "react-router-dom";
import Profile from '../specific/Profile.jsx';
import { useMyChatsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";


const AppLayout = () => ( WrappedComponent ) => {

    return (props) =>{
        const params = useParams();
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const  chatId = params.chatId;

        const { isMobile } = useSelector((state) => state.misc);
        const { user } = useSelector((state) => state.auth);

        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

        useErrors([{ isError, error }]);

        const handleMobileClose = () => dispatch(setIsMobile(false));

        const handleDeleteChat = ( e, _id, groupChat ) => {
            e.preventDefault();
            console.log( " see that it is cliked or not ");
        }

        return (
            <>
                <Title />
                <Header />

                {isLoading ? (
                    <Skeleton />
                    ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                        w="70vw"
                        chats={data?.chats}
                        chatId={chatId}
                        handleDeleteChat={handleDeleteChat}
                        // newMessagesAlert={newMessagesAlert}
                        // onlineUsers={onlineUsers}
                        />
                    </Drawer>
                    )}

                <Grid2 container size={12} height={"calc(100vh - 3rem)"} >
                    <Grid2
                        item
                        height={"100%"}
                        size={{ sm: 4, md: 3 }}
                        sx={{
                            display:{ xs: "none", sm: "block" }
                        }}
                    >
                        {isLoading ? (
                            <Skeleton />
                            ) : (
                            <ChatList
                                chats={data?.chats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                                // newMessagesAlert={newMessagesAlert}
                                // onlineUsers={onlineUsers}
                            />
                            )}
                    </Grid2>

                    <Grid2 item height={"100%"} size={{ xs:12, sm: 8, md: 6, lg:6 }} >
                        <WrappedComponent {...props} />
                    </Grid2>
                    
                    <Grid2 
                        item
                        height={"100%"}
                        size={{ md: 4, md: 3 }}
                        sx={{
                            display:{ xs: "none", md: "block" },
                            padding: "1.5rem",
                            backgroundColor: "rgba(0,0,0,0.85)",
                        }}
                    >
                        <Profile user={user} />
                    </Grid2>

                </Grid2>
            </>
        );
    };
};

export default AppLayout

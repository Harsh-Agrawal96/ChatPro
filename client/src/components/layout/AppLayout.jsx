import React, { 
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from './Header';
import Title from '../shared/Title';
import { 
    Grid2,
    Drawer,
    Skeleton
} from "@mui/material";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events";
import ChatList from './ChatList.jsx';
import { useNavigate, useParams } from "react-router-dom";
import Profile from '../specific/Profile.jsx';
import { useMyChatsQuery } from "../../redux/api/api";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import { getSocket } from "../../socket";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";


const AppLayout = () => ( WrappedComponent ) => {

    return (props) =>{
        const params = useParams();
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const socket = getSocket();

        const  chatId = params.chatId;

        const deleteMenuAnchor = useRef(null);

        const [onlineUsers, setOnlineUsers] = useState([]);

        const { isMobile } = useSelector((state) => state.misc);
        const { user } = useSelector((state) => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);

        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

        useErrors([{ isError, error }]);

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
        }, [newMessagesAlert]);

        const handleDeleteChat = (e, chatId, groupChat) => {
        dispatch(setIsDeleteMenu(true));
        dispatch(setSelectedDeleteChat({ chatId, groupChat }));
        deleteMenuAnchor.current = e.currentTarget;
        };

        const handleMobileClose = () => dispatch(setIsMobile(false));

        const newMessageAlertListener = useCallback(
        (data) => {
            if (data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        },
        [chatId]
        );

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch]);

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/");
        }, [refetch, navigate]);

        const onlineUsersListener = useCallback((data) => {
            console.log(data)
            setOnlineUsers(data);
        }, []);

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,
        };

        useSocketEvents(socket, eventHandlers);

        return (
            <>
                <Title />
                <Header />

                <DeleteChatMenu
                    dispatch={dispatch}
                    deleteMenuAnchor={deleteMenuAnchor}
                />

                {isLoading ? (
                    <Skeleton />
                    ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                        w="70vw"
                        chats={data?.chats}
                        chatId={chatId}
                        handleDeleteChat={handleDeleteChat}
                        newMessagesAlert={newMessagesAlert}
                        onlineUsers={onlineUsers}
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
                                newMessagesAlert={newMessagesAlert}
                                onlineUsers={onlineUsers}
                            />
                            )}
                    </Grid2>

                    <Grid2 item height={"100%"} size={{ xs:12, sm: 8, md: 6, lg:6 }} >
                        <WrappedComponent {...props} chatId={chatId} user={user} />
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

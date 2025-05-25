import React, { Fragment, useRef, useState } from "react";
import { Container, IconButton, Paper, Stack } from '@mui/material';
import AppLayout from "../components/layout/AppLayout";
import { AttachFile as AttackFileIcon, Send as SendIcon } from "@mui/icons-material";
import { grayColor,orange } from "../constants/Color";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu.jsx";
import MessageComponent from "../components/shared/MessageComponent.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../socket";
import { 
    useChatDetailsQuery,
    useGetMessagesQuery
} from "../redux/api/api";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { 
    useErrors,
    useSocketEvents
} from "../hooks/hook";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../redux/reducers/misc";
import { TypingLoader } from "../components/layout/Loaders";


const Chat = ({ chatId, user }) => {
    const socket = getSocket();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

    const [IamTyping, setIamTyping] = useState(false);
    const [userTyping, setUserTyping] = useState(false);

    const containerRef = useRef(null);
    const bottomRef = useRef(null);
    const typingTimeout = useRef(null);

    const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
    const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

    const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
        containerRef,
        oldMessagesChunk.data?.totalPages,
        page,
        setPage,
        oldMessagesChunk.data?.messages
    );

    const members = chatDetails?.data?.chat?.members;

    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
        { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
    ];

    const handleFileOpen = (e) => {
        dispatch(setIsFileMenu(true));
        setFileMenuAnchor(e.currentTarget);
    };

    const messageOnChange = (e) => {
        setMessage(e.target.value);

        if (!IamTyping) {
          socket.emit(START_TYPING, { members, chatId });
          setIamTyping(true);
        }

        if (typingTimeout.current) clearTimeout(typingTimeout.current);

        typingTimeout.current = setTimeout(() => {
          socket.emit(STOP_TYPING, { members, chatId });
          setIamTyping(false);
        }, [1000]);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        // Emitting the message to the server
        socket.emit(NEW_MESSAGE, { chatId, members, message });
        setMessage("");
    };

    useEffect(() => {
        if (bottomRef.current)
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        socket.emit(CHAT_JOINED, { userId: user._id, members });
        dispatch(removeNewMessagesAlert(chatId));

        return () => {
            setMessages([]);
            setMessage("");
            setOldMessages([]);
            setPage(1);
            socket.emit(CHAT_LEAVED, { userId: user._id, members });
        };
    }, [chatId]);

    const newMessagesListener = useCallback(
        (data) => {
        if (data.chatId !== chatId) return;

        setMessages((prev) => [...prev, data.message]);
        },
        [chatId]
    );

    const startTypingListener = useCallback(
        (data) => {
        if (data.chatId !== chatId) return;

        setUserTyping(true);
        },
        [chatId]
    );

    const stopTypingListener = useCallback(
        (data) => {
        if (data.chatId !== chatId) return;
        setUserTyping(false);
        },
        [chatId]
    );

    const alertListener = useCallback(
        (data) => {
        if (data.chatId !== chatId) return;
        const messageForAlert = {
            content: data.message,
            sender: {
            _id: "lss03lLFOSLso90LSls0slL34",
            name: "Admin",
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, messageForAlert]);
        },
        [chatId]
    );

    const eventHandler = {
        [NEW_MESSAGE]: newMessagesListener,
        [START_TYPING]: startTypingListener,
        [STOP_TYPING]: stopTypingListener,
        [ALERT]: alertListener,
    };

    useSocketEvents(socket, eventHandler);

    useErrors(errors);

    const allMessages = [...oldMessages, ...messages];
  
    return chatDetails.isLoading ? (
        <Skeleton />
    ) : (
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
                {allMessages.map((i) => (
                    <MessageComponent key={i._id} message={i} user={user} />
                ))}

                {userTyping && <TypingLoader />}

                <div ref={bottomRef} />
            </Stack>
            <form style={{
                height: "10%",
              }}
              onSubmit={submitHandler}
            >
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
                        onClick={handleFileOpen}
                    >
                        <AttackFileIcon  />
                    </IconButton>

                    <InputBox 
                        placeholder="Type Message Here..." 
                        value={message}
                        onChange={messageOnChange}
                    />

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

            <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}  />
        </Fragment>
    )

}

export default AppLayout()(Chat);
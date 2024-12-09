
import React from 'react'
import Header from './Header';
import Title from '../shared/Title';
import { Grid2 } from "@mui/material";
import ChatList from './ChatList.jsx';
import { sampleChats } from '../../constants/sampleData';
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile.jsx';

const AppLayout = () => ( WrappedComponent ) => {

    return (props) =>{

        const params = useParams();
        const  chatId = params.chatId;

        const handleDeleteChat = ( e, _id, groupChat ) => {
            e.preventDefault();
            console.log( " see that it is cliked or not ");
        }

        return (
            <>
                <Title />
                <Header />

                <Grid2 container size={12} height={"calc(100vh - 3rem)"} >
                    <Grid2
                        item
                        height={"100%"}
                        size={{ sm: 4, md: 3 }}
                        sx={{
                            display:{ xs: "none", sm: "block" }
                        }}
                    >
                        < ChatList 
                            chats={sampleChats} 
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                        />
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
                        <Profile />
                    </Grid2>

                </Grid2>
            </>
        );
    };
};

export default AppLayout

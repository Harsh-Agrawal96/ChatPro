
import React from 'react'
import Header from './Header';
import Title from '../shared/Title';
import { Grid2 } from "@mui/material";
import ChatList from './ChatList';

const AppLayout = () => ( WrappedComponent ) => {

    return (props) =>{
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
                        < ChatList />
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
                    > Third </Grid2>

                </Grid2>
            </>
        );
    };
};

export default AppLayout

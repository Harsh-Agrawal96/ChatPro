import React from 'react'
import AppLayout from '../components/layout/AppLayout';
import { Typography, Box } from "@mui/material";
import { grayColor } from '../constants/Color';


const Home = () => {

    return (
        <>
            <Box height={"100%"} bgcolor={grayColor} >
                <Typography p={"1.5rem"} variant='h6' textAlign={"center"} >Select Chat and send/receive messages</Typography>
            </Box>
        </>
    )
}


export default AppLayout()(Home);

import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Stack, Avatar, IconButton } from '@mui/material';
import { CameraAlt } from "@mui/icons-material"
import { VisuallyHiddenInput } from "../components/styles/StyledComponents.jsx"
import { useInputValidation, useFileHandler } from "6pp";
import { usernameValidator } from '../utils/validator.js';


const Login = () => {


    const [isLogin,setIsLogin] = useState(true);

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const password = useInputValidation("");
    const username = useInputValidation("", usernameValidator );

    const avatar = useFileHandler("single",2);

    const handleLogin = (e) => {
        e.preventDefault();
    }
    
    const handleSignUp = (e) => {
        e.preventDefault();
    }

    return <Container 
                component={"main"} 
                maxWidth="xs" 
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }} >

        <Paper elevation={5} 
            sx={{
                width: "20em",
                padding:2,
                paddingX:3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            { isLogin ? 
                <>
                    <Typography sx={{ marginTop: "0.7em" }} variant='h5'>Login</Typography>
                    <form 
                        style={{
                            width:"100%",
                            marginTop: "1rem"
                        }}
                        onSubmit={handleLogin}
                        >

                        <TextField
                            required 
                            fullWidth
                            size="small"
                            label="Username"
                            margin='dense'
                            variant='outlined'
                            value={username.value}
                            onChange={username.changeHandler}
                        />
                        <TextField
                            size="small"
                            required 
                            fullWidth
                            label="Password"
                            margin='dense'
                            variant='outlined'
                            type='password'
                            onChange={password.changeHandler}
                        />

                        <Button 
                            sx={{
                                marginTop: "1rem",
                            }} 
                            variant='contained' 
                            color='primary' 
                            type='submit'
                            fullWidth 
                        > Login </Button>

                        <Typography textAlign={"center"} sx={{ marginTop: "1rem" }} > OR </Typography>

                        <Button 
                            sx={{
                                marginTop: "1rem",
                            }} 
                            fullWidth
                            variant='text' 
                            color="info"
                            onClick={ () => setIsLogin( (prev) => !prev ) }
                        > Sign Up Instead </Button>

                    </form>
                </>
             : 
                <>
     
                    <Typography variant='h5' sx={{ margin:"0.7em" }} >Sign Up</Typography>
                    <Stack position={"relative"} width={"7.5rem"} margin={"auto"} >
                            <Avatar 
                                sx={{
                                    width: "7.5rem",
                                    height: "7.5rem",
                                }} 
                                src={avatar.preview}
                            />
                            <IconButton 
                                sx={{
                                    width: "1em",
                                    height: "1em",
                                    position: "absolute",
                                    bottom: "0",
                                    right: "0",
                                    color: "white",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    ":hover" : {
                                        backgroundColor: "rgba(0,0,0,0.7)",
                                    }
                                }}  
                                component="label"
                            >
                                <>
                                    <CameraAlt sx={{ width:"0.65em", height:"0.65em"}} />
                                    <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                </>
                            </IconButton>
                            
                    </Stack>
                    {
                        avatar.error && (
                            <Typography m={"0.5rem auto"} width={"fit-content"} display={"block"} color='error' variant='caption' >
                                {avatar.error}
                            </Typography>
                        )
                    }
                    <form 
                        style={{
                            width:"100%",
                            marginTop: "1rem"
                        }} 
                        onSubmit={handleSignUp}
                        >

                        <TextField
                            required 
                            fullWidth
                            size="small"
                            label="Name"
                            margin='dense'
                            variant='outlined'
                            value={name.value}
                            onChange={name.changeHandler}
                        />
                        <TextField
                            required
                            fullWidth
                            size="small"
                            label="Username"
                            margin='dense'
                            variant='outlined'
                            value={username.value}
                            onChange={username.changeHandler}
                        />
                        {
                            username.error && (
                                <Typography color='error' variant='caption' >
                                    {username.error}
                                </Typography>
                            )
                        }
                        <TextField
                            required 
                            fullWidth
                            size="small"
                            label="Bio"
                            margin='dense'
                            variant='outlined'
                            value={bio.value}
                            onChange={bio.changeHandler}
                        />
                        <TextField
                            required 
                            fullWidth
                            size="small"
                            label="Password"
                            margin='dense'
                            variant='outlined'
                            type='password'
                            onChange={password.changeHandler}
                        />

                        <Button 
                            sx={{
                                marginTop: "1rem",
                            }} 
                            variant='contained' 
                            color='primary' 
                            type='submit'
                            fullWidth 
                        > Sign Up </Button>

                        <Typography textAlign={"center"} sx={{ marginTop: "1rem" }} > OR </Typography>

                        <Button 
                            sx={{
                                marginTop: "1rem",
                            }} 
                            fullWidth
                            variant='text' 
                            color="info"
                            onClick={ () => setIsLogin( (prev) => !prev ) }
                        > Login Instead </Button>

                    </form>
                </>
            }
            
        </Paper>

    </Container>
        
    

};

export default Login;
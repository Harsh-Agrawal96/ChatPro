import { Avatar, AvatarGroup, Stack, Box } from '@mui/material'
import React from 'react'

const AvatarCard = ({ avatar = [], max = 4 }) => {

  return (

    <Stack direction={"row"} spacing={0.5} >
        <AvatarGroup max={max} >
            <Box width={"4rem"} height={"2rem"} >

                {avatar.map(( i,index ) => (
                    <Avatar
                        key={ Math.random()*100 }
                        src={i}
                        alt={`Avatar ${index}`}
                        sx={{
                            width:"2rem",
                            height: "2rem",
                            position:"absolute",
                            left: {
                                xs: `${ 0.5 + index }rem`,
                                sm: `${index}rem`
                            }
                        }}
                    />
                ))}

            </Box>
        </AvatarGroup>
    </Stack>

  );

}

export default AvatarCard
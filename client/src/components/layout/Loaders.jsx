import { Grid2, Skeleton, Stack } from '@mui/material'
import React from 'react'

export const LayoutLoader = () => {

    return <Grid2 container size={12} height={"calc(100vh - 3rem)"} spacing={"0.5rem"} >
    <Grid2
        item
        height={"100%"}
        size={{ sm: 4, md: 3 }}
        sx={{
            display:{ xs: "none", sm: "block" }
        }}
    >
        <Skeleton variant='rectangular' height={"100vh"} />
    </Grid2>

    <Grid2 item height={"100%"} size={{ xs:12, sm: 8, md: 6, lg:6 }} >
        <Stack spacing={"0.8rem"} >
            {
                Array.from( { length: 10 }).map((_, index ) => (
                    <Skeleton key={index} variant='rounded' height={"4rem"} />
                ))
            }
        </Stack>
    </Grid2>
        
    <Grid2
        item
        height={"100%"}
        size={{ md: 4, md: 3 }}
        sx={{
            display:{ xs: "none", md: "block" },
        }}
    >
        <Skeleton variant='rectangular' height={"100vh"} />
    </Grid2>

</Grid2>
}
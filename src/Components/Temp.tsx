import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


 const Temp = () => {
 const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Button variant='contained' size='large' onClick={() => navigate("/recruiterPage")}>לדף המגייסים</Button>
                <Button variant='contained' size='large' sx={{mt: 2}} onClick={() => navigate("/drushimPage")}>לדף דרושים</Button>
            </Box>
        </Box>
    )
}

export default Temp;
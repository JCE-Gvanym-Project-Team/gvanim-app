import { Box } from '@mui/material'
import React from 'react'
import NavBar from '../../AllJobsPage/Resources/navbar.jpeg';

export default function Navbar()
{
    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', top: 0}}>
            <img src={NavBar} alt="NavBar" style={{width: '100%'}} />
        </Box>
    )
}

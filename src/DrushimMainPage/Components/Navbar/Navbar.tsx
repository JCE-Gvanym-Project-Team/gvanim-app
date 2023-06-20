import { Box, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import React from 'react'
import Logo from '../../../Components/Logo/logo.png';

export default function Navbar() {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', top: 0 }}>
            <Stack direction='row' justifyContent='space-between' sx={{ height: '85px', backgroundColor: '#FFFFFF', paddingLeft: 2, paddingRight: 4, borderTop: '5px solid #053B7A' }}>
                <Stack direction='row' id='logo' sx={{ mt: '5px' }} spacing={10}>
                    <img src={Logo} alt="Logo" style={{ height: '70px' }} />
                    <Stack direction='column' justifyContent='center' >
                        <Stack direction='row' spacing={4}>
                            <Box>
                                <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/`}>
                                    <Box>
                                    <Typography sx={{ color: '#053B7A', font: 'normal normal normal 22px Rubik', opacity: 1, letterSpacing: '0px', mb: 0 }}>
                                        ראשי
                                    </Typography>

        //                             <Box sx={{
        //                                 mt: 0,
        //                                 background: '#053B7A 0% 0% no-repeat padding-box',
        //                                 height: '1px',
        //                                 borderRadius: '1px',
        //                             }} />
        //                             </Box>
        //                         </Link>
        //                     </Box>
                      
        //                     <Box>
        //                         <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`/career/jobs`}>
        //                             <Box>
        //                             <Typography sx={{ color: '#053B7A', font: 'normal normal normal 22px Rubik', opacity: 1, letterSpacing: '0px', mb: 0 }}>
        //                                 משרות
        //                             </Typography>

        //                             <Box sx={{
        //                                 mt: 0,
        //                                 background: '#053B7A 0% 0% no-repeat padding-box',
        //                                 height: '1px',
        //                                 borderRadius: '1px',
        //                             }} />
        //                             </Box>
        //                         </Link>
        //                     </Box>
        //                     <Box>
        //                         <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/index.php/he/node/4`}>
        //                             <Box>
        //                             <Typography sx={{ color: '#053B7A', font: 'normal normal normal 22px Rubik', opacity: 1, letterSpacing: '0px', mb: 0 }}>
        //                                 אודות
        //                             </Typography>

        //                             <Box sx={{
        //                                 mt: 0,
        //                                 background: '#053B7A 0% 0% no-repeat padding-box',
        //                                 height: '1px',
        //                                 borderRadius: '1px',
        //                             }} />
        //                             </Box>
        //                         </Link>
        //                     </Box>


        //                 </Stack>
        //             </Stack>
        //         </Stack>
        //         <Stack direction='column' justifyContent='center' >
        //             <Stack direction='row' spacing={2}>
        //                 <Box>
        //                     <Typography sx={{
        //                         font: 'normal normal normal 18px Rubik',
        //                         color: '#91A749',
        //                         letterSpacing: 0,
        //                         opacity: 1,
        //                     }}>צריכים עזרה? דברו איתנו
        //                     </Typography>

        //                     <Box sx={{
        //                         mt: 0,
        //                         background: '#91A749 0% 0% no-repeat padding-box',
        //                         height: '1.5px',
        //                         borderRadius: '1px',
        //                     }} />

        //                 </Box>

        //                 <Typography sx={{
        //                     font: 'normal normal normal 18px Rubik',
        //                     color: '#5BA1AA',
        //                     letterSpacing: 0,
        //                     opacity: 1,
        //                 }}>
        //                     9913*
        //                 </Typography>
        //             </Stack>
        //         </Stack>
        //     </Stack>
        // </Box>
        <></>
    )
}

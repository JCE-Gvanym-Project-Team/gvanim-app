import { ArticleOutlined, Edit, Save } from '@mui/icons-material';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import AccountSettings from '../AccountSettings';
import PasswordSettings from '../../PasswordSettings/PasswordSettings';
import { MyPaperSx, BoxGradientSx } from '../../../../../../../../../ManageJobsPage/Components/NewJobPage/NewJobStyle';
import LockOpenIcon from '@mui/icons-material/LockOpen';


export default function UpdateAccount() {
    const [passwordEdit, setPasswordEdit] = React.useState(true);

    return (
        <>
            <Box sx={BoxGradientSx}>

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    right: '2%',
                    left: 'auto',
                    top: '15%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    right: '10%',
                    left: 'auto',
                    top: '0%',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '170px',
                    height: '170px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '40%',
                    top: '-1%',
                    right: 'auto',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />


                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: 'auto',
                    top: '16%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '-2%',
                    top: '12%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '4%',
                    top: '8%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '25%',
                    top: '12%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', top: "165px", position: "absolute" }}>
                    <Stack direction='column'>
                        <Stack direction='row' justifyContent='center' spacing={1}>

                            {/* <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> */}
                            {/* <ArticleOutlined sx={{ color: '#fff' }} /> */}
                            {/* </Box> */}
                            <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: '#fff', textAlign: 'center' }} variant='h4'>
                                <LockOpenIcon sx={{ color: 'rgb(52, 71, 103)', fontSize: 20 }} /> אפס\י סיסמא 


                            </Typography>

                        </Stack>

                        <Typography sx={{ opacity: 0.6, width: '100%', textAlign: 'center', color: '#fff', fontSize: '16px', fontFamily: "'Noto Sans Hebrew', sans-serif", mt: 1 }} variant='subtitle1'>
                             בחר\י סיסמא חזקה בעלת 8-12 תווים וחייבת לכלול אות גדולה ואות קטנה באנגלית וספרה בין 0-9
                        </Typography>
                        <Box sx={{ background: 'linear-gradient(90deg,hsla(0,0%,100%,0),#fff,hsla(0,0%,100%,0))', padding: 0.05, width: '100%', mt: 2 }} />
                    </Stack>

                </Box>
            </Box>


            <Box sx={MyPaperSx}>

                <Box textAlign="center">
                    <Stack p={2} direction='column' spacing={2}>
                        <Divider />

                        <Box>

                            <Stack direction='row'>
                                <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'></Typography>
                            </Stack>
                            <PasswordSettings passwordEdit={passwordEdit} />
                        </Box>
                    </Stack>
                </Box>
            </Box>

        </>
    );

}




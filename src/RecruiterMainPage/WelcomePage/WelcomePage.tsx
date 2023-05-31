import { Box, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material'
import { BoxGradientSx, MyGridItemSx, MyGridSx, MyPaperSx, MyTypographyInfoSx, MyTypographyMainSx, MyTypographyTitleSx } from './WelcomePageStyle'
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";



export default function WelcomePage() {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={BoxGradientSx}>

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    right: '4%',
                    left: 'auto',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    right: '10%',
                    left: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '200px',
                    height: '200px',
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
                    width: '120px',
                    height: '120px',
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


            </Box>

            <Paper sx={MyPaperSx}>

                <Grid sx={MyGridSx}>
                    <Grid item sx={MyGridItemSx}>
                        <Typography sx={MyTypographyMainSx}>
                            70
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            משרות חדשות
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            משרות חדשות שנוספו או עודכנו, למעבר לדף ניהול המשרות:
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>

                            <Link onClick={()=>navigate("/manageJobs")}
                                sx={{
                                    cursor: 'pointer',
                                    ":hover > #arrow": {
                                        transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                        transform: 'translateX(5px)',
                                        color: '#555abf'
                                    },
                                    ":hover": { color: '#555abf' },
                                    color: '#7795f8',
                                    textDecoration: 'unset',
                                    display: 'flex', flexDirection: 'row'
                                }}>

                                <Typography>
                                    לחץ כאן
                                </Typography>

                                <ArrowBack id="arrow" sx={{
                                    color: '#7795f8',
                                    marginLeft: 1,

                                }} />
                            </Link>

                        </Box>

                    </Grid>

                    <Divider orientation="vertical" flexItem />

                    <Grid item sx={MyGridItemSx}>

                        <Typography sx={MyTypographyMainSx}>
                            13
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            דוחות חדשים
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            דוחות חדשים שנוספו או עודכנו, למעבר לדף ניהול הדוחות:
                        </Typography>


                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>

                            <Link onClick={()=>navigate("/reports")}
                                sx={{
                                    cursor: 'pointer',
                                    ":hover > #arrow": {
                                        transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                        transform: 'translateX(5px)',
                                        color: '#555abf'
                                    },
                                    ":hover": { color: '#555abf' },
                                    color: '#7795f8',
                                    textDecoration: 'unset',
                                    display: 'flex', flexDirection: 'row'
                                }}>

                                <Typography>
                                    לחץ כאן
                                </Typography>

                                <ArrowBack id="arrow" sx={{
                                    color: '#7795f8',
                                    marginLeft: 1,

                                }} />
                            </Link>

                        </Box>

                    </Grid>

                    <Divider orientation="vertical" flexItem />


                    <Grid item sx={MyGridItemSx}>
                        <Typography sx={MyTypographyMainSx}>
                            22
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            מועמדים חדשים
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            מועמדים חדשים שנוספו או שחל שינוי בסטטוס שלהם, למעבר לדף ניהול המועמדים:
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>

                            <Link onClick={()=>navigate("/manageCandidates")} 
                                sx={{
                                    cursor: 'pointer',
                                    ":hover > #arrow": {
                                        transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                        transform: 'translateX(5px)',
                                        color: '#555abf'
                                    },
                                    ":hover": { color: '#555abf' },
                                    color: '#7795f8',
                                    textDecoration: 'unset',
                                    display: 'flex', flexDirection: 'row'
                                }}>

                                <Typography>
                                    לחץ כאן
                                </Typography>

                                <ArrowBack id="arrow" sx={{
                                    color: '#7795f8',
                                    marginLeft: 1,

                                }} />
                            </Link>

                        </Box>
                    </Grid>
                </Grid>

            </Paper>

            <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>

            </Stack>
        </>
    )
}

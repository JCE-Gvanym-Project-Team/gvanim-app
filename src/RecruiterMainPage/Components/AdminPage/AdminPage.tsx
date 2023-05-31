import Box from '@mui/material/Box';
import { Paper, Stack, Typography } from '@mui/material';
import { MyPaperSx } from './AdminPageStyle';
import { BoxGradientSx } from '../../PageStyles';
import { Settings } from '@mui/icons-material';
import TabsPanel from './Components/TabsPanel/TabsPanel';


export default function AdminPage() {
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
                    right: '-5%',
                    top: '20%',
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

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Stack direction='row' spacing={1}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Settings sx={{ color: '#fff' }} />
                        </Box>
                        <Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 500 }}>
                           הגדרות
                        </Typography>
                    </Stack>
                </Box>
            </Box>

            <Paper sx={MyPaperSx}>

                <TabsPanel />
            </Paper>
        </>

    );
}
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import { BoxGradientSx, MyPaperSx } from './AdminPageStyle';
import MyTabPanel from './Components/TabsPanel/TabsPanel';
import GvanimAvatar from './Components/GvanimAvatar/GvanimAvatar';


export default function AdminPage() {
    return (
        <>
            <Box sx={BoxGradientSx} />

            <Paper sx={MyPaperSx}>
                <MyTabPanel />
            </Paper>
        </>

    );
}
import { useState, useEffect } from "react";

import MyTable from "./Components/MyTable/MyTable";
import { Box, Stack, Typography } from "@mui/material";
import MyLoading from "../../Components/MyLoading/MyLoading";
import { ManageJobPageBoxSx } from "./ManageJobsPageStyle";
import TransitionComponentSnackbar from "./Components/NewJobPage/Components/SuccessSnackBar/SuccessSnackBar";
import { useLocation } from "react-router-dom";
import { BoxGradientSx } from "../PageStyles";
import { ArticleOutlined } from "@mui/icons-material";


const ManageJobsPage = () => {
    const [loading, setLoading] = useState(true);
    const [dataSize, setDataSize] = useState(0);
    const [open, setOpen] = useState(false);

    const { state } = useLocation();

        // for the snackbar
        if (state !== null) {
            setOpen(true);
        }


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);


    if (loading) {
        return (<MyLoading />);
    }
    else {
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
                        right: '5%',
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
                        left: '2%',
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
                        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <ArticleOutlined sx={{color: '#fff'}} />
                        </Box>
                       <Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 500 }}>
                            ניהול משרות
                        </Typography>
                       </Stack>
                    </Box>
                </Box>


                <Box className="ManageJobPage-Body" sx={ManageJobPageBoxSx}>

                    <MyTable setDataSize={setDataSize} />

                    <TransitionComponentSnackbar open={open} setOpen={setOpen} message={state} />
                </Box>

            </>



        );
    }
}


export default ManageJobsPage;

import { useState, useEffect } from "react";

import MyTable from "./Components/MyTable/MyTable";
import { Alert, AlertProps, Box, Snackbar, Stack, Typography } from "@mui/material";
import MyLoading from "../../Components/MyLoading/MyLoading";
import { ManageJobPageBoxSx } from "./ManageJobsPageStyle";
import TransitionComponentSnackbar from "./Components/NewJobPage/Components/SuccessSnackBar/SuccessSnackBar";
import { useLocation } from "react-router-dom";
import { BoxGradientSx } from "../PageStyles";
import { ArticleOutlined } from "@mui/icons-material";


const ManageJobsPage = () => {
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

    const { state } = useLocation();


    useEffect(() => {
        setLoading(false);

        if (state !== null) {
            setSnackbar({ children: state?.msg , severity: 'success' });
            window.history.replaceState({}, document.title); // clean state
        }
    }, []);


    const handleCloseSnackbar = () => setSnackbar(null);

    return (
        <>
            {loading ? (
                <MyLoading loading={loading} setLoading={setLoading} />
            ) :
                (
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


                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "end", height: "190px"}}>
                                <Stack direction='row' spacing={1}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <ArticleOutlined sx={{ color: '#fff' }} />
                                    </Box>
                                    <Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 500 }}>
                                        ניהול משרות
                                    </Typography>
                                </Stack>
                            </Box>
                        </Box>


                        <Box className="ManageJobPage-Body" sx={ManageJobPageBoxSx}>

                            <MyTable />

                            {/* <TransitionComponentSnackbar open={open} setOpen={setOpen} message={state} /> */}
                            {!!snackbar && (
                                <Snackbar
                                    open
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                    onClose={handleCloseSnackbar}
                                    autoHideDuration={6000}
                                >
                                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                                </Snackbar>
                            )}
                        </Box>

                    </>
                )}
        </>



    );
}



export default ManageJobsPage;

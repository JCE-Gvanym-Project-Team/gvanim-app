import { useState, useEffect } from "react";

import MyTable from "./Components/MyTable/MyTable";
import { Box, Button, Container, Fab, Typography } from "@mui/material";
import MyLoading from "../../Components/MyLoading/MyLoading";
import { ManageJobPageBoxSx } from "./ManageJobsPageStyle";
import TransitionComponentSnackbar from "./Components/NewJobPage/Components/SuccessSnackBar/SuccessSnackBar";
import { useLocation } from "react-router-dom";
import { BoxGradientSx } from "../PageStyles";


const ManageJobsPage = () => {
    const [loading, setLoading] = useState(true);
    const [dataSize, setDataSize] = useState(0);
    const [open, setOpen] = useState(false);

    const { state } = useLocation();



    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            // for the snackbar
            if( state !== null ) {
                setOpen(true);
            }

        }, 1000);
    }, []);


    if (loading) {
        return (<MyLoading />);
    }
    else {
        return (
            <>
                    <Box sx={BoxGradientSx}>
                        <Box sx={{display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
                            <Typography variant="h4" sx={{color: '#fff',fontFamily: "'Noto Sans Hebrew', sans-serif",fontWeight: 500}}>
                                ניהול משרות
                            </Typography>
                        </Box>
                    </Box>

                    
                <Box className="ManageJobPage-Body" sx={ManageJobPageBoxSx}>
              
                    {/* <Container sx={MyAvatarContainerSx} maxWidth="sm">
                        <MyAvatar dataSize={dataSize} />
                    </Container> */}

                    <MyTable setDataSize={setDataSize} />

                    <TransitionComponentSnackbar open={open} setOpen={setOpen} message={state} />
                </Box>

            </>



        );
    }
}


export default ManageJobsPage;

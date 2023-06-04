import SvgLogo from "../Logo/Logo.svg"
import { Avatar, Backdrop, Box } from "@mui/material";
import "./MyLoading.css"
import React, { useEffect } from "react";


const MyLoading2ndVersion = () => {
    const [loading, setLoading] = React.useState(true);
  
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}>
                    <Avatar variant='circular' className="rotate_03" src={SvgLogo} sx={{
                        border: '1px solid #dee2e6', width: 90, height: 90,
                        '& .MuiAvatar-img': {
                            objectFit: 'contain',
                        }
                    }} />
                </Backdrop>


            </Box>
        </Box>
    );

};

export default MyLoading2ndVersion;
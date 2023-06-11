
import { AddRounded, Inbox, Mail, ZoomInRounded, ZoomOutRounded } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, ThemeProvider, Typography, createTheme, makeStyles, styled, useTheme } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ColorModeContext, colorTokens } from '../../theme';


const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paperAnchorLeft': {
        transform: 'translateX(100%)',
        transition: 'transform 0.3s !important',
        left: "calc(100% - 250px)"
    }
}));


export default function Accessibility() {
    const [open, setOpen] = useState(false);

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    function toggleDrawer(open: boolean) {
        setOpen(open);
    }

    return (
        <React.Fragment>
            <Button
                color='secondary'
                onClick={() => theme.palette.mode === "light" ? colorMode.toggleColorMode("dark") : colorMode.toggleColorMode("light")}
            >
                Toggle Theme
            </Button>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    position: "fixed",
                    top: "70%",
                    right: "0",
                    zIndex: "120000" // on top of everything
                }}
            >
                <Button
                    variant='contained'
                    sx={{
                        left: 0
                    }}
                    onClick={() => toggleDrawer(true)}
                >
                    נגישות
                </Button>
            </Box>

            <CustomDrawer
                anchor="left"
                open={open}
                onClose={() => toggleDrawer(false)}

            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => toggleDrawer(false)}
                    onKeyDown={() => toggleDrawer(false)}
                >
                    <List>
                        {/* increase or decrease font size */}
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ZoomOutRounded sx={{
                                        
                                    }} />
                                </ListItemIcon>
                                {/* <ListItemText primary="הקנת גודל הגופן" /> */}
                                <Typography variant='h4'>הגדלת גודל גןפן</Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ZoomInRounded />
                                </ListItemIcon>
                                <Typography variant='h4'>הגדלת גודל גןפן</Typography>
                                {/* <ListItemText primary={"הגדלת גודל הגופן"} /> */}
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </CustomDrawer>

        </React.Fragment>

    )
}

function createCache(arg0: { key: string; stylisPlugins: any[]; }) {
    throw new Error('Function not implemented.');
}

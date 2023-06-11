
import { Accessible, AddRounded, Contrast, FormatUnderlined, Inbox, LightMode, Mail, Nightlight, ZoomInRounded, ZoomOutRounded } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, ThemeProvider, Typography, createTheme, makeStyles, styled, useTheme } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ColorModeContext, colorTokens } from '../../theme';


const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paperAnchorLeft': {
        transform: 'translateX(100%)',
        transition: 'transform 0.3s !important',
        left: "calc(100% - 250px)",
        zIndex: "12000"
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
                    zIndex: "10" // on top of everything but the drawer
                }}
            >
                <Button
                    variant='contained'
                    sx={{
                        left: 0
                    }}
                    onClick={() => toggleDrawer(true)}
                >
                    <Typography variant='h4' sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Accessible sx={{ fontSize: "24px" }} />
                        נגישות
                    </Typography>
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
                    {/* increase or decrease font size */}
                    <List>
                        {/* Increase font size */}
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}
                                    >
                                        <ZoomOutRounded />
                                    </Typography>
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    הקטנת גודל גופן
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        {/* Decrease font size */}
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ZoomInRounded />
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    הגדלת גודל גופן
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List >
                        {/* dark contrast */}
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Nightlight />
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    ניגודיות כהה
                                </Typography>
                            </ListItemButton>
                        </ListItem>

                        {/* bright contrast */}
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LightMode />
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    ניגודיות בהירה
                                </Typography>
                            </ListItemButton>
                        </ListItem>

                        {/* Black and white */}
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Contrast />
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    שחור-לבן
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {/* Change font */}
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ZoomInRounded />
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    פונט קריא
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FormatUnderlined />
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    קו תחתון לקישורים
                                </Typography>
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

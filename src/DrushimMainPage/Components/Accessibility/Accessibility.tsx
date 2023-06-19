
import { Accessible, Contrast, FontDownload, LightMode, Nightlight, Replay, ZoomInRounded, ZoomOutRounded } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, Typography, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { ColorModeContext, FontContext, colorTokens } from '../../theme';
import AccessibilityIcon from './Accessibility.png'


const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paperAnchorLeft': {
        transform: 'translateX(100%)',
        transition: 'transform 0.3s !important',
        left: "calc(100% - 250px)",
        zIndex: "12000"
    }
}));

const DEFAULT_FONT_FAMILY = "Rubik";
const READABLE_FONT_FAMILY = "Arial";
const DEFAULT_FONT_SIZE = 20

export default function Accessibility()
{
    const [open, setOpen] = useState(false);

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const fontMode = useContext(FontContext);

    const [fontFamily, setfontFamily] = useState("'Noto Sans Hebrew', sans-serif");

    function toggleDrawer(open: boolean)
    {
        setOpen(open);
    }

    const StyledButton = styled(Button)`
        transition: transform 0.3s ease-in-out;
        &:hover {
            transform: translateX(-10px);
        }
        &:not(:hover) {
            transform: translateX(0);
        }
    `;


    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    position: "fixed",
                    top: "467px",
                    right: "0",
                    zIndex: "10" // on top of everything but the drawer
                }}
            >
                <StyledButton
                    variant='contained'
                    sx={{
                        width:"120px",
                        backgroundColor: "secondary.jobDetails",
                        "&:hover" : {
                            backgroundColor: "secondary.jobDetails"
                        },
                        left: "20px",
                        borderBottomLeftRadius: "56px",
                        borderTopLeftRadius: "56px"
                    }}
                    onClick={() => toggleDrawer(true)}
                >
                    <img src={AccessibilityIcon} style={{ height: "63px", width: "63px",  marginLeft: 32 }} />
                </StyledButton>
            </Box>


            <CustomDrawer
                anchor="left"
                open={open}
                onClose={() => toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onKeyDown={() => toggleDrawer(false)}
                >
                    {/* increase or decrease font size */}
                    <List>
                        {/* Decrease font size */}
                        <ListItem disablePadding sx={{ marginTop: "100px" }}>
                            <ListItemButton
                                onClick={() =>
                                {
                                    fontMode.decreaseFontSize(2);
                                }}>
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
                        {/* Increase font size */}
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() =>
                                {
                                    fontMode.increaseFontSize(2);
                                }}>
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
                        <ListItem disablePadding sx={{backgroundColor: "#0022AA22"}}>
                            <ListItemButton
                                onClick={() =>
                                {
                                    colorMode.toggleColorMode("dark-contrast");
                                }}>
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
                            <ListItemButton
                                onClick={() =>
                                {
                                    colorMode.toggleColorMode("bright-contrast");
                                }}
                            >
                                <ListItemIcon >
                                    <LightMode />
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    ניגודיות בהירה
                                </Typography>
                            </ListItemButton>
                        </ListItem>

                        {/* Black and white */}
                        <ListItem disablePadding sx={{backgroundColor: "#EEEEEE"}}>
                            <ListItemButton
                                onClick={() =>
                                {
                                    colorMode.toggleColorMode("white-and-dark")
                                }}
                            >
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
                            <ListItemButton onClick={() =>
                            {
                                const nextFontFamily = fontFamily === DEFAULT_FONT_FAMILY ? READABLE_FONT_FAMILY : DEFAULT_FONT_FAMILY;
                                fontMode.changeFontFamily(nextFontFamily);
                                setfontFamily(nextFontFamily);
                            }}
                            >
                                <ListItemIcon>
                                    <FontDownload />
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    פונט קריא
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    {/* Reset all accesibility options */}
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() =>
                                {
                                    fontMode.changeFontFamily(DEFAULT_FONT_FAMILY);
                                    fontMode.changeFontSize(DEFAULT_FONT_SIZE);
                                    colorMode.toggleColorMode("light");
                                }}
                            >
                                <ListItemIcon>
                                    <Replay />
                                </ListItemIcon>
                                <Typography variant='h4'>
                                    איפוס נגישות
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Box>
            </CustomDrawer>

        </React.Fragment>

    )
}

function createCache(arg0: { key: string; stylisPlugins: any[]; })
{
    throw new Error('Function not implemented.');
}

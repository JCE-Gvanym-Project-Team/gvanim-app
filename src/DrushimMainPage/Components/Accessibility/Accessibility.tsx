
import { Inbox, Mail } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, ThemeProvider, createTheme, makeStyles, styled } from '@mui/material'
import React, { useState } from 'react'


const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paperAnchorLeft': {
        transform: 'translateX(100%)',
        transition: 'transform 0.3s !important',
        left: "calc(100% - 250px)"
    }
}));


export default function Accessibility()
{
    const [open, setOpen] = useState(false);


    function toggleDrawer(open: boolean)
    {
        setOpen(open);
    }

    return (
        <React.Fragment>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    position: "fixed",
                    top: "70%",
                    width: "100%"
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
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <Inbox /> : <Mail />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <Inbox /> : <Mail />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
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

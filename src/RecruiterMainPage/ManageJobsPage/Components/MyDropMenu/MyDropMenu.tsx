import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { StyledMenu } from './MyDropMenuStyle';
import { Assignment, RemoveCircleOutline, Edit, MoreVert } from '@mui/icons-material';


export default function MyDropMenu() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    // to open the drop menu
    const handleClick = (event: React.MouseEvent<HTMLElement>) => { 
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (event: React.MouseEvent<HTMLElement>) => {
        const myValue  = event.currentTarget.title;
        console.log(event.currentTarget.tabIndex);
    };
    return (
        <React.Fragment>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        p: '10px',
                        "&:hover": {
                            // backgroundColor: "white"
                            backgroundColor: 'transparent'
                        }
                    }}
                    aria-controls={open ? 'job-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <MoreVert sx={{fontSize: '17px', color: 'rgb(45, 56, 67)'}}  />
                </IconButton>

            <StyledMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

            >


                <MenuItem title="goToJobPage" tabIndex={1} onClickCapture={handleItemClick}>
                    <ListItemIcon>
                        <Assignment
                            sx={{color: 'rgb(62, 80, 96)'}}
                            fontSize="small" />
                    </ListItemIcon>
                    <Typography
                        variant='caption'
                        color='rgb(62, 80, 96)'
                        fontFamily='"IBM Plex Sans", -apple-system, BlinkMacSystemFont, 
                    "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji",
                     "Segoe UI Emoji", "Segoe UI Symbol"'
                    >
                        לדף המשרה
                    </Typography>
                </MenuItem>


          

                <MenuItem title="editJob" tabIndex={2} onClickCapture={handleItemClick}>
                    <ListItemIcon>
                        <Edit 
                        sx={{color: 'rgb(62, 80, 96)'}}
                        fontSize="small" />
                    </ListItemIcon>
                    <Typography
                        color='rgb(62, 80, 96)'
                        variant='caption'
                        fontFamily='"IBM Plex Sans", -apple-system, BlinkMacSystemFont, 
                "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji",
                 "Segoe UI Emoji", "Segoe UI Symbol"'
                    >
                        ערוך משרה
                    </Typography>
                </MenuItem>

                <Divider style={{ margin: 0, height: '0px' }} />


                <MenuItem title="deleteJob" tabIndex={3} onClickCapture={handleItemClick}>
                    <ListItemIcon>
                        <RemoveCircleOutline sx={{ color: 'error.main' }} fontSize="small" />
                    </ListItemIcon>
                    <Typography
                        color={'error'}
                        variant='caption'
         
                        fontFamily='"IBM Plex Sans", -apple-system, BlinkMacSystemFont, 
                        "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji",
                         "Segoe UI Emoji", "Segoe UI Symbol"'
                    >
                        הסר משרה
                    </Typography>
                </MenuItem>





            </StyledMenu>
        </React.Fragment>
    );
}
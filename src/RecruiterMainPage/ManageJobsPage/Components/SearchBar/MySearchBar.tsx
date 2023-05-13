import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Tooltip } from '@mui/material';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function MySearchBar() {
    
    return (
        <Box
            component="form"
            sx={{
                boxShadow: 3,
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                
            }}
        >

            <Tooltip title="חיפוש">
                <IconButton disabled sx={{ p: '10px', }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Tooltip>

            <InputBase
                sx={{ ml: 1, flex: 1}}
                placeholder="חיפוש"
                inputProps={{ 'aria-label': 'חיפוש חופשי' }}
              
            />

        </Box>
    );
}
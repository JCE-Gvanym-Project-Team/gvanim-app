import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip } from '@mui/material';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function MySearchBar(props: {handleClick: any,checked: any}) {
    const {handleClick, checked} = props;
    
    return (
        <Paper
            component="form"
            sx={{
                boxShadow: 3,
                marginLeft: 'auto',
                marginRight: 'auto',
       
                display: 'flex',
                alignItems: 'center',
                width: 450,
            }}
        >

            <Tooltip title="חיפוש">
                <IconButton disabled sx={{ p: '10px', }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Tooltip>

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="חיפוש"
                inputProps={{ 'aria-label': 'חיפוש חופשי' }}
              
            />

            <Divider sx={{ height: 28, m: 0.5, minHeight: 28,  }} orientation="vertical" />

           {/* for the radio group */}
            <IconButton
                onClick={handleClick}
                size="small"
            >
                {checked ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </IconButton>

        </Paper>
    );
}
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Tooltip } from '@mui/material';
import { IconButtonSx, InputBaseSx, MySearchBarBoxSx } from './MySearchBarStyle';

export default function MySearchBar() {
    
    return (
        <Box component="form" sx={ MySearchBarBoxSx } >

            <Tooltip title="חיפוש">
                <IconButton disabled sx={ IconButtonSx } aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Tooltip>

            <InputBase
                sx={ InputBaseSx }
                placeholder="חיפוש"
                inputProps={{ 'aria-label': 'חיפוש חופשי' }} 
            />

        </Box>


    );
}
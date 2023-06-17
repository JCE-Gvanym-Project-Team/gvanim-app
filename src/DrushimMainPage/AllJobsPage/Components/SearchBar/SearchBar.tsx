import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Box, Stack, useTheme } from '@mui/material';
import { ReactComponent as SearchSVG } from './Resources/Icon feather-search.svg';
import { RestartAlt } from '@mui/icons-material';

export default function SearchBar(props: { text: string, setText: any, search: string, setSearch: any }) {
    const { text, setText, search, setSearch} = props;



    const handleText = (event) => {
        setText(event.target.value);
      };
    
      const handleSearch = () => {
        setSearch(text);
      };


      const theme = useTheme();
    
  return (
    <Box
      component="form"
      sx={{ display: 'flex',mb: 1,mt: 1,mr: 6, borderBottom: '2px solid #053B7A'
      // border: theme.palette.mode === 'dark' ? '1px solid grey' : '1px solid rgba(0, 0, 0, 0.095)'
 }}
    >

<Stack direction='row'>
  
<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
<SearchSVG />
</Box>

 
<InputBase
  sx={{flex: 1,ml: 1, fontFamily: 'normal normal normal 18px Rubik',color: '#053B7A',
  opacity: 1, letterSpacing: '0px', }}
  inputProps={{ 'aria-label': 'search' }}
  value={text}
  onChange={handleText}
/>
</Stack>
 
    </Box>
  );
}
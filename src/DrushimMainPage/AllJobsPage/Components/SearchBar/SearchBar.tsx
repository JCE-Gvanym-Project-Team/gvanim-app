import InputBase from '@mui/material/InputBase';
import { Box, Stack, useTheme } from '@mui/material';
import { ReactComponent as SearchSVG } from './Resources/Icon feather-search.svg';

export default function SearchBar(props: { text: string, setText: any }) {
    const { text, setText } = props;


    const handleText = (event) => {
        setText(event.target.value);
      };
    
      // const handleSearch = () => {
      //   setSearch(text);
      // };


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
  sx={{flex: 1,ml: 2, fontFamily: 'normal normal normal 18px Rubik',color: '#053B7A',
  opacity: 1, letterSpacing: '0px', }}
  placeholder='כתבו כאן...'
  inputProps={{ 'aria-label': 'search' }}
  value={text}
  onChange={handleText}
/>
</Stack>
 
    </Box>
  );
}
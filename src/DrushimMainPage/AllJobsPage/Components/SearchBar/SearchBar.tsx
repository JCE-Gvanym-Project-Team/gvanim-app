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
      sx={{
        display: 'flex', mb: 1, mt: 2,
        
        // borderBottom: '2px solid #053B7A'
        // border: theme.palette.mode === 'dark' ? '1px solid grey' : '1px solid rgba(0, 0, 0, 0.095)'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', paddingRight: 4 }}>
        <Stack direction='row'>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <SearchSVG style={{ width: '21px', height: '21px' }} />
          </Box>


          <InputBase
            sx={{
              flex: 1, ml: 2, font: 'normal normal normal 19px Rubik', color: '#053B7A',
              opacity: 1, letterSpacing: '0px',
              input: {
                color: '#053B7A',
                "&::placeholder": {  
                   opacity: 1,
                },
             },
            }}
            placeholder='כתבו כאן...'
            inputProps={{ 'aria-label': 'search' }}
            value={text}
            onChange={handleText}
          />

        </Stack >
        <Box sx={{
          mt: 0,
          background: '#053B7A 0% 0% no-repeat padding-box',
          height: '1.5px',
          borderRadius: '3px',
          opacity: 1,
        }} />
      </Box>

    </Box >
  );
}
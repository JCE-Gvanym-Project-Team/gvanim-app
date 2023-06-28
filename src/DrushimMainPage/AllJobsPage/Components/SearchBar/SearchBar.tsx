import InputBase from '@mui/material/InputBase';
import { Box, Stack, useTheme } from '@mui/material';
import { ReactComponent as SearchSVG } from './Resources/Icon feather-search.svg';
import { SearchRounded } from '@mui/icons-material';

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
            <SearchRounded fontSize='small' sx={{ color: 'background.JobTitle2' }} />
          </Box>


          <InputBase
          
            sx={{
              fontSize: 'large',
              flex: 1, ml: 1.5, color: 'background.JobTitle2',
              opacity: 1, letterSpacing: '0px',
              input: {
                color: 'background.JobTitle2',
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
          backgroundColor: 'background.JobTitle2',
          height: '1.5px',
          borderRadius: 2,
          opacity: 1,
          
        }} />
      </Box>

    </Box >
  );
}
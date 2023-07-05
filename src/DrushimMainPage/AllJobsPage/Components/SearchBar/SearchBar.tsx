import InputBase from '@mui/material/InputBase';
import { Box, Stack } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import React from 'react';
import { ColorModeContext } from '../../../theme';

export default function SearchBar(props: { text: string, setText: any, handleFilter })
{
  const { text, setText, handleFilter } = props;

  const colorMode = React.useContext(ColorModeContext);

  const handleText = (event) =>
  {
    setText(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex', mb: 1, mt: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', paddingRight: 4 }}>
        <Stack direction='row'>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <SearchRounded fontSize='small' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }} />
          </Box>


          <InputBase

            sx={{
              fontSize: 'large',
              flex: 1, ml: 1.5, color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
              opacity: 1, letterSpacing: '0px',
              input: {
                color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                "&::placeholder": {
                  opacity: 1,
                },
              },
            }}
            onKeyDown={e =>
            {
              if (e.key === 'Enter')
              {
                e.preventDefault();
                handleFilter(text);
              }
            }}
            placeholder='כתבו כאן...'
            inputProps={{ 'aria-label': 'search' }}
            value={text}
            onChange={handleText}
          />

        </Stack >
        <Box sx={{
          mt: 0,
          backgroundColor: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
          height: '1.5px',
          borderRadius: 2,
          opacity: 1,

        }} />
      </Box>

    </Box >
  );
}
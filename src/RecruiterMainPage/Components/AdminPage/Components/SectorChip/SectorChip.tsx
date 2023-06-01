import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Input, Stack } from '@mui/material';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const names = [
  'אשכול 1',
  'אשכול 2',
  'אשכול 3',
  'אשכול 4',
  'אשכול 5',
  'אשכול 6',
  'אשכול 7',
  'אשכול 8',
  'אשכול 9',
  'אשכול 10',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SectorChip(props: { recruiterSectors: string[], setRecruiterSectors: any, setSaveButton: any}) {
  const { recruiterSectors, setRecruiterSectors, setSaveButton } = props;
  const theme = useTheme();




  const handleChange = (event: SelectChangeEvent<typeof recruiterSectors>) => {
    setSaveButton(true);
    const {
      target: { value },
    } = event;
    setRecruiterSectors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={1} direction="row">

        <FormControl 		sx={{ width: '100%'}}>
        <InputLabel  variant='standard'>אשכולות</InputLabel>
          <Select
            multiple
            value={recruiterSectors}
            onChange={handleChange}
            input={<Input size='small' />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, recruiterSectors, theme)}

              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>


      {/* <Box sx={MyPaperSx}>
        {recruiterSectors.map((value) => (
          <Chip disabled={!edit} color='primary' onDelete={() => { setRecruiterSectors(recruiterSectors.filter((sector) => sector !== value)) }} key={value} label={value} />
        ))}
      </Box> */}

    </Box>
  );
}
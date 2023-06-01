import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { IconButton, Input, Stack } from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import { MyPaperSx } from './SectorChipStyle';

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

export default function SectorChip(props: { recruiterSectors: string[], setRecruiterSectors: any, edit: any, setEdit: any }) {
  const { recruiterSectors, setRecruiterSectors, edit, setEdit } = props;
  const theme = useTheme();




  const handleChange = (event: SelectChangeEvent<typeof recruiterSectors>) => {
    const {
      target: { value },
    } = event;
    setRecruiterSectors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box>
      <Stack spacing={1} direction="row">
        <IconButton onClick={() => setEdit(!edit)}>
          {edit ? <Save sx={{color: 'rgb(52, 71, 103)'}} /> : <Edit sx={{color: 'rgb(52, 71, 103)'}} />}
        </IconButton>

        <FormControl sx={{width: 200 }}>
        <InputLabel disabled={!edit} variant='standard'>אשכולות</InputLabel>
          <Select
            size='small'
            multiple
            value={recruiterSectors}
            onChange={handleChange}
            input={<Input disabled={!edit} />}
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
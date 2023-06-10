import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Checkbox, Chip, FormLabel, Input, ListItemText, OutlinedInput, Stack, TextField } from '@mui/material';
import { MyPaperSx } from './SectorsChipStyle';
import SelectInput from '@mui/material/Select/SelectInput';


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

export default function SectorChips(props: { recruiterSectors: string[], setRecruiterSectors: any, setSaveButton: any }) {
  const { recruiterSectors, setRecruiterSectors, setSaveButton } = props;
  const theme = useTheme();

  const [sectorsSelection, setSectorsSelection] = React.useState<string[]>([]);


  const handleChange = (event: SelectChangeEvent<typeof recruiterSectors>) => {
    setSaveButton(true);
    const {
      target: { value },
    } = event;
    setSectorsSelection(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

    const fetchSectors = () => {
     recruiterSectors !== null && setSectorsSelection(recruiterSectors)
  };

  React.useEffect(() => {
    fetchSectors();
  }, []);


  return (
    <Box sx={{ width: '100%' }}>

      <FormControl sx={{ width: '100%', maxWidth: '100%' }}>
        <label>אשכולות:</label>
        <Select
          multiple
          size='small'
          label="אשכולות"
          value={sectorsSelection}
          multiline
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          required
        >
          {recruiterSectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              <Checkbox checked={sectorsSelection.indexOf(sector) > -1} />
              <ListItemText primary={sector} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>



      <Box sx={MyPaperSx}>
        {sectorsSelection?.map((value) => (
          <Chip color='primary' key={value} label={value} />
        ))}
    </Box>

    </Box >
  );
}
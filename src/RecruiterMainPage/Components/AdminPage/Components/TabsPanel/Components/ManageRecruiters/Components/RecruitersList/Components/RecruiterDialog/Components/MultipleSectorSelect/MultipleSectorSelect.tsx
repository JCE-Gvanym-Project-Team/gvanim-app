import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Sector, getOpenSectors } from '../../../../../../../../../../../../../Firebase/FirebaseFunctions/Sector';
import { Box, Chip } from '@mui/material';
import { MyPaperSx } from '../../../../RecruitersTableStyle';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  // disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,

    },
  },
};

const sectors = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function MultipleSectorSelect(props: {recruiterSectors: string[], setRecruiterSectors: any, error: any, setError: any, setSaveButton: any }) {
  const { recruiterSectors,setRecruiterSectors, error, setError} = props;

  const [sectorSelection, setSectorSelection] = React.useState<string[]>(recruiterSectors);


  const handleChange = (event: SelectChangeEvent<typeof sectorSelection>) => {
    const {
      target: { value },
    } = event;
    setSectorSelection(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    
    if (value?.length > 0 && error) { setError(false); }
  };

  // const fetchSectors = async () => {
  //   setSectors(await getOpenSectors());
  // };

  React.useEffect(() => {
    // fetchSectors();

  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl sx={{ width: '100%', maxWidth: '100%' }}>
        <Select
          multiple
          size='small'
          value={sectorSelection}
          multiline
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          required
          error={error}

        >
          {recruiterSectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              <Checkbox checked={sectorSelection.indexOf(sector) > -1} />
              <ListItemText primary={sector} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <Box sx={MyPaperSx}>
        {recruiterSectors?.map((value) => (
          <Chip color='primary' onDelete={() => { setSectorSelection(recruiterSectors.filter((sector) => sector !== value)) }} key={value} label={value} />
        ))}
      </Box>
    </Box>
  );
}
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Sector, getOpenSectors } from '../../../../../../Firebase/FirebaseFunctions/Sector';

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

export default function MultipleSectorSelect(props: {setJobSector: any, errorJobState: any, setErrorJobState: any}) {
  const { setJobSector, errorJobState, setErrorJobState} = props;

  const [sectorSelection, setSectorSelection] = React.useState<string[]>([]);
  const [sectors, setSectors] = React.useState<Sector[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof sectorSelection>) => {
    const {
      target: { value },
    } = event;
    setSectorSelection(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    setJobSector(sectorSelection);
    
    if (value?.length > 0 && errorJobState) { setErrorJobState(false); }
  };

  const fetchSectors = async () => {
    setSectors(await getOpenSectors());
  };

  React.useEffect(() => {
    fetchSectors();
  }, []);

  return (
    <div>
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
          error={errorJobState}

        >
          {sectors.map((sector) => (
            <MenuItem key={sector._name} value={sector._name}>
              <Checkbox checked={sectorSelection.indexOf(sector._name) > -1} />
              <ListItemText primary={sector._name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
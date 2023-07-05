import { Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

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


export default function SectorChips(props: {
  allSectors: string[],
  setListToShow:React.Dispatch<React.SetStateAction<string[]>>,
  listToShow:string[],
  setSaveButton: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { allSectors, setListToShow, listToShow, setSaveButton } = props;
  const [selectNow, setSelectNow] = React.useState<string[]>([]);



  const handleChange = async (event: SelectChangeEvent<typeof allSectors>) => {
    const {
      target: { value },
    } = event;
    const sector: string = event.target.value[0] as string;
    
    setSaveButton(true);
    let indexToRemove = listToShow.indexOf(sector);
    if (indexToRemove === -1) {
      const updatedListToShow = [...listToShow, sector];
      await setListToShow(updatedListToShow);
    } 
    else {
      const updatedListToShow = listToShow.filter((item) => item !== sector);
      await setListToShow(updatedListToShow);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl sx={{ width: '100%', maxWidth: '100%' }}>
        <label>אשכולות:</label>
        <Select
          multiple
          size='small'
          label="אשכולות"
          value={selectNow}
          multiline
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          required
        >
          {allSectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              <Checkbox
                checked={listToShow.indexOf(sector) > -1}
                onChange={() => { }}
              />
              <ListItemText primary={sector} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

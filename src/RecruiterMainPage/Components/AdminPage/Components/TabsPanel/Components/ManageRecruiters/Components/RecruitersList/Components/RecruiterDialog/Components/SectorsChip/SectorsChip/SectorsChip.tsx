import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Checkbox, FormLabel, Input, ListItemText, OutlinedInput, Stack, TextField } from '@mui/material';
import { MyPaperSx } from './SectorsChipStyle';
import SelectInput from '@mui/material/Select/SelectInput';
import { getAllSectors } from '../../../../../../../../../../../../../../Firebase/FirebaseFunctions/Sector';
import { Dispatch, SetStateAction } from 'react';
import { sleep } from '../../../../../../../../../../../../../../Firebase/FirebaseFunctions/test';

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
  // const [listToShow, setListToShow] = React.useState<string[]>([]);
// 
  // React.useEffect(() => {
    // setListToShow(recruiterCurentSectors);
  // }, []);
// 
  // console.log("listToShow: " + listToShow);


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

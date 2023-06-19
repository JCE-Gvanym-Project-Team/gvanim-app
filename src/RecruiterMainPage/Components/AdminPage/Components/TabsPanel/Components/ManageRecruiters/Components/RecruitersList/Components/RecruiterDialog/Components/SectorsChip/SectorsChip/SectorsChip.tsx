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
  setSectorsSelection: React.Dispatch<React.SetStateAction<string[]>>,
  sectorsSelection: string[],
  recruiterCurentSectors: string[],
  setSaveButton: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean,
  setListToDel: React.Dispatch<React.SetStateAction<string[]>>,
  listToDel: string[],
  setListToAdd: React.Dispatch<React.SetStateAction<string[]>>,
  listToAdd: string[],
  setListToShow:React.Dispatch<React.SetStateAction<string[]>>,
  listToShow:string[]
}) {
  const { allSectors, setSectorsSelection, sectorsSelection, recruiterCurentSectors, setSaveButton, isEdit, setListToDel, listToDel, setListToAdd, listToAdd, setListToShow, listToShow } = props;
  const [selectNow, setSelectNow] = React.useState<string[]>([]);
  // const [listToShow, setListToShow] = React.useState<string[]>([]);
// 
  // React.useEffect(() => {
    // setListToShow(recruiterCurentSectors);
  // }, []);
// 


  const handleChange = async (event: SelectChangeEvent<typeof allSectors>) => {
    const {
      target: { value },
    } = event;

    const sector: string = event.target.value[0] as string;
    console.log(sector);

    // -------------to show-----------------------------------------------
    let indexToRemove = listToShow.indexOf(sector);

    if (indexToRemove === -1) {
      const updatedListToShow = [...listToShow, sector];
      setListToShow(updatedListToShow);
    } else {
      const updatedListToShow = listToShow.filter((item) => item !== sector);
      setListToShow(updatedListToShow);
    }

    // // ------------------------------------------------------------
    // indexToRemove = listToDel.indexOf(sector);

    // if (indexToRemove > -1) {
    //   console.log("1");
    //   // remove
    //   const updatedListToDel = listToDel.filter((item) => item !== sector)
    //   setListToDel(updatedListToDel);
    //   return;
    // }

    // // ------------------------------------------------------------
    // indexToRemove = listToAdd.indexOf(sector);

    // if (indexToRemove > -1) {
    //   console.log("2");
    //   // remove 
    //   const updatedListToAdd = listToAdd.filter((item) => item !== sector);
    //   setListToAdd(updatedListToAdd);
    //   return;
    // }

    // // ------------------------------------------------------------
    // indexToRemove = listToShow.indexOf(sector);

    // if (indexToRemove > -1) { // not in
    //   console.log("3");
    //   // add 
    //   setListToAdd((prevList) => [...prevList, sector]);
    //   return;
    // }

    // // ------------------------------------------------------------
    // indexToRemove = listToShow.indexOf(sector);
    // if (indexToRemove === -1) { // in
    //   // add
    //   console.log("4");
    //   setListToDel((prevList) => [...prevList, sector]);
    // }
    // console.log("fail");

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

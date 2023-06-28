import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import { Sector, getOpenSectors } from '../../../../../../Firebase/FirebaseFunctions/Sector';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    // disableScrollLock: true,
    // position: 'relative',
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,

        },
    },
};


export default function RoleSingleSelection(props: { jobSector: any ,setJobSector: any, error: any, setError: any} ) {
    const { jobSector ,setJobSector, error, setError } = props;

  const [sectors, setSectors] = React.useState<Sector[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof jobSector>) => {
        const { target: { value } } = event;
        setJobSector(value);
        if (value?.length > 0 && error) { setError(false); }
    };

    const fetchSectors = async () => {
        setSectors(await getOpenSectors());
    };

    React.useEffect(() => {
        fetchSectors();
    }, []);

    return (
        <div>
            <FormControl sx={{ width: '100%' }}>
                <Select
                sx={{            '& .muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                    font: 'small-caption',
                },
    
                '& .muirtl-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                    borderRadius: '0.375rem !important'
                },

                '& .muirtl-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                    color: '#7795f8 !important'
                },
                '& .muirtl-bpeome-MuiSvgIcon-root-MuiSelect-icon': {
                    color: '#7795f8 !important'
                },}}
                    size='small'
                    value={jobSector}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.toLowerCase().toString()}
                    MenuProps={MenuProps}
                    error={error}
                >
                    {sectors.map((sector) => (
                        <MenuItem key={sector._name} value={sector._name}>
                            <ListItemText primary={sector._name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
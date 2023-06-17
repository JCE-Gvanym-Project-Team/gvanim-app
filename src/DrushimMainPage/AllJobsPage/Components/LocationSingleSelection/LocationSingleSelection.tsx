import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Role, getOpenRoles } from '../../../../Firebase/FirebaseFunctions/Role';
import { Job } from '../../../../Firebase/FirebaseFunctions/Job';


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


export default function LocationSingleSelection(props: { location: any, setLocation: any, jobs: Job[] }) {
    const { location, setLocation, jobs } = props;

    const [locations, setLocations] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof location>) => {
        const { target: { value } } = event;
        setLocation(value);
    };

    const fetchLocations = async () => {
        let loc: string[] = [];
        for(let job in jobs)
        if(!loc.includes(jobs[job]?._region)){
            let loc_split = jobs[job]?._region.split(",");
            loc_split.forEach((loc_) => loc.push(loc_));  
        }
 
        setLocations(loc);
    };

    React.useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <div>
            <FormControl sx={{ width: '100%' }}>
                <Select
                    sx={{
                        '& .muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                            background: '#EDEDED 0% 0% no-repeat padding-box',
                            paddingTop: 2,
                            
                            font: 'normal normal normal 20px Rubik',
                            color: '#053B7A'
                        },
            
                        '& .muirtl-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                           border: 0,
                            borderRadius: '4px',
                        },
        
                        '& .muirtl-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
                            color: '#053B7A !important'
                        },
                        '& .muirtl-bpeome-MuiSvgIcon-root-MuiSelect-icon': {
                            color: '#053B7A !important'
                        },
                  
                    }}
                    size='small'
                    value={location}
                    onChange={handleChange}
                    input={<OutlinedInput  />}
                    renderValue={(selected) => selected.toLowerCase().toString()}
                    MenuProps={MenuProps}
                >
                    {locations.map((location, index) => (
                        <MenuItem key={index} value={location}>
                            <ListItemText primary={location} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
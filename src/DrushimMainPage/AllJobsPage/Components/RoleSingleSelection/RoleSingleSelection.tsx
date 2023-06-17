import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Role, getOpenRoles } from '../../../../Firebase/FirebaseFunctions/Role';


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


export default function RoleSingleSelection(props: { jobRole: any, setJobRole: any }) {
    const { jobRole, setJobRole } = props;

    const [roles, setRoles] = React.useState<Role[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof jobRole>) => {
        const { target: { value } } = event;
        setJobRole(value);
    };

    const fetchRoles = async () => {
        setRoles(await getOpenRoles());
    };

    React.useEffect(() => {
        fetchRoles();
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
                    value={jobRole}
                    onChange={handleChange}
                    input={<OutlinedInput  />}
                    renderValue={(selected) => selected.toLowerCase().toString()}
                    MenuProps={MenuProps}
                >
                    {roles.map((role) => (
                        <MenuItem key={role._name} value={role._name}>
                            <ListItemText primary={role._name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
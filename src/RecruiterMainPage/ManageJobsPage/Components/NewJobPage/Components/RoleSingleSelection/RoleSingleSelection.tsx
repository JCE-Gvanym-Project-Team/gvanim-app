import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Role, getOpenRoles } from '../../../../../../Firebase/FirebaseFunctions/Role';

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


export default function RoleSingleSelection(props: { jobRole: any, setJobRole: any, error: any, setError: any }) {
    const { jobRole, setJobRole, error, setError } = props;

    const [roles, setRoles] = React.useState<Role[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof jobRole>) => {
        const { target: { value } } = event;
        setJobRole(value);
        if (value?.length > 0 && error) { setError(false); }
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
                        },
                  
                    }}
                    size='small'
                    value={jobRole}
                    onChange={handleChange}
                    input={<OutlinedInput  />}
                    renderValue={(selected) => selected.toLowerCase().toString()}
                    MenuProps={MenuProps}
                    error={error}
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
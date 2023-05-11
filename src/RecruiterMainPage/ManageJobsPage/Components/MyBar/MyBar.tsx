import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Divider, Grow, Paper,Typography } from '@mui/material';
import MySearchBar from './Components/SearchBar/SearchBar';

export default function MyBar(props: {TableWidth: any,setTableWidth: any}) {
    const { TableWidth, setTableWidth } = props;  // for the radio group

    const [checked, setChecked] = React.useState(false); //for the collapse button

    const handleClick = () => {   // collapse button 
        setChecked((prev) => !prev);
    };

    const handleChange = (event) => {
        setTableWidth(event.target.value);
    };
    const MyRadioBar = (
        <Paper sx={{boxShadow: 'unset',backgroundColor: 'transparent'}} className='mt-2'>
            <FormControl
                sx={{
                    color: 'rgb(62, 80, 96)',
                    '&.Mui-checked': {
                        color: 'rgb(62, 80, 96)',
                    },
                    '& .MuiTypography-root': {
                        fontWeight: 500,
                        fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: '0.75rem',
                    },
                    '& .MuiButtonBase-root': {
                        color: 'rgb(21, 101, 192)',

                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: 15,
                    },
                    '& .MuiFormLabel-root': {
                        fontSize: '0.75rem',
                        color: 'rgba(0, 0, 0, 0.6)',
                        marginLeft: 0,
                        marginRight: 0,
                    },


                }}>
                <FormLabel style={{ color: 'rgba(0, 0, 0, 0.6)'}} >
                    <Typography style={{fontSize: 10,fontWeight: 500,color: 'lightgray' }}>
                        אפשרויות תצוגה:
                    </Typography>
                </FormLabel>
                <RadioGroup
                    onChange={handleChange}
                    value={TableWidth}
                    defaultValue='lg'
                    row
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: 'fit-content',
                        }}
                    >
                        <FormControlLabel sx={{ marginRight: 0 }} value="xl" control={<Radio />} label="x-large" />
                        <Divider sx={{ marginLeft: 1 }} orientation="vertical" style={{ height: 15 }} />

                        <FormControlLabel sx={{ marginRight: 0, marginLeft: 0 }} value="lg" control={<Radio />} label="large" />
                        <Divider sx={{ marginLeft: 1 }} orientation="vertical" style={{ height: 15 }} />

                        <FormControlLabel sx={{ marginRight: 0, marginLeft: 0 }} value="md" control={<Radio />} label="medium" />
                        <Divider sx={{ marginLeft: 1 }} orientation="vertical" style={{ height: 15 }} />

                        <FormControlLabel sx={{ marginRight: 0, marginLeft: 0 }} value="sm" control={<Radio />} label="small" />
                        <Divider sx={{ marginLeft: 1 }} orientation="vertical" style={{ height: 15 }} />

                        <FormControlLabel sx={{ marginRight: 0, marginLeft: 0 }} value="xs" control={<Radio />} label="x-small" />

                    </Box>


                </RadioGroup>
            </FormControl>
        </Paper>
    );

    return (
        <Box>
        <MySearchBar handleClick={handleClick} checked={checked} />

            <Grow in={checked} mountOnEnter unmountOnExit>
                {MyRadioBar}
            </Grow>
        </Box>

    );
}
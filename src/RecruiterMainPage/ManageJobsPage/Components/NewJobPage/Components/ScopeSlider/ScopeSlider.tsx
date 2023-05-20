import * as React from 'react';
import Box from '@mui/material/Box';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { Typography, styled } from '@mui/material';
import { MyPaperSx } from './ScopeSliderStyle';


const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: 'rgb(52, 71, 103)',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
    
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));

const marks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 25,
        label: '25%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 75,
        label: '75%',
    },
    {
        value: 100,
        label: '100%',
    },
];

function valuetext(value: number) {
    return `${value}%`;
}

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> { }

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
    const { children, ...other } = props;
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}

export default function JobScopeSlider(props: {setJobScope: any}) {
    const { setJobScope } = props;

    const handleChange = (event: Event, newValue: number | number[]) => {
        setJobScope(newValue as number[]);
    };


    return (
        <Box sx={MyPaperSx}>
            <AirbnbSlider
                slots={{ thumb: AirbnbThumbComponent }}
                step={5}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                getAriaLabel={(index) => (index === 0 ? 'Minimum scope' : 'Maximum scope')}
                defaultValue={[50, 100]}
                marks={marks}
            />
        </Box>
    );
}
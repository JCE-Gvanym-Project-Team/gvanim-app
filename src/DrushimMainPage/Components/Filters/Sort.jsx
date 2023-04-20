import React from 'react'
import { Typography, MenuItem, Select, Grid, Container, FormControl } from '@mui/material'
import sortStyles from "./SortStyle";

export default function Sort({ onChangeFunc }) {
    const classes = sortStyles();
    const [selectValue, setSelectValue] = React.useState('location');

    const handleChange = (event) => {
        setSelectValue(event.target.value);
        onChangeFunc(event.target.value);
    };

    return (
        <Container>
            <Grid container className={classes.container}>
                <Typography variant="h6">מיון לפי</Typography>
                <FormControl sx={{ m: 1, minWidth: 220 }} className={classes.form}>
                    <Select
                        defaultValue="location"
                        id="sortSelect"
                        value={selectValue}
                        onChange={handleChange}
                        autoWidth
                        sx={{ maxHeight: 40 }}
                    >
                        <MenuItem value="location">מיקום</MenuItem>
                        <MenuItem value="jobScopeLowToHigh">היקף משרה מהנמוך לגבוה</MenuItem>
                        <MenuItem value="jobScopeHighToLow">היקף משרה מהגבוה לנמוך</MenuItem>
                        <MenuItem value="dateOldToNew">תאריך מהישן לחדש</MenuItem>
                        <MenuItem value="dateNewToOld">תאריך מהחדש לישן</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Container>

    )
}

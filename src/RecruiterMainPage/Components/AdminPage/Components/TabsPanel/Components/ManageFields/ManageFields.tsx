import { Divider, Grid, Stack, Typography } from "@mui/material";
import RolesTable from "./Components/RolesTable/RolesTable";
import SectorsTable from "./Components/SectorsTable/SectorsTable";

export default function ManageFields() {


    return (
        <Stack direction={{xs: 'column',sm: 'column',md: 'column',lg: 'row',xl: 'row',}} divider={<Divider />} spacing={{xs: 4, sm: 4, md: 4, lg: 2, xl: 2}} padding={{xs: 0, sm: 0, md: 0, lg: 2, xl: 2}}>
            <Grid sx={{ width: '100%', height: '100%'}}>
                <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600, padding: 1, paddingRight: 2 }} variant='h6'> תפקידים </Typography>
                <RolesTable />
            </Grid>
            <Grid sx={{width: '100%',height: '100%'}}>
                <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600, padding: 1, paddingRight: 2 }} variant='h6'> אשכולות </Typography>
                <SectorsTable />
            </Grid>
        </Stack>
    );
}
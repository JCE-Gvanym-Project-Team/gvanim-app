import { Grid, Typography } from "@mui/material";
import RolesTable from "./Components/RolesTable";
import SectorsTable from "./Components/SectorsTable";



export default function ManageFields() {


    return (
        <Grid container spacing={{ md: 5, lg: 6, xl: 9 }} padding={3}>
            <Grid item xs={12} md={6}>
                <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600, padding: 1, paddingRight: 2 }} variant='h6'> תפקידים </Typography>
                <RolesTable />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600, padding: 1, paddingRight: 2 }} variant='h6'> אשכולות </Typography>
                <SectorsTable />
            </Grid>
        </Grid>
    );
}
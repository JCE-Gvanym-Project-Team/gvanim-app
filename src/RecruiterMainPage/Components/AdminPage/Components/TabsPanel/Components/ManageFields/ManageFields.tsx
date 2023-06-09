import { Divider, Grid, Stack, Typography } from "@mui/material";
import RolesTable from "./Components/RolesTable/RolesTable";
import SectorsTable from "./Components/SectorsTable/SectorsTable";
import React from "react";
import MyLoading from "../../../../../../../Components/MyLoading/MyLoading";
import { getConnectedUser, isAdmin } from "../../../../../../../Firebase/FirebaseFunctions/Authentication";

export default function ManageFields() {
    const [loading, setLoading] = React.useState(true);

    const [isAdminUser, setIsAdminUser] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const currentUser = await getConnectedUser();
            if (await isAdmin(currentUser?.uid!)) {
                setIsAdminUser(true);
            } else {
                setIsAdminUser(false);
            }
        })()
        setLoading(false);
    }, []);

    return (
        <>
            {loading ? (<MyLoading loading={loading} setLoading={setLoading} />) : (
                <>
                    <Stack direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row', }} divider={<Divider />} spacing={{ xs: 4, sm: 4, md: 4, lg: 2, xl: 2 }} padding={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2 }}>
                        <Grid sx={{ width: '100%', height: '100%' }}>
                            <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600, padding: 1, paddingRight: 2 }} variant='h6'> תפקידים </Typography>
                            <RolesTable />
                        </Grid>
                        {isAdminUser ?
                            <Grid sx={{ width: '100%', height: '100%' }}>
                                <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600, padding: 1, paddingRight: 2 }} variant='h6'> אשכולות </Typography>
                                <SectorsTable />
                            </Grid> :
                            <></>
                        }
                    </Stack>
                </>
            )}
        </>
    );
}
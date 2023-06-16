import { Edit, Save } from '@mui/icons-material';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import AccountSettings from '../AccountSettings';
import PasswordSettings from '../../PasswordSettings/PasswordSettings';

export default function UpdateAccount() {
    const [accountEdit, setAccountEdit] = React.useState(false);
    const [passwordEdit, setPasswordEdit] = React.useState(false);

    
    return (
        <Stack p={2} direction='column' spacing={2}>
            {/* <Box> */}
                {/* <Stack direction='row'> */}
                    {/* <Typography component="div" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'>  פרטים אישיים  </Typography> */}

                    {/* <IconButton sx={{ mr: 1 }} onClick={() => setAccountEdit(!accountEdit)}> */}
                        {/* {accountEdit ? <Save sx={{ color: 'rgb(52, 71, 103)', fontSize: 20 }} /> : <Edit sx={{ color: 'rgb(52, 71, 103)', fontSize: 20 }} />} */}
                    {/* </IconButton> */}
{/*                      */}
                {/* </Stack> */}

                {/* <AccountSettings accountEdit={accountEdit} /> */}
            {/* </Box> */}

            <Divider />

            <Box>

                <Stack direction='row'>
                    <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'>  סיסמה  </Typography>

                    <IconButton sx={{ mr: 1 }} onClick={() => setPasswordEdit(!passwordEdit)}>
                        {passwordEdit ? <Save sx={{ color: 'rgb(52, 71, 103)', fontSize: 20 }} /> : <Edit sx={{ color: 'rgb(52, 71, 103)', fontSize: 20 }} />}
                    </IconButton>
                </Stack>
                <PasswordSettings passwordEdit={passwordEdit} />
            </Box>
        </Stack>
    )
}

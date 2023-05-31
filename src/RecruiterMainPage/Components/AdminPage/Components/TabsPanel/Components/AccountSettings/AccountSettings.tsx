import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react'

export default function AccountSettings() {
    return (
        <>

            <Stack spacing={1} direction='column' sx={{ mt: 1, padding: 2 }}>

                <Stack direction='row'
                    maxWidth="lg"
                    display={{ xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'flex' }}
                    spacing={{ xs: 0, sm: 0, md: 0, lg: 5, xl: 5 }}>
                    <Box sx={{ width: '100%' }}>
                        <label>
                            <Typography component="span" sx={{ fontWeight: 600, fontSize: 13 }}>שם פרטי:</Typography>
                        </label>
                        <TextField style={{ width: '100%' }} size='small' placeholder="שם פרטי" id="_region" type="text"
                            className="form-control" required
                        />
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <label>
                            <Typography component="span" sx={{ fontWeight: 600, fontSize: 13 }}>שם משפחה:</Typography>
                        </label>
                        <TextField style={{ width: '100%' }} size='small' placeholder="שם משפחה" id="_region" type="text"
                            className="form-control" required
                        />
                    </Box>



                </Stack>
                <Box maxWidth='lg'>
                    <label>
                        <Typography component="span" sx={{ fontWeight: 600, fontSize: 13 }}>אימייל:</Typography>
                    </label>
                    <TextField style={{ width: '100%' }} size='small' placeholder="אימייל" id="_region" type="text"
                        className="form-control" required
                    />
                </Box>
            </Stack>
            <Box sx={{ padding: 2, width: '100%', display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained'> עדכן </Button>
            </Box>
        </>

    )
}

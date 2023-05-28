import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export default function PasswordSettings() {
    return (
        <>
            <Stack direction='column' spacing={1} sx={{ width: '100%', mt: 1, padding: 2 }}>
                <Stack direction='row'
                    display={{ xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'flex' }}
                    spacing={{ xs: 0, sm: 0, md: 0, lg: 5, xl: 5 }}>

                    <Box sx={{ width: '100%' }} >
                        <label>
                            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>סיסמה נוכחית:</Typography>
                        </label>

                        <TextField style={{ width: '100%' }} size='small' placeholder="סיסמה נוכחית" id="_JobName" type="password"
                        />
                    </Box>

                    <Box sx={{ width: '100%' }} >
                        <label>
                            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>אימות סיסמה נוכחית:</Typography>
                        </label>

                        <TextField style={{ width: '100%' }} size='small' placeholder="אימות סיסמה נוכחית" id="_JobName" type="password"
                        />
                    </Box>
                </Stack>

                <Stack direction='row'
                    display={{ xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'flex' }}
                    spacing={{ xs: 0, sm: 0, md: 0, lg: 5, xl: 5 }}>

                    <Box sx={{ width: '100%' }} >
                        <label>
                            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>סיסמה חדשה:</Typography>
                        </label>

                        <TextField style={{ width: '100%' }} size='small' placeholder="סיסמה חדשה" id="_JobName" type="password"
                        />
                    </Box>

                    <Box sx={{ width: '100%' }} >
                        <label>
                            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>אימות סיסמה חדשה:</Typography>
                        </label>

                        <TextField style={{ width: '100%' }} size='small' placeholder="אימות סיסמה חדשה" id="_JobName" type="password"
                        />
                    </Box>
                </Stack>
            </Stack>
            
            <Box sx={{ padding: 2, width: '100%', display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained'> עדכן </Button>
            </Box>
        </>
    )
}
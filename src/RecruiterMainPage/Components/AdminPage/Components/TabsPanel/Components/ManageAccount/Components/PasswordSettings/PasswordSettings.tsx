import { Box, Button, FormGroup, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export default function PasswordSettings(props: { passwordEdit: any }) {
    const { passwordEdit } = props;

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

                            <TextField disabled={!passwordEdit} style={{ width: '100%' }} size='small' placeholder="סיסמה נוכחית" type="password"
                            />
                        </Box>

                        <Box sx={{ width: '100%' }} >
                            <label>
                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>אימות סיסמה נוכחית:</Typography>
                            </label>

                            <TextField disabled={!passwordEdit} style={{ width: '100%' }} size='small' placeholder="אימות סיסמה נוכחית" type="password"
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

                        <TextField disabled={!passwordEdit} style={{ width: '100%' }} size='small' placeholder="סיסמה חדשה" type="password"
                        />
                    </Box>

                    <Box sx={{ width: '100%' }} >
                        <label>
                            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>אימות סיסמה חדשה:</Typography>
                        </label>

                        <TextField disabled={!passwordEdit} style={{ width: '100%' }} size='small' placeholder="אימות סיסמה חדשה" type="password"
                        />
                    </Box>
                </Stack>

            </Stack>

            <Box sx={{ padding: 2, width: '100%', display: 'flex', justifyContent: 'end' }}>
                <Button disabled={!passwordEdit} variant='contained'> עדכן </Button>
            </Box>
        </>
    )
}

import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

export default function (props: { checked: any, setChecked: any, open: any, setOpen: any, userFirstName: any }) {
    const { checked, setChecked, open, setOpen, userFirstName } = props;


    const handleClick = () => {
        setOpen(!open);
        setChecked(!checked);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton disableRipple onClick={handleClick}>
                <Stack direction='column' spacing='7px' justifyContent='space-between' minHeight='17px'>
                    <Box sx={{
                        transform: open ? 'rotate(45deg)' : 'none',
                        transformOrigin: open ? '10% 10%' : 'unset',
                        display: 'block',
                        position: 'relative',
                        width: '22px',
                        height: '1px',
                        borderRadius: '1px',
                        background: '#6c757d',
                        transition: 'all .2s',
                        margin: '0 auto'
                    }} />

                    <Box display={open ? 'none' : 'block'} sx={{
                        position: 'relative',
                        width: '22px',
                        height: '1px',
                        borderRadius: '1px',
                        background: '#6c757d',
                        transition: 'all .2s',
                        margin: '0 auto',

                    }} />

                    <Box sx={{
                        transform: open ? 'rotate(-45deg)' : 'none',
                        transformOrigin: open ? '-10% -10%' : 'unset',
                        display: 'block',
                        position: 'relative',
                        width: '22px',
                        height: '1px',
                        borderRadius: '1px',
                        background: '#6c757d',
                        transition: 'all .2s',
                        margin: '0 auto',

                    }} />
                </Stack>

            </IconButton>

            <Stack direction='row' spacing={1} sx={{  width: '100%', justifyContent: 'center', mt: 1 }}>
                <Typography sx={{ color: '#344767', fontSize: '0.875rem', lineHeight: '1.625',opacity: 0.8 }} >
                    שלום
                </Typography>

                <Typography sx={{ color: 'black', fontSize: '0.9rem', lineHeight: '1.625', fontWeight: 600 }} >
                    {userFirstName},
                </Typography>

                <Typography sx={{ color: '#344767', fontSize: '0.875rem', lineHeight: '1.625', opacity: 0.8 }} >
                    ברוך הבא!
                </Typography>


            </Stack>


        </Box>
    )
}

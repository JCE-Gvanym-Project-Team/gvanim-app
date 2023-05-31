import { Box, IconButton, Stack } from '@mui/material'
import React from 'react'

export default function (props: {checked: any, setChecked: any, open: any, setOpen: any }) {
    const { checked, setChecked, open, setOpen} = props;


    const handleClick = () => {
        setOpen(!open);
        setChecked(!checked);
    }

    return (
        <Box sx={{width: '100%'}}>
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

        </Box>
    )
}

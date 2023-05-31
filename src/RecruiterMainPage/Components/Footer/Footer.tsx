import { GitHub, Instagram, Pinterest, Twitter } from '@mui/icons-material'
import { Box, Divider, Link, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <Box sx={{ width: '100%', marginTop: '4rem', background: 'linear-gradient(310deg, #7795f8,#555abf)' }}>

            <svg style={{ marginTop: '-1rem' }} width="100%" viewBox="0 -2 1920 157" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g stroke="none" fill="none">
                    <g fill="#FFFFFF">
                        <g id="wave-down">
                            <path d="M0,60.8320331 C299.333333,115.127115 618.333333,111.165365 959,47.8320321 C1299.66667,-15.5013009 1620.66667,-15.2062179 1920,47.8320331 L1920,156.389409 L0,156.389409 L0,60.8320331 Z" id="Path-Copy-2" transform="translate(960.000000, 78.416017) rotate(180.000000) translate(-960.000000, -78.416017) "></path>
                        </g>
                    </g>
                </g>
            </svg>

            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                start: '-35%',
                right: '4%',
                left: 'auto',
                backgroundColor: 'hsla(0,0%,100%,.1)',
                background: 'hsla(0,0%,100%,.1)',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                position: 'absolute',
            }} />

            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                right: '10%',
                start: 'auto',
                backgroundColor: 'hsla(0,0%,100%,.1)',
                background: 'hsla(0,0%,100%,.1)',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                position: 'absolute',
            }} />

            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                left: '-2%',
                backgroundColor: 'hsla(0,0%,100%,.1)',
                background: 'hsla(0,0%,100%,.1)',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                position: 'absolute',
            }} />

            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                start: '-30%',
                left: '10%',
                right: 'auto',

                backgroundColor: 'hsla(0,0%,100%,.1)',
                background: 'hsla(0,0%,100%,.1)',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                position: 'absolute',
            }} />

            <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                left: '25%',
                backgroundColor: 'hsla(0,0%,100%,.1)',
                background: 'hsla(0,0%,100%,.1)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                position: 'absolute',
            }} />




            <Box sx={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <Stack direction='column' spacing={3}>
                    <Stack direction='row' justifyContent='center' id="tags" spacing={3}>

                        <Link sx={{ opacity: 0.8, textDecoration: '#fff underline', ":hover": { color: '#fff', opacity: 2 } }} href="#"
                        >
                            <Typography id="drushim" sx={{ width: '100%', textAlign: 'center', color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
                                לדף דרושים
                            </Typography>
                        </Link>

                        <Link sx={{ opacity: 0.8, textDecoration: '#fff underline', ":hover": { color: '#fff', opacity: 2 } }} href="https://www.gvanim.org.il/"
                        >
                            <Typography id="gvanim" sx={{ width: '100%', textAlign: 'center', color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
                                לאתר גוונים
                            </Typography>
                        </Link>
                    </Stack>

                    <Stack direction='row' justifyContent='center' id="icons" spacing={4}>


                        <Pinterest sx={{ opacity: 0.8, color: '#fff' }} />
                        <GitHub sx={{ opacity: 0.8, color: '#fff' }} />
                        <Instagram sx={{ opacity: 0.8, color: '#fff' }} />
                        <Twitter sx={{ opacity: 0.8, color: '#fff' }} />

                    </Stack>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ background: 'linear-gradient(90deg,hsla(0,0%,100%,0),#fff,hsla(0,0%,100%,0))', padding: 0.05, width: '60%' }} />
                    </Box>
                    <Box id="copyrights" sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ maxWidth: 'calc(100% - 64px)' }}>
                            <Typography sx={{ opacity: 0.8, width: '100%', textAlign: 'center', color: '#fff', font: '16px Montserrat' }}>
                                Copyright © 2023 By Azrieli college team ( Omer, Aviv, Gavriel, Eliya, Eliyahu )
                            </Typography>
                        </Box>

                    </Box>
                </Stack>
            </Box>


        </Box>
    )
}

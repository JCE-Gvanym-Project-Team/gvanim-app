import { Box, Breakpoint, Divider, Stack, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import Logo2 from './Resources/Logo2.png'
import MobileLogo from './Resources/Logo1.png'
import React from 'react';
import { ColorModeContext } from '../../theme';

export default function Footer() {

    type BreakpointOrNull = Breakpoint | null;

    const colorMode = React.useContext(ColorModeContext);

    function useWidth() {
        const theme: Theme = useTheme();
        const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
        return (
            keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const matches = useMediaQuery(theme.breakpoints.up(key));
                return !output && matches ? key : output;
            }, null) || 'xs'
        );
    }

    const screenSize = useWidth();
    return (
        <Box
            sx={{

                WebkitFilter:
                    colorMode?.getActualMode()! !== 'light' && colorMode?.getActualMode()! !== 'dark-contrast' && colorMode?.getActualMode()! !== 'bright-contrast'
                        ? 'grayscale(1)'
                        : 'grayscale(0)',
                filter:
                    colorMode?.getActualMode()! !== 'light' && colorMode?.getActualMode()! !== 'dark-contrast' && colorMode?.getActualMode()! !== 'bright-contrast'
                        ? 'grayscale(1)'
                        : 'grayscale(0)'
            }}>

            {/* icon */}
            <Box sx={{
                filter: colorMode?.getActualMode()! === 'dark-contrast'
                    ? 'brightness(0.8)'
                    : colorMode?.getActualMode()! === 'bright-contrast'
                        ? 'brightness(0.7)'
                        : 'brightness(1)',

                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <img
                    src={Logo2}
                    width={screenSize === "xs" || screenSize === "sm" ? "100%" : "70%"}
                    height={screenSize === "xs" || screenSize === "sm" ? "70%" : "100%"}

                />
            </Box>


            <Stack padding={2} direction={{ xs: 'column', md: 'row' }} justifyContent='center'
                spacing={{ xs: 1,sm: 2, md: 5, xl: 7 }}
                bgcolor='background.footer'
                minHeight={{ xs: "250px",sm: '300px', md: '95px', lg: "73px" }}
                width='100%'>
                <Stack id='phone' direction='row' spacing={1} sx={{ height: 'fit-content' }} justifyContent='center' alignSelf={{ xs: 'start', md: 'center' }} flexWrap='wrap'>

                    <Typography sx={{ height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        טלפון:
                    </Typography>

                    <Typography sx={{  height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        08-6220800
                        |
                        9913*
                    </Typography>
                </Stack>


                <Stack id='fax' direction='row' spacing={1} sx={{  height: 'fit-content' }} justifyContent='center' alignSelf={{ xs: 'start', md: 'center' }} flexWrap='wrap'>

                    <Typography sx={{  height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        פקס:
                    </Typography>

                    <Typography sx={{  height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        08-6220800
                    </Typography>
                </Stack>

                <Stack id='mailcell' direction='row' spacing={1} sx={{  height: 'fit-content' }} justifyContent='center' alignSelf={{ xs: 'start', md: 'center' }} flexWrap='wrap'>

                    <Typography sx={{  height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        ת.ד
                    </Typography>

                    <Typography sx={{ height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        346
                    </Typography>
                </Stack>

                <Stack id='address' direction='row' spacing={1} sx={{  height: 'fit-content' }} justifyContent='center' alignSelf={{ xs: 'start', md: 'center' }} flexWrap='wrap'>

                    <Typography sx={{ height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        כתובת:
                    </Typography>

                    <Typography sx={{  height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        רח' הרקפת 6, שדרות
                    </Typography>
                </Stack>


                <Stack id='PostalCode' direction='row' spacing={1} sx={{  height: 'fit-content' }} justifyContent='center' alignSelf={{ xs: 'start', md: 'center' }} flexWrap='wrap'>

                    <Typography sx={{  height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        מיקוד:
                    </Typography>

                    <Typography sx={{  height: 'fit-content' }} alignSelf='center' textAlign='center' variant={screenSize === "xs" ? "subtitle2" : 'body2'} color="primary.textBright" fontWeight={400}>
                        8701301
                    </Typography>
                </Stack>


            </Stack>

        </Box>
    )
}

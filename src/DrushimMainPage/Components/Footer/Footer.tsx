import { Box, Breakpoint, Icon, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import Logo1 from './Resources/Logo1.png'
import Logo2 from './Resources/Logo2.png'
import MobileLogo from './Resources/MobileLogo.png'
import { PaddingOutlined } from '@mui/icons-material';

export default function Footer()
{

    type BreakpointOrNull = Breakpoint | null;

    function useWidth()
    {
        const theme: Theme = useTheme();
        const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
        return (
            keys.reduce((output: BreakpointOrNull, key: Breakpoint) =>
            {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const matches = useMediaQuery(theme.breakpoints.up(key));
                return !output && matches ? key : output;
            }, null) || 'xs'
        );
    }

    const screenSize = useWidth();
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

            {/* icon */}
            <img
                src={screenSize === "xs" ? MobileLogo : Logo2}
                width={screenSize === "xs" ? "323px" : "929px"}
                height={screenSize === "xs" ? "246px" : "221px"}
            />

            {/* content */}
            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                backgroundColor: "background.footer",
                height: { xs: "349px", md: "100px" },
                width: "100%",
                alignItems: { xs: "start", md: "center" },
                paddingLeft: { xs: "25px", md: "0px" }
            }}>
                {/* phone */}
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color="primary.textBright">
                        טלפון:
                    </Typography>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color="primary.textBright" sx={{ marginLeft: "10px" }}>
                        08-6220800
                    </Typography>
                    <Box sx={{ marginRight: "12px", marginLeft: "12px", backgroundColor: "background.main", width: "1px", height: "39px" }} />
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color="primary.textBright">
                        *9913
                    </Typography>
                </Box>

                {/* fax */}
                <Box sx={{ marginLeft: { xs: "0", md: "57px" }, display: "flex", flexDirection: "row", marginTop: { xs: "22px", md: "0px" } }}>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color={"primary.textBright"}>
                        פקס:
                    </Typography>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color={"primary.textBright"} sx={{ marginLeft: "10px" }}>
                        08-6220800
                    </Typography>
                </Box>

                {/* mailbox */}
                <Box sx={{ display: "flex", flexDirection: "row", marginLeft: { xs: "0", md: "57px" }, marginTop: { xs: "22px", md: "0px" } }}>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color={"primary.textBright"}>
                        ת.ד
                    </Typography>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color={"primary.textBright"} sx={{ marginLeft: "10px" }}>
                        346
                    </Typography>
                </Box>

                {/* address */}
                <Box sx={{ display: "flex", flexDirection: "row", marginLeft: { xs: "0", md: "57px" }, marginTop: { xs: "22px", md: "0px" } }}>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color={"primary.textBright"}>
                        כתובת:
                    </Typography>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color={"primary.textBright"} sx={{ marginLeft: "10px" }}>
                        רח' הרקפת 6, שדרות
                    </Typography>
                </Box>

                {/* postal code */}
                <Box sx={{ display: "flex", flexDirection: "row", marginLeft: { xs: "0", md: "57px" }, marginTop: { xs: "22px", md: "0px" } }}>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color={"primary.textBright"}>
                        מיקוד:
                    </Typography>
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h3'} color={"primary.textBright"} sx={{ marginLeft: "10px" }}>
                        8701301
                    </Typography>

                </Box>
            </Box>
        </Box>
    )
}

import { Label } from '@mui/icons-material'
import { Button, Input, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext, colorTokens } from '../theme';

export default function OneJobPage()
{

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <>
            <Typography variant='h1' color='background'>asdasd</Typography>
            <Button
                color='secondary'
                onClick={() => theme.palette.mode === "light" ? colorMode.toggleColorMode("dark") : colorMode.toggleColorMode("light")}
            >
                Toggle Theme
            </Button>
        </>
    );
}

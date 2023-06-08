import { ArrowBack, Label, LocationOn, Redo } from '@mui/icons-material'
import { Box, Button, Divider, Input, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ColorModeContext, colorTokens } from '../theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { Job, getFilteredJobs } from '../../Firebase/FirebaseFunctions/Job';

export default function OneJobPage()
{
    const [job, setJob] = useState<Job | null>(null);

    const state = useLocation();
    const navigate = useNavigate();

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const fetchJobs = async () =>
    {
        setJob((await getFilteredJobs(["jobNumber"], [getJobIdFromUrl(state.pathname)]))[0]);
    }

    useEffect(() =>
    {
        fetchJobs();
    }, [state])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "stretch",
                marginLeft: { xs: "0", md: "2rem" },
                marginRight: { xs: "0", md: "2rem" },
                backgroundColor: "background.main"
            }}
        >

            {/* Go back to all jobs button */}
            <Button
                variant='outlined'
                sx={{
                    alignSelf: "start",
                    backgroundColor: "background.boxInner",
                    "&:hover": {
                        backgroundColor: "background.main"
                    },
                    marginTop: "1rem"
                }}
                onClick={() => navigate("/career/jobs")}

            >
                <Typography
                    variant='h6'
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        color: "primary.title"
                    }}
                >

                    <Redo sx={{ marginRight: "0.3rem" }} />
                    לכל המשרות
                </Typography>
            </Button>

            {/* Job Title */}
            <Box
                sx={{
                    marginTop: "1rem",
                    backgroundColor: "background.box",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "1rem"
                }}
            >

                <Typography
                    sx={{
                        color: "primary.title"
                    }}
                    variant='h3'
                >
                    {job?._title}
                </Typography>
            </Box>

            {/* Job description, stats and requirements */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {xs: "column", md: "row"},
                    justifyContent: "stretch",
                    backgroundColor: "background.main",
                    marginTop: "0.5rem"
                }}
            >

                {/* description and requirements */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "background.box",
                        flex: 8,
                        marginRight: {xs: "0", md: "0.5rem"},
                        marginBottom: {xs: "0.5rem", md: "0"}
                    }}
                >
                    {/* description */}
                    <Box
                        sx={{
                            backgroundColor: "background.box",
                            padding: "1rem"
                        }}
                    >
                        <Typography variant="h1">
                            תיאור המשרה
                        </Typography>

                        <Divider sx={{
                            marginRight: "3rem",
                            backgroundColor: "primary.faded"
                        }} />

                        <Typography
                            variant='h3'
                            marginTop={"0.5rem"}
                        >
                            {job?._description}
                        </Typography>
                    </Box>

                    {/* requirements */}
                    <Box
                        sx={{
                            backgroundColor: "background.box",
                            padding: "1rem"
                        }}
                    >
                        <Typography variant="h1">
                            דרישות המשרה
                        </Typography>
                        <Divider sx={{
                            marginRight: "3rem",
                            backgroundColor: "primary.faded"

                        }} />
                        <Typography
                            variant='h3'
                            marginTop={"0.5rem"}>
                            {job?._requirements}
                        </Typography>
                    </Box>

                </Box>

                {/* job stats */}
                <Box
                    sx={{
                        backgroundColor: "background.box",
                        flex: 4
                    }}
                >
                    {/* job location */}
                    <Box
                        sx={{
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <Typography variant='h2'>
                            מיקום:
                        </Typography>
                        <Typography
                            sx={{
                                marginLeft: "1rem"
                            }}
                            variant='h2'
                        >
                            {job?._region}
                        </Typography>
                    </Box>

                    {/* job role */}
                    <Box
                        sx={{
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <Typography variant='h2'>
                            תפקיד:
                        </Typography>
                        <Typography
                            sx={{
                                marginLeft: "1rem"
                            }}
                            variant='h2'
                        >
                            {job?._role}
                        </Typography>
                    </Box>

                    {/* job scope */}
                    <Box
                        sx={{
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <Typography variant='h2'>
                            היקף משרה:
                        </Typography>
                        <Typography
                            sx={{
                                marginLeft: "1rem"
                            }}
                            variant='h2'
                        >
                            {job?._scope.slice(0).reverse().map((num, index) => index !== job._scope.length - 1 ? num + "% - " : num + "%")}
                        </Typography>
                    </Box>

                    {/* job ID */}
                    <Box
                        sx={{
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <Typography variant='h2'>
                            מס' משרה:
                        </Typography>
                        <Typography
                            sx={{
                                marginLeft: "1rem"
                            }}
                            variant='h2'
                        >
                            {job?._jobNumber}
                        </Typography>
                    </Box>
                </Box>

            </Box>


            <Button
                color='secondary'
                onClick={() => theme.palette.mode === "light" ? colorMode.toggleColorMode("dark") : colorMode.toggleColorMode("light")}
            >
                Toggle Theme
            </Button>
        </Box>
    );
}

const getJobIdFromUrl = (pathname: string) =>
{
    return pathname.split("/").slice(-1)[0];
}
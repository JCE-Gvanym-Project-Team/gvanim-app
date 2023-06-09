import { AddBoxSharp, ArrowBack, AttachFile, DeleteForeverOutlined, Label, LocationOn, Redo } from '@mui/icons-material'
import { Box, Button, Divider, Input, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ColorModeContext, colorTokens } from '../theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { Job, getFilteredJobs } from '../../Firebase/FirebaseFunctions/Job';
import { Recomendation } from '../../Firebase/FirebaseFunctions/Recomendation';

const ABOUT_MAX_LENGTH = 1000;
const MAX_RECOMMENDERS = 3;

export default function OneJobPage()
{
    const [job, setJob] = useState<Job | null>(null);

    const state = useLocation();
    const navigate = useNavigate();

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // get current job from URL
    const fetchJobs = async () =>
    {
        setJob((await getFilteredJobs(["jobNumber"], [getJobIdFromUrl(state.pathname)]))[0]);
    }

    useEffect(() =>
    {
        fetchJobs();
    }, [state])

    // about text field
    const [aboutNumChars, setAboutNumChars] = useState(0);

    // recommenders
    const [numRecommenders, setNumRecommenders] = useState(3);
    const recommendersList = [
        [null, null],
        [null, null],
        [null, null]
    ]; // list of recommenders and attached files

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "stretch",
                marginLeft: { xs: "0", md: "0.2rem" },
                marginRight: { xs: "0", md: "0.2rem" },
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
                        color: "primary.main"
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
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "stretch",
                    backgroundColor: "background.main",
                    marginTop: "1rem",
                }}
            >

                {/* description and requirements */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        backgroundColor: "background.box",
                        flex: 8,
                        marginRight: { xs: "0", md: "1rem" },
                        marginBottom: { xs: "1rem", md: "0" }
                    }}
                >
                    {/* description */}
                    <Box
                        sx={{
                            padding: "1rem",
                            flex: 7
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
                            sx={{
                                backgroundColor: "background.boxInner"
                            }}
                        >
                            {job?._description}
                        </Typography>
                    </Box>

                    {/* requirements */}
                    <Box
                        sx={{
                            backgroundColor: "background.box",
                            padding: "1rem",
                            flex: 5
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
                            marginTop={"0.5rem"}
                            sx={{
                                backgroundColor: "background.boxInner"
                            }}
                        >
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
                                marginLeft: "1rem",
                                backgroundColor: "background.boxInner"
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
                                marginLeft: "1rem",
                                backgroundColor: "background.boxInner"
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
                                marginLeft: "1rem",
                                backgroundColor: "background.boxInner"
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
                                marginLeft: "1rem",
                                backgroundColor: "background.boxInner"
                            }}
                            variant='h2'
                        >
                            {job?._jobNumber}
                        </Typography>
                    </Box>
                </Box>

            </Box>

            {/* Apply Text */}
            <Typography
                variant='h2'
                sx={{
                    alignSelf: "center",
                    marginTop: "1rem"
                }}
            >
                להגשת מועמדות
            </Typography>

            {/* Candidate Details */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "background.box",
                    marginTop: "0.5rem",
                }}
            >

                {/* Details */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        padding: "1rem",
                        paddingLeft: { xs: "0", md: "1rem" },
                        paddingRight: { xs: "0", md: "1rem" }
                    }}
                >
                    {/* Firstname and Lastname */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            marginRight: { xs: "1rem", md: "5rem" }
                        }}
                    >
                        {/* Firstname */}
                        <Box>
                            <Typography variant='h4'>
                                שם פרטי:
                            </Typography>
                            <TextField />
                        </Box>

                        {/* Lastname */}
                        <Box
                            sx={{
                                marginLeft: { xs: "0", md: "5rem" }
                            }}
                        >
                            <Typography variant='h4'>
                                שם משפחה:
                            </Typography>
                            <TextField
                                variant='outlined'
                                size='medium'
                                sx={{
                                    backgroundColor: "background.boxInner",
                                    input: { color: "primary.main" }
                                }}
                            />


                        </Box>

                    </Box>

                    {/* Phone and Email */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" }
                        }}
                    >
                        {/* Phone */}
                        <Box>
                            <Typography variant='h4'>
                                טלפון:
                            </Typography>
                            <TextField>

                            </TextField>
                        </Box>

                        {/* Email */}
                        <Box
                            sx={{
                                marginLeft: { xs: "0", md: "5rem" }
                            }}
                        >
                            <Typography variant='h4'>
                                אימייל:
                            </Typography>
                            <TextField
                                variant='filled'
                                size='medium'
                                type='email'
                                sx={{
                                    backgroundColor: "background.boxInner",
                                    input: { color: "primary.main" }
                                }}
                            />
                        </Box>

                    </Box>
                </Box>

                {/* About */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "1rem"
                    }}
                >
                    <TextField
                        label="ספר/י לנו עליך"
                        multiline
                        rows={10}
                        sx={{
                            width: { xs: "100%", md: "90%" }
                        }}
                        inputProps={{
                            maxLength: ABOUT_MAX_LENGTH
                        }}
                        onChange={(event) =>
                        {
                            setAboutNumChars(event?.target.value.length);
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "end",
                            width: { xs: "100%", md: "90%" },
                            marginBottom: "1rem"
                        }}
                    >
                        <Typography variant='h4'>
                            {aboutNumChars} / {ABOUT_MAX_LENGTH}
                        </Typography>
                    </Box>
                </Box>

                {/* Recommenders */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >

                    <Typography variant='h2' justifySelf={"center"}>
                        הוספת ממליצים
                    </Typography>

                    {/* List of recommenders */}
                    <Box sx={{
                        backgroundColor: "background.boxInner",
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                        alignItems: "center",
                    }}
                    >
                        {Array.from({ length: numRecommenders }, (_, index) => index).map((element, index) =>
                        {
                            return (
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    marginBottom: "1rem"
                                }}
                                    key={index + "box"}
                                >

                                    <Button 
                                    sx={{
                                        display: {xs: "none", md: "flex"}
                                    }}
                                    >
                                        <DeleteForeverOutlined />
                                    </Button>
                                    {/* Recommender */}
                                    <Box
                                        sx={{
                                            backgroundColor: "background.box",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            padding: "1rem",
                                            paddingTop: "0",
                                            paddingBottom: "1rem",
                                        }}>

                                        {/* name + phone + email + buttons*/}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: { xs: "column", md: "row" }
                                            }}
                                        >
                                            {/* mobile delete + attach file buttons */}
                                            <Box
                                                sx={{
                                                    display: { xs: "flex", md: "none" },
                                                    flexDirection: "row",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                {/* mobile attach file button */}
                                                <Button
                                                    variant='outlined'
                                                    sx={{
                                                        display: { xs: "block", md: "none" }
                                                    }}
                                                >
                                                    <AttachFile
                                                        sx={{ fontSize: "24px" }}
                                                    />
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            display: { xs: "none", md: "block" }
                                                        }}>
                                                        הוספת קובץ
                                                    </Typography>
                                                </Button>

                                                {/* Remove recommender button */}
                                                <Button>
                                                    <DeleteForeverOutlined />
                                                </Button>
                                            </Box>

                                            {/* Recommender name */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginRight: "1rem"
                                                }}
                                            >
                                                <Typography
                                                    variant='h4'
                                                >
                                                    שם:
                                                </Typography>
                                                <TextField />
                                            </Box>

                                            {/* Recommender phone */}
                                            <Box
                                                sx={{
                                                    marginRight: "1rem"
                                                }}>
                                                <Typography
                                                    variant='h4'
                                                >
                                                    טלפון:
                                                </Typography>
                                                <TextField />
                                            </Box>
                                            {/* Recommender email */}
                                            <Box sx={{ marginRight: "1rem" }}>
                                                <Typography
                                                    variant='h4'
                                                >
                                                    אימייל:
                                                </Typography>
                                                <TextField />
                                            </Box>
                                        </Box>

                                        {/* Attach recommender file button */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                height: "72%",
                                                alignSelf: "end",
                                            }}
                                        >
                                            {/* PC button */}
                                            <Button
                                                variant='outlined'
                                                sx={{
                                                    display: { xs: "none", md: "flex" }
                                                }}
                                            >
                                                <AttachFile
                                                    sx={{ fontSize: "24px" }}
                                                />
                                                <Typography
                                                    variant='h4'
                                                    sx={{
                                                        display: { xs: "none", md: "block" }
                                                    }}>
                                                    הוספת קובץ
                                                </Typography>
                                            </Button>
                                        </Box>

                                    </Box>
                                </Box>
                            );
                        })}

                        {/* Add recommender button */}
                        <Box
                            sx={{
                                width: "95%",
                                display: numRecommenders >= MAX_RECOMMENDERS + 90 ? "none" : "block"
                            }}>

                            <Button
                                sx={{
                                    alignSelf: "start"
                                }}
                                onClick={() =>
                                {
                                    if (numRecommenders >= MAX_RECOMMENDERS)
                                    {
                                        setNumRecommenders(MAX_RECOMMENDERS);
                                        return;
                                    }
                                    setNumRecommenders(numRecommenders + 1);
                                }}
                            >
                                <AddBoxSharp />
                                הוספת ממליץ
                            </Button>
                        </Box>

                    </Box>

                </Box>

                {/* Buttons */}
                <Box>

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
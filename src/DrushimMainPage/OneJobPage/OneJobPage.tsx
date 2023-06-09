import { AddBoxSharp, ArrowBack, AttachFile, DeleteForeverOutlined, Label, LocationOn, Redo, Send } from '@mui/icons-material'
import { Box, Button, Divider, Input, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
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

    // about text field
    const [aboutNumChars, setAboutNumChars] = useState(0);

    // recommenders
    const [numRecommenders, setNumRecommenders] = useState(0);
    const [recommendersList, setRecommendersList] = useState<Array<[Recomendation | null, File | null]>>();

    // changes recommendersList at the given index
    const updateRecommendersListAtIndex = function (newRecommendation: Recomendation | null, newFile: File | null, index: number)
    {
        setRecommendersList(prevList =>
        {
            const newList = [...prevList!]; // Create a copy of the array
            if (newList.length > 0)
            {
                newList[index] = [newRecommendation, newFile]; // Set the new value at index 0
            }
            return newList;
        });
    }

    // recommender file input ref
    const recommenderFileInputRef = useRef<HTMLInputElement>(null);

    // CV file
    const cvFileInputRef = useRef<HTMLInputElement>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);

    useEffect(() =>
    {
        fetchJobs();
        let temp = Array<[Recomendation | null, File | null]>();
        for (let index = 0; index < MAX_RECOMMENDERS; index++)
        {
            temp.push([null, null])
        }
        setRecommendersList(temp);
    }, [state])


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
                        alignSelf: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "90%"
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
                        marginTop: "1rem"
                    }}
                    >
                        {recommendersList?.map((recommender, index) =>
                        {
                            if (recommender[0] !== null)
                            {
                                return (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "100%",
                                            marginBottom: index >= MAX_RECOMMENDERS - 1 ? "0" : "1rem"
                                        }}
                                        key={index + "box"}
                                    >

                                        {/* delete recommender button */}
                                        <Button
                                            sx={{
                                                display: { xs: "none", md: "flex" }
                                            }}
                                            onClick={() =>
                                            {
                                                updateRecommendersListAtIndex(null, null, index);
                                                setNumRecommenders(numRecommenders - 1);
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
                                                        onClick={() =>
                                                        {

                                                        }}
                                                    >
                                                        <AttachFile
                                                            sx={{ fontSize: "24px" }}
                                                        />
                                                    </Button>

                                                    {/* Remove recommender button */}
                                                    <Button
                                                        onClick={() =>
                                                        {
                                                            updateRecommendersListAtIndex(null, null, index);
                                                            setNumRecommenders(numRecommenders - 1);
                                                        }}
                                                    >
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
                                                    <TextField
                                                        onChange={(event) =>
                                                        {
                                                            const currentRecommender = recommendersList[index][0];
                                                            updateRecommendersListAtIndex(
                                                                new Recomendation(event.target.value,
                                                                    currentRecommender?._phone!,
                                                                    currentRecommender?._eMail!
                                                                ),
                                                                null,
                                                                index
                                                            );
                                                        }}
                                                    />
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
                                                    <TextField
                                                        onChange={(event) =>
                                                        {
                                                            const currentRecommender = recommendersList[index][0];
                                                            updateRecommendersListAtIndex(
                                                                new Recomendation(currentRecommender?._fullName!,
                                                                    event.target.value,
                                                                    currentRecommender?._eMail!
                                                                ),
                                                                null,
                                                                index
                                                            );
                                                        }}
                                                    />
                                                </Box>
                                                {/* Recommender email */}
                                                <Box sx={{ marginRight: "1rem" }}>
                                                    <Typography
                                                        variant='h4'
                                                    >
                                                        אימייל:
                                                    </Typography>
                                                    <TextField
                                                        onChange={(event) =>
                                                        {
                                                            const currentRecommender = recommendersList[index][0];
                                                            updateRecommendersListAtIndex(
                                                                new Recomendation(currentRecommender?._fullName!,
                                                                    currentRecommender?._phone!,
                                                                    event.target.value
                                                                ),
                                                                null,
                                                                index
                                                            );
                                                        }}

                                                    />
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
                                                {/* PC add recommender file button */}
                                                <Input
                                                    type="file"
                                                    inputRef={recommenderFileInputRef}
                                                    style={{ display: 'none' }}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                    {
                                                        const files = event.target.files!;
                                                        updateRecommendersListAtIndex(recommendersList[index][0], files[0], index);
                                                    }}
                                                />
                                                <Button
                                                    sx={{
                                                        display: { xs: "none", md: "flex" }
                                                    }}
                                                    onClick={() =>
                                                    {
                                                        // trigger input onChange
                                                        if (recommenderFileInputRef.current)
                                                        {
                                                            recommenderFileInputRef.current.click();
                                                        }
                                                    }}

                                                >
                                                    <AttachFile
                                                        sx={{ fontSize: "24px" }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            flexDirection: "column"
                                                        }}
                                                    >
                                                        <Typography
                                                            variant='h4'
                                                            sx={{
                                                                display: { xs: "none", md: "block" }
                                                            }}>
                                                            העלאת קובץ
                                                        </Typography>

                                                        {/* display filename to the user */}
                                                        <Typography variant='h6'>
                                                            {recommendersList[index][1]?.name.length! > 20 ? '...' : ''}
                                                            {recommendersList[index][1]?.name.slice(0, 20)}
                                                        </Typography>
                                                    </Box>
                                                </Button>

                                            </Box>

                                        </Box>
                                    </Box>
                                );
                            }
                        })}

                        {/* Add recommender button */}
                        <Box
                            sx={{
                                width: "95%",
                                display: numRecommenders >= MAX_RECOMMENDERS ? "none" : "block"
                            }}>

                            <Button
                                sx={{
                                    alignSelf: "start"
                                }}
                                onClick={() =>
                                {
                                    for (let index = 0; index < recommendersList?.length!; index++)
                                    {
                                        const recommender = recommendersList?.at(index);
                                        if (recommender?.at(0) === null)
                                        {
                                            updateRecommendersListAtIndex(new Recomendation("", "", ""), null, index);
                                            setNumRecommenders(numRecommenders + 1);
                                            if (numRecommenders > MAX_RECOMMENDERS)
                                            {
                                                setNumRecommenders(MAX_RECOMMENDERS);
                                            }
                                            return;
                                        }
                                        console.log(recommendersList);
                                    }
                                }}
                            >
                                <AddBoxSharp />
                                הוספת ממליץ
                            </Button>
                        </Box>

                    </Box>

                </Box>

                {/* Submit buttons */}
                <Box
                    sx={{
                        width: "90%",
                        alignSelf: "center",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                        marginTop: "1rem"
                    }}
                >

                    {/* attach CV file button */}
                    <Box>
                        <Input
                            type="file"
                            inputRef={cvFileInputRef}
                            style={{ display: 'none' }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            {
                                const files = event.target.files!;
                                setCvFile(files[0]);
                            }}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: "background.boxInner",
                                color: "primary.main",
                                "&:hover": {
                                    backgroundColor: "background.main"
                                }
                            }}
                            onClick={() =>
                            {
                                // trigger input onChange
                                if (cvFileInputRef.current)
                                {
                                    cvFileInputRef.current.click();
                                }
                            }}

                        >
                            <AttachFile
                                sx={{ fontSize: "24px" }}
                            />
                            <Box
                                sx={{
                                    flexDirection: "column"
                                }}
                            >
                                <Typography variant='h4'>
                                    העלאת קו"ח
                                </Typography>

                                {/* display filename to the user */}
                                <Typography variant='h6'>
                                    {cvFile?.name.slice(0, 10)}
                                    {cvFile?.name.length! > 10 ? '...' : ''}
                                </Typography>
                            </Box>
                        </Button>
                    </Box>

                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: "background.boxInner",
                            color: "primary.main",
                            "&:hover": {
                                backgroundColor: "background.main"
                            }
                        }}
                    >
                        <Typography variant='h4'>
                            שליחה
                        </Typography>
                        <Send sx={{fontSize: "24px", transform: "scaleX(-1)", marginLeft: "0.5rem"}}/>
                    </Button>
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
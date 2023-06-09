import { CalendarMonth, ErrorOutline, QuestionAnswer } from '@mui/icons-material';
import { Autocomplete, Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MyLoading from '../../../../Components/MyLoading/MyLoading';
import { Candidate, getFilteredCandidates } from '../../../../Firebase/FirebaseFunctions/Candidate';
import { CandidateJobStatus, allStatus, getFilteredCandidateJobStatuses } from '../../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { Job, getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/Job';
import { BoxGradientSx, GlobalStyle } from '../../../PageStyles';
import AreYouSureDialog from '../Components/AreYouSureDialog/AreYouSureDialog';
import SuccessMessageSnackbar from '../Components/SuccessMessageSnackbar/SuccessMessageSnackbar';
import ScheduleInterviewDialog from './Components/ScheduleInterviewDialog/ScheduleInterviewDialog';
import { appliedDateTextSx, autoCompleteSx, candidateNameAndButtonSx, candidateNameSx, chooseJobAndInterviewContainerSx, chooseJobContainerSx, errorTextSx, interviewSummaryButtonsContainerSx, interviewSummaryContentSx, interviewSummaryTextSx, mainStackSx, scheduleInterviewButton, scheduleInterviewContainer, scheduleInterviewText, textSx } from './ManageInterviewsPageStyle';
export default function ManageInterviewsPage(props: { candidateId: string })
{

	const { candidateId } = props;
	const [candidateInfo, setCandidateInfo] = useState<Candidate | null>(null);
	const [candidateAppliedJobs, setCandidateAppliedJobs] = useState<Job[]>([]);
	const [allJobs, setAllJobs] = useState<Job[]>([]);
	const [selecetedJob, setSelectedJob] = useState<Job | null>(null);
	const [selectedJobError, setSelectedJobError] = useState(false);

	const [interviewIndex, setInterviewIndex] = useState(-1);

	// select job use states
	const [jobValue, setJobValue] = useState("");

	// schedule interview use states
	const [interviewDialogOpen, setInterviewDialogOpen] = useState(false);

	// candidate_job_status after selecting a job
	const [candidateJobStatus, setCandidateJobStatus] = useState<CandidateJobStatus | null>(null);

	// matching rate
	const [matchingRate, setMatchingRate] = useState(0);

	// interview summary text field
	const [interviewSummary, setInterviewSummary] = useState<string | undefined>("");

	// flag to hide the choose interview option
	const [hideChooseInterview, setHideChooseInterview] = useState(true);

	// key to rerender choose interview
	const [chooseInterviewIndexKey, setChooseInterviewIndexKey] = useState("0");

	// key to rerender entire page
	const [rerenderKey, setRerenderKey] = useState("");

	// while we're waiting for firebase, load
	const [loading, setLoading] = useState(false);

	// use effects
	useEffect(() =>
	{
		getCandidate(candidateId, setCandidateInfo);
		getJobs(candidateId, setCandidateAppliedJobs, setAllJobs);
	}, [candidateId]);


	useEffect(() =>
	{
		handleChooseJob();
	}, [jobValue])

	useEffect(() =>
	{
		setJobValue("");
	}, [rerenderKey])

	// autcomplete job select
	const handleChooseJob = async function ()
	{
		const jobNumberString = jobValue?.match(/\d+/)?.[0];
		const jobNumber = jobNumberString ? parseInt(jobNumberString) : NaN;


		if (Number.isNaN(jobNumber))
		{
			setHideChooseInterview(true);
			return;
		}
		setHideChooseInterview(false);
		const candidateJobStatuses = await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], [jobNumber.toString(), candidateId]);
		setCandidateJobStatus(candidateJobStatuses[0]);
	}


	// schedule interview button handler and close handler
	const scheduleInterviewOpenHandler = () =>
	{
		if (jobValue === "")
		{
			setSelectedJobError(true);
			return;
		}
		setInterviewDialogOpen(true);
	}

	const scheduleInterviewCloseHandler = (event, reason) =>
	{
		if ((reason && reason !== "backdropClick") || reason === undefined)
		{
			setInterviewDialogOpen(false);
		}
		getJobs(candidateId, setCandidateAppliedJobs, setAllJobs);
	}

	const handleinterviewSummaryChange = async (event) =>
	{

		setInterviewSummary(event.target.value);
		// save every 15 characters
		if (interviewSummary?.length && interviewSummary?.length % 15 === 0)
		{
			await candidateJobStatus?.editInterviewSummery(interviewSummary, interviewIndex);
		}

	}

	const handleSaveButtonClick = async () =>
	{
		setAreYouSureDialogOpen(true);
		setAreYouSureDialogMessage("פעולה זו תשמור את סיכום הראיון ואת דרגת ההתאמה למשרה של: " + candidateInfo?._firstName + " " + candidateInfo?._lastName)
		setAreYouSureCallback(() => async () =>
		{
			setLoading(true);
			await candidateJobStatus?.editInterviewSummery(interviewSummary ? interviewSummary : "", interviewIndex);
			await candidateJobStatus?.updateMatchingRate(matchingRate);
			setLoading(false);
			setRerenderKey(rerenderKey === "1" ? "0" : "1");
			return true;
		});
	}

	// are you sure dialog
	const [areYouSureDialogOpen, setAreYouSureDialogOpen] = useState(false);
	const [areYouSureCallback, setAreYouSureCallback] = useState<(() => {})>();
	const [areYouSureDialogMessage, setAreYouSureDialogMessage] = useState("");

	const closeAreYouSureDialog = (event, reason) =>
	{
		if ((reason && reason !== "backdropClick") || reason === undefined)
		{
			setAreYouSureDialogOpen(false);
		}
	}

	// success message
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const snackBarOnClose = () =>
	{
		setSnackBarOpen(false);
	}

	const handleMatchingRateRadioButtons = async (event) =>
	{
		setMatchingRate(["1", "2", "3", "4", "5"].includes(event.target.value) ? parseInt(event.target.value) : -1);
	}

	return (
		loading ? <MyLoading loading={loading} setLoading={setLoading} /> :
			<React.Fragment key={rerenderKey}>
				{/* background div */}
				<Box sx={BoxGradientSx}>

					<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
						right: '4%',
						left: 'auto',
						bottom: 'auto',
						backgroundColor: 'hsla(0,0%,100%,.1)',
						background: 'hsla(0,0%,100%,.1)',
						width: '120px',
						height: '120px',
						borderRadius: '50%',
						position: 'absolute',
					}} />

					<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
						right: '10%',
						left: 'auto',
						backgroundColor: 'hsla(0,0%,100%,.1)',
						background: 'hsla(0,0%,100%,.1)',
						width: '200px',
						height: '200px',
						borderRadius: '50%',
						position: 'absolute',
					}} />

					<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
						left: '40%',
						top: '-1%',
						right: 'auto',
						bottom: 'auto',
						backgroundColor: 'hsla(0,0%,100%,.1)',
						background: 'hsla(0,0%,100%,.1)',
						width: '60px',
						height: '60px',
						borderRadius: '50%',
						position: 'absolute',
					}} />


					<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
						right: '5%',
						top: '20%',
						bottom: 'auto',
						backgroundColor: 'hsla(0,0%,100%,.1)',
						background: 'hsla(0,0%,100%,.1)',
						width: '120px',
						height: '120px',
						borderRadius: '50%',
						position: 'absolute',
					}} />

					<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
						left: '2%',
						top: '12%',
						bottom: 'auto',
						backgroundColor: 'hsla(0,0%,100%,.1)',
						background: 'hsla(0,0%,100%,.1)',
						width: '120px',
						height: '120px',
						borderRadius: '50%',
						position: 'absolute',
					}} />

					<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
						left: '4%',
						top: '8%',
						bottom: 'auto',
						backgroundColor: 'hsla(0,0%,100%,.1)',
						background: 'hsla(0,0%,100%,.1)',
						width: '80px',
						height: '80px',
						borderRadius: '50%',
						position: 'absolute',
					}} />

					<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
						left: '25%',
						top: '12%',
						bottom: 'auto',
						backgroundColor: 'hsla(0,0%,100%,.1)',
						background: 'hsla(0,0%,100%,.1)',
						width: '60px',
						height: '60px',
						borderRadius: '50%',
						position: 'absolute',
					}} />

					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "end", height: { xs: "280px", md: "220px" }, marginBottom: { xs: "1rem", md: "0" } }}>
						<Stack direction='row' spacing={1}>
							<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
								<QuestionAnswer sx={{ color: '#fff' }} />
							</Box>
							<Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 500 }}>
								ראיונות
							</Typography>
						</Stack>
						<Box sx={{ background: 'linear-gradient(90deg,hsla(0,0%,100%,0),#fff,hsla(0,0%,100%,0))', padding: 0.05, width: '100%', mt: 2 }} />
						{/* Candidate Name */}
						<Box sx={{ display: 'flex', alignSelf: "center" }}>
							<Typography sx={candidateNameSx} variant='h3' >
								{candidateInfo?._firstName + " " + candidateInfo?._lastName}
							</Typography>

						</Box>
					</Box>
				</Box>

				{/* glass container */}
				<Box>
					<Box sx={{ marginLeft: { xs: "0", md: "3rem" }, marginRight: { xs: "0", md: "3rem" } }} >
						<Stack direction={'column'} sx={mainStackSx} spacing={6}>

							<Box sx={candidateNameAndButtonSx}>

								{/* Schedule Interview Button*/}
								<Box sx={scheduleInterviewContainer}>
									<ScheduleInterviewDialog
										open={interviewDialogOpen}
										onClose={scheduleInterviewCloseHandler}
										candidate={candidateInfo}
										candidateJobStatus={candidateJobStatus}
										candidateJobs={candidateAppliedJobs}
										allJobs={allJobs}
										chosenJobValue={jobValue}
										rerenderKey={rerenderKey}
										setRerenderKey={setRerenderKey}
										setLoading={setLoading}
									/>
								</Box>
							</Box>

							{/* status and change status */}
							<Box sx={{ display: 'flex', flexDirection: { xs: "column-reverse", md: "row" }, marginBottom: { xs: "3rem", md: "0" }, justifyContent: "space-between" }}>


								<Box sx={{
									marginBottom: "1rem"
								}}>
									<Typography sx={textSx} variant='h4'>
										סטטוס: {candidateJobStatus?._status}
									</Typography>
								</Box>


								<Box sx={{ display: "flex", flexDirection: "column", width: { xs: "50vw", md: "290px" }, alignSelf: { xs: "center", md: "center" } }}>
									<Button sx={scheduleInterviewButton} variant="contained" startIcon={<CalendarMonth />} onClick={scheduleInterviewOpenHandler}>
										קביעת ראיון ושינוי סטטוס
									</Button>
									<Divider />
									<Box sx={{
										display: "flex",
										flexDirection: { xs: "column", md: "row" }
									}}>
										<Typography sx={scheduleInterviewText}>
											סטטוס השתנה ב:
										</Typography>
										<Typography sx={scheduleInterviewText}>
											{(new Date(candidateJobStatus?._lastUpdate!)).toLocaleString()}
										</Typography>
									</Box>
								</Box>
							</Box>
							<Box sx={{ display: candidateJobStatus?._status === allStatus[8] && jobValue ? 'flex' : "none" }}>
								<Typography sx={textSx} variant='h4'>
									סיבת דחייה:
								</Typography>

								<Typography variant='h4' sx={textSx} style={{ marginRight: "1rem" }}>
									{candidateJobStatus?._rejectCause}
								</Typography>
							</Box>

							<Divider />
							{/* Choose Job and interview*/}
							<Box sx={chooseJobAndInterviewContainerSx}>
								{/* Choose Job */}
								<Box sx={chooseJobContainerSx}>
									<Autocomplete
										disablePortal
										options={candidateAppliedJobs.map((job) => job._jobNumber.toString() + ", " + job._role + ", " + job._region)}
										sx={autoCompleteSx}
										renderInput={(params) =>
											<TextField
												{...params}
												label="בחירת משרה"
												sx={{
													'& .MuiOutlinedInput-root': {
														'& fieldset': {
															borderColor: selectedJobError && jobValue === "" ? 'red' : "",
														}
													},
												}}
											/>
										}
										onInputChange={(event, value) =>
										{
											setSelectedJobError(false);
											if (chooseInterviewIndexKey === "0")
											{
												setChooseInterviewIndexKey("1");
											} else
											{
												setChooseInterviewIndexKey("0");
											}
											setInterviewSummary("");
											setInterviewIndex(-1);
											if (!value || value === "")
											{
												setCandidateJobStatus(null);
											}
											setJobValue(value);
										}}
									/>
									{jobValue !== "" ?
										<Typography sx={appliedDateTextSx}>
											הגיש\ה ב: {new Date(candidateJobStatus?._applyDate!).toLocaleDateString()}
										</Typography> :
										<></>
									}
									{selectedJobError && jobValue === "" ?
										<Box sx={{ display: "flex", flexDirection: "row", alignSelf: "start" }}>
											<ErrorOutline sx={{ color: "red" }} />
											<Typography sx={errorTextSx}>
												שדה זה הוא חובה
											</Typography>
										</Box> :
										<></>
									}
								</Box>


								{/* Choose Interview */}
								<Box sx={{ display: hideChooseInterview ? "none" : "block" }}>
									<Autocomplete
										key={chooseInterviewIndexKey}
										disablePortal
										options={["ראיון ראשון", "ראיון שני"]}
										sx={autoCompleteSx}
										renderInput={(params) => <TextField {...params} label="בחירת ראיון" />}
										onInputChange={(event, value) =>
										{
											setMatchingRate(candidateJobStatus ? candidateJobStatus?._matchingRate : -1);
											if (value === "ראיון ראשון")
											{
												setInterviewIndex(0);
												setInterviewSummary(candidateJobStatus?._interviewsSummery[0]);
											} else if (value === "ראיון שני")
											{
												setInterviewIndex(1);
												setInterviewSummary(candidateJobStatus?._interviewsSummery[1]);

											} else
											{
												setInterviewIndex(-1);
												setInterviewSummary("");
											}
										}}
									/>
								</Box>
							</Box>

							<AreYouSureDialog
								open={areYouSureDialogOpen}
								onClose={closeAreYouSureDialog}
								message={areYouSureDialogMessage}
								callback={areYouSureCallback}
								setSnackBarOpen={setSnackBarOpen}
							/>
							<SuccessMessageSnackbar open={snackBarOpen} onClose={snackBarOnClose} />

							{/* Summary of interview */}
							{interviewIndex !== -1 && jobValue !== "" ?
								<Box sx={{ display: "flex", flexDirection: "column" }}>
									<Typography sx={interviewSummaryTextSx} variant='h6'>
										סיכום ראיון
									</Typography>
									<TextField
										sx={interviewSummaryContentSx}
										multiline
										minRows={3}
										maxRows={5}
										InputProps={{
											style: { overflow: 'auto', maxHeight: '300px' },
										}}
										value={interviewSummary}
										onInput={handleinterviewSummaryChange}
									/>
									{/* Level of compatibility */}
									<Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
										<FormControl>
											<FormLabel>דרגת התאמה (יותר גבוה = יותר מתאים)</FormLabel>
											<RadioGroup row value={matchingRate.toString()} onChange={handleMatchingRateRadioButtons}>
												<FormControlLabel value="1" control={<Radio />} label="1" />
												<FormControlLabel value="2" control={<Radio />} label="2" />
												<FormControlLabel value="3" control={<Radio />} label="3" />
												<FormControlLabel value="4" control={<Radio />} label="4" />
												<FormControlLabel value="5" control={<Radio />} label="5" />
											</RadioGroup>
										</FormControl>
										{/* form buttons */}
										<Box sx={interviewSummaryButtonsContainerSx}>
											<Button
												variant='contained'
												sx={{ backgroundColor: GlobalStyle.NavbarBackgroundColor, justifySelf: "start", alignSelf: "start" }}
												onClick={handleSaveButtonClick}
											>שמירה
											</Button>
										</Box >
									</Box>
								</Box>
								: <></>
							}
						</Stack>
					</Box>
				</Box>
			</React.Fragment >
	)
}

// get candidate info as a Candidate object
const getCandidate = async function (candidateId: string, setCandidateInfo)
{
	const filteredCandidates: Candidate[] = await getFilteredCandidates(["id"], [candidateId]);
	setCandidateInfo(filteredCandidates[0]);
}

const getJobs = async function (candidateId: string, setCandidateAppliedJobs, setAllJobs)
{
	// get a list of all job numbers
	// for the jobs this candidate applied to
	const candidateJobStatuses = await getFilteredCandidateJobStatuses(["candidateId"], [candidateId]);
	let jobNumbers: number[] = [];
	candidateJobStatuses.forEach(element =>
	{
		jobNumbers.push(element._jobNumber);
	});

	// get all jobs from firebase
	let jobs = await getFilteredJobs();
	setAllJobs(jobs);

	// filter them by the list of job numbers 
	// we got from the previous request to firebase
	jobs = jobs.filter(job =>
	{
		return jobNumbers.includes(job._jobNumber);
	});
	setCandidateAppliedJobs(jobs)
}
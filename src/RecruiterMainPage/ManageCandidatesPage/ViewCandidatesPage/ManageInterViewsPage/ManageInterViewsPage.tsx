import React, { useEffect, useState } from 'react'
import { BoxGradientSx, ContainerGradientSx, appliedDateTextSx, autoCompleteSx, candidateNameAndButtonSx, candidateNameSx, chooseJobAndInterviewContainerSx, chooseJobContainerSx, errorTextSx, interviewSummaryContentSx, interviewSummaryTextSx, mainStackSx, scheduleInterviewButton, scheduleInterviewContainer, scheduleInterviewText, textSx, titleSx } from './ManageInterviewsPageStyle';
import { Autocomplete, Box, Button, Container, Divider, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import { ManageCandidatesPageGlobalStyle } from '../../../PageStyles';
import { Candidate, getFilteredCandidates } from '../../../../Firebase/FirebaseFunctions/Candidate';
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from '../../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { Job, getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/Job';
import { CalendarMonth, ErrorOutline } from '@mui/icons-material';
import ScheduleInterviewDialog from './Components/ScheduleInterviewDialog';

export default function ManageInterviewsPage(props: { candidateId: string, setHomeActive: any, setReportsActive: any, setCandidatesActive: any, setJobsActive: any })
{

	const { candidateId, setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;
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
	const [lastScheduleDate, setLastScheduleDate] = useState<Date | null>();
	const [appliedDate, setAppliedDate] = useState<Date | null>(null);

	// use effects
	useEffect(() =>
	{
		setHomeActive(false);
		setReportsActive(false);
		setCandidatesActive(false);
		setJobsActive(false);

		getCandidate(candidateId, setCandidateInfo);
		getJobs(candidateId, setCandidateAppliedJobs, setAllJobs);
	}, [candidateId]);


	useEffect(() =>
	{
		handleChooseJob();
	}, [jobValue])


	// autcomplete job select
	const handleChooseJob = async function ()
	{
		const jobNumberString = jobValue?.match(/\d+/)?.[0];
		const jobNumber = jobNumberString ? parseInt(jobNumberString) : NaN;


		if (Number.isNaN(jobNumber))
		{
			return;
		}
		const candidateJobStatuses = await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], [jobNumber.toString(), candidateId]);
		setCandidateJobStatus(candidateJobStatuses[0]);
		setLastScheduleDate(candidateJobStatuses[0]._lastUpdate);
		setAppliedDate(candidateJobStatuses[0]._applyDate);
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

	const scheduleInterviewCloseHandler = (event, reason, interviewDate) =>
	{
		if ((reason && reason !== "backdropClick") || reason === undefined)
		{
			setInterviewDialogOpen(false);
		}
	}

	const handleinterviewSummaryChange = (event) => {
		console.log(event);
	} 

	return (
		<>
			{/* background div */}
			<Box sx={BoxGradientSx} />

			{/* glass container */}
			<Box sx={{ marginTop: ManageCandidatesPageGlobalStyle.marginFromNavbar }}>
				<Box sx={ContainerGradientSx}>
					<Stack direction={'column'} sx={mainStackSx} spacing={6}>

						<Typography sx={titleSx} variant='h2'>
							ראיונות
						</Typography>

						<Box sx={candidateNameAndButtonSx}>
							{/* Candidate Name */}
							<Box sx={{ display: 'flex' }}>
								<Typography sx={textSx} variant='h4'>
									שם:
								</Typography>

								<Typography sx={candidateNameSx} variant='h4' >
									{candidateInfo?._firstName + " " + candidateInfo?._lastName}
								</Typography>
							</Box>

							{/* Schedule Interview Button*/}
							<Box sx={scheduleInterviewContainer}>
								<Button sx={scheduleInterviewButton} variant="contained" startIcon={<CalendarMonth />} onClick={scheduleInterviewOpenHandler}>
									קביעת ראיון ושינוי סטטוס
								</Button>
								<Divider />
								<Typography sx={scheduleInterviewText}>
									נשלח לאחרונה ב: { }
								</Typography>
								<ScheduleInterviewDialog open={interviewDialogOpen} onClose={scheduleInterviewCloseHandler} candidate={candidateInfo} candidateJobStatus={candidateJobStatus} />
							</Box>
						</Box>

						{/* Choose Job and interview*/}
						<Box sx={chooseJobAndInterviewContainerSx}>
							{/* Choose Job */}
							<Box sx={chooseJobContainerSx}>
								<Autocomplete
									disablePortal
									options={candidateAppliedJobs.map((job) => job._jobNumber.toString() + ", " + job._role + ", " + job._region)}
									sx={autoCompleteSx}
									renderInput={(params) => <TextField {...params} label="בחירת משרה" />}
									onInputChange={(event, value) =>
									{
										setSelectedJobError(false);
										setJobValue(value);
									}}
								/>
								{jobValue !== "" ?
									<Typography sx={appliedDateTextSx}>
										הגיש\ה ב: {appliedDate ? appliedDate.getDay() + "/" + appliedDate.getMonth() + "/" + appliedDate.getFullYear() : ""}
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
							<Box>
								<Autocomplete
									disablePortal
									options={["ראיון ראשון", "ראיון שני"]}
									sx={autoCompleteSx}
									renderInput={(params) => <TextField {...params} label="בחירת ראיון" />}
									onInputChange={(event, value) =>
									{
										if (value === "ראיון ראשון")
										{
											setInterviewIndex(0);
										} else if (value === "ראיון שני")
										{
											setInterviewIndex(1);
										} else
										{
											setInterviewIndex(-1);
										}
									}}
								/>
							</Box>
						</Box>

						{/* Summary of interview */}
						{interviewIndex !== -1 && jobValue !== ""?
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
									value={candidateJobStatus?._interviewsSummery[interviewIndex]}
									onChange={handleinterviewSummaryChange}
								/>
								<Button variant='contained' sx={{ justifySelf: "start", alignSelf: "start" }}>שמירה</Button>
							</Box>
							: <></>
						}
					</Stack>
				</Box>
			</Box>
		</>
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
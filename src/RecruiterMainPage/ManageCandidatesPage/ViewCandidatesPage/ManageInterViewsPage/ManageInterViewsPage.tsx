import React, { useEffect, useState } from 'react'
import { BoxGradientSx, ContainerGradientSx, candidateNameSx, mainStackSx, textSx, titleSx } from './ManageInterviewsPageStyle';
import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import { ManageCandidatesPageGlobalStyle } from '../../../PageStyles';
import { Candidate, getFilteredCandidates } from '../../../../Firebase/FirebaseFunctions/Candidate';
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from '../../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { Job, getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/Job';

export default function ManageInterviewsPage(props: { candidateId: string, setHomeActive: any, setReportsActive: any, setCandidatesActive: any, setJobsActive: any })
{

	const { candidateId, setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;
	const [candidateInfo, setCandidateInfo] = useState<Candidate | null>(null);
	const [candidateAppliedJobs, setCandidateAppliedJobs] = useState<Job[]>([]);
	const [allJobs, setAllJobs] = useState<Job[]>([]);
	const [selecetedJob, setSelectedJob] = useState<Job | null>(null);

	const [jobValue, setJobValue] = useState("");




	// whenever candidate Id changes, rerender:
	useEffect(() =>
	{
		setHomeActive(false);
		setReportsActive(false);
		setCandidatesActive(false);
		setJobsActive(false);

		getCandidate(candidateId, setCandidateInfo);
		getJobs(candidateId, setCandidateAppliedJobs, setAllJobs);
	}, [candidateId]);


	// autcomplete job select
	const handleJobChange = function ()
	{
		console.log("hi");
	}

	return (
		<>
			{/* background div */}
			<Box sx={BoxGradientSx} />

			{/* glass container */}
			<Box sx={{ marginTop: ManageCandidatesPageGlobalStyle.marginFromNavbar }}>
				<Box sx={ContainerGradientSx}>
					<Stack direction={'column'} sx={mainStackSx} spacing={6}>

						{/* Title */}
						<Typography sx={titleSx} variant='h2'>
							ראיונות למועמד
						</Typography>

						{/* Candidate Name */}
						<Box sx={{ display: 'flex' }}>
							<Typography sx={textSx} variant='h4'>
								שם:
							</Typography>

							<Typography sx={candidateNameSx} variant='h4' >
								{candidateInfo?._firstName + " " + candidateInfo?._lastName}
							</Typography>
						</Box>

						{/* Choose Job */}
						<Box>
							<Autocomplete
								disablePortal
								options={candidateAppliedJobs.map((job) => job._jobNumber.toString() + ", " + job._role + ", " + job._region)}
								sx={{ width: 300 }}
								renderInput={(params) => <TextField {...params} label="בחירת משרה" />}
								onChange={handleJobChange}
								onInputChange={(event, value) =>
								{
									setJobValue(value);
								}}
							/>
						</Box>
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
	console.log(jobs);
}

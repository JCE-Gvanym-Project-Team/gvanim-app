import { useEffect, useState } from 'react'
import { Button, Typography, Box, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { editButtonSx, textSx, titleSx, mainStackSx, ContainerGradientSx, candidateNameSx, BoxGradientSx, candidateNameAndEditButtonContainerSx, jobTextSx } from './ViewCandidatesPageStyle';
import { ManageCandidatesPageGlobalStyle } from '../../PageStyles';
import JobsTable from './Components/JobsTable/JobsTable';
import { Candidate, getFilteredCandidates } from '../../../Firebase/FirebaseFunctions/Candidate';
import { useLocation } from 'react-router-dom';
import { Job, getFilteredJobs } from '../../../Firebase/FirebaseFunctions/Job';
import { getFilteredCandidateJobStatuses } from '../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import NotesPopup from './Components/NotesPopup/NotesPopup';

export default function ViewCandidatesPage()
{

	// get candidate id
	const { state } = useLocation();

	// get jobs data size
	const [dataSize, setDataSize] = useState(0);

	//extract candidate object from database
	let candidateId = "";
	if (state != null)
	{
		candidateId = state;
	}

	// candidate info
	const [candidateInfo, setCandidateInfo] = useState<Candidate | null>(null);
	const [jobs, setJobs] = useState<Job[]>([]);

	useEffect(() =>
	{
		// pull candidate from firebase
		getCandidate(candidateId, setCandidateInfo);

		// get list of all jobs for this candidate
		getJobs(candidateId, setJobs);
	})

	// comments popup handlers
	const [popupOpen, setPopupOpen] = useState(false);

	const commentsPopupOpenHandler = () =>
	{
		setPopupOpen(true);
	};

	const commentsPopupCloseHandler = () =>
	{
		setPopupOpen(false);
	};


	//TODO: remove this temporary candidateId
	// candidateId = "example@gmail_com055555555"
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
							צפייה במועמד
						</Typography>

						{/* Box for candidate name and 
					 	/* edit button to make them on the same line */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
							{/* Candidate Name */}
							<Box sx={{ display: 'flex' }}>
								<Typography sx={textSx} variant='h4'>
									שם:
								</Typography>

								<Typography sx={candidateNameSx} variant='h4' >
									{candidateInfo?._firstName}
								</Typography>
							</Box>

							{/* Edit Button */}
							<Button sx={editButtonSx} variant="contained" startIcon={<EditIcon />}>
								ערוך פרטים
							</Button>
						</Box>


						{/* text + move to another job button */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
							<Typography sx={jobTextSx} variant='h4'>
								משרות
							</Typography>

							<Button sx={editButtonSx} variant="contained" startIcon={<EditIcon />}>
								העבר למשרה אחרת
							</Button>
						</Box>

						{/* Jobs table */}
						<JobsTable setDataSize={setDataSize} jobs={jobs} />

						{/* Bottom Buttons */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
							<Button sx={editButtonSx} variant="contained" startIcon={<EditIcon />}>
								ניהול ראיונות
							</Button>
							<Button sx={editButtonSx} variant="contained" startIcon={<EditIcon />}>
								ממליצים
							</Button>
							<Button sx={editButtonSx} variant="contained" onClick={commentsPopupOpenHandler} startIcon={<EditIcon />}>
								הערות
							</Button>
							<NotesPopup open={popupOpen} onClose={commentsPopupCloseHandler}/>
						</Box>

					</Stack>
				</Box>
			</Box>
		</>
	)
}

const getCandidate = function (candidateId: string, setCandidateInfo)
{
	const promise = getFilteredCandidates(["id"], [candidateId]);
	promise.then((candidates) =>
	{
		setCandidateInfo(candidates[0]);
	}).catch((error) =>
	{
		console.error(error);
	});
}

const getJobs = async function (candidateId: string, setJobs)
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

	// filter them by the list of job numbers 
	// we got from the previous request to firebase
	jobs = jobs.filter(job =>
	{
		return jobNumbers.includes(job._jobNumber);
	});
	setJobs(jobs)

}

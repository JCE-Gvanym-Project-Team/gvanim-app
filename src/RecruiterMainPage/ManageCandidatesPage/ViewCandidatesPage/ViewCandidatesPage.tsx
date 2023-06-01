import { useEffect, useState } from 'react'
import { Button, Typography, Box, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { editButtonSx, textSx, titleSx, mainStackSx, ContainerGradientSx, candidateNameSx, BoxGradientSx, candidateNameAndEditButtonContainerSx, jobTextSx, notesButtonSx, interviewsButtonSx, changeJobButtonSx, recommendationsButtonSx } from './ViewCandidatesPageStyle';
import { ManageCandidatesPageGlobalStyle } from '../../PageStyles';
import JobsTable from './Components/JobsTable/JobsTable';
import { Candidate, getFilteredCandidates } from '../../../Firebase/FirebaseFunctions/Candidate';
import { useLocation, useNavigate } from 'react-router-dom';
import { Job, getFilteredJobs } from '../../../Firebase/FirebaseFunctions/Job';
import { getFilteredCandidateJobStatuses } from '../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import NotesPopup from './Components/NotesPopup/NotesPopup';
import ChangeJobDialog from './Components/ChangeJobDialog/ChangeJobDialog';
import { Autorenew, EditNote, QuestionAnswer, SpeakerNotes } from '@mui/icons-material';
import React from 'react';

export default function ViewCandidatesPage(props: { candidateId: string }) {

	const navigate = useNavigate();

	// get jobs data size
	const [dataSize, setDataSize] = useState(0);

	// get candidate id
	let { candidateId } = props;

	// candidate and jobs info
	const [candidateInfo, setCandidateInfo] = useState<Candidate | null>(null);
	const [candidateJobs, setCandidateJobs] = useState<Job[]>([]);
	const [allJobs, setAllJobs] = useState<Job[]>([]);

	useEffect(() => {
		// pull candidate from firebase
		getCandidate(candidateId, setCandidateInfo);

		// get list of all jobs for this candidate
		getJobs(candidateId, setCandidateJobs, setAllJobs);
	}, [candidateId])

	// comments popup handlers
	const [popupOpen, setPopupOpen] = useState(false);
	const [initialData, setInitialData] = useState<string | undefined>("");

	const commentsPopupOpenHandler = () => {
		setInitialData(candidateInfo?._note);
		setPopupOpen(true);
	};

	const commentsPopupCloseHandler = (event, reason) => {
		if ((reason && reason !== "backdropClick") || reason === undefined) {
			setPopupOpen(false);
		}
	};

	// edit candidate handler
	const editCandidateHandler = () => {
		navigate("/editCandidate", { state: candidateId });
	}

	// move to interviews page handler
	const interviewsPageHandler = (id) => {
		navigate("/manageCandidates/" + id + "/interviews");
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
									{candidateInfo?._firstName + " " + candidateInfo?._lastName}
								</Typography>
							</Box>

							{/* Edit Button */}
							<Button sx={editButtonSx} variant="contained" startIcon={<EditNote />} onClick={editCandidateHandler}>
								עריכת פרטים
							</Button>
						</Box>


						{/* text */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
							<Typography sx={jobTextSx} variant='h4'>
								משרות
							</Typography>
						</Box>

						{/* Jobs table */}
						<JobsTable setDataSize={setDataSize} jobs={candidateJobs} />

						{/* Bottom Buttons */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
							<Button sx={recommendationsButtonSx} variant="contained" startIcon={<EditIcon />}>
								ממליצים
							</Button>
							<Button sx={interviewsButtonSx} variant="contained" startIcon={<QuestionAnswer />} onClick={() => {
								interviewsPageHandler(candidateId);
							}}>
								ראיונות
							</Button>
							<Button sx={notesButtonSx} variant="contained" onClick={commentsPopupOpenHandler} startIcon={<SpeakerNotes />}>
								הערות
							</Button>
							<NotesPopup open={popupOpen} onClose={commentsPopupCloseHandler} candidate={candidateInfo} initialData={initialData}/>
						</Box>

					</Stack>
				</Box>
			</Box>
		</>
	)
}

const getCandidate = function (candidateId: string, setCandidateInfo) {
	const promise = getFilteredCandidates(["id"], [candidateId]);
	promise.then((candidates) => {
		setCandidateInfo(candidates[0]);
	}).catch((error) => {
		console.error(error);
	});
}

const getJobs = async function (candidateId: string, setCandidateJobs, setAllJobs) {
	// get a list of all job numbers
	// for the jobs this candidate applied to
	const candidateJobStatuses = await getFilteredCandidateJobStatuses(["candidateId"], [candidateId]);
	let jobNumbers: number[] = [];
	candidateJobStatuses.forEach(element => {
		jobNumbers.push(element._jobNumber);
	});

	// get all jobs from firebase
	let jobs = await getFilteredJobs();
	setAllJobs(jobs);

	// filter them by the list of job numbers 
	// we got from the previous request to firebase
	jobs = jobs.filter(job => {
		return jobNumbers.includes(job._jobNumber);
	});
	setCandidateJobs(jobs)
}

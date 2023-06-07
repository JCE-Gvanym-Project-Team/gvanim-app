import { useEffect, useState } from 'react'
import { Button, Typography, Box, Stack, Rating } from '@mui/material'
import { editButtonSx, textSx, titleSx, mainStackSx, ContainerGradientSx, candidateNameSx, candidateNameAndEditButtonContainerSx, jobTextSx, notesButtonSx, interviewsButtonSx, changeJobButtonSx, recommendationsButtonSx } from './ViewCandidatesPageStyle';
import { BoxGradientSx } from '../../PageStyles';
import JobsTable from './Components/JobsTable/JobsTable';
import { Candidate, getFilteredCandidates } from '../../../Firebase/FirebaseFunctions/Candidate';
import { useLocation, useNavigate } from 'react-router-dom';
import { Job, getFilteredJobs } from '../../../Firebase/FirebaseFunctions/Job';
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from '../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import NotesPopup from './Components/NotesPopup/NotesPopup';
import { AccountCircle, ArticleOutlined, EditNote, QuestionAnswer, SpeakerNotes } from '@mui/icons-material';
import MyLoading from '../../../Components/MyLoading/MyLoading';

export default function ViewCandidatesPage(props: { candidateId: string })
{
    const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	// get jobs data size
	const [dataSize, setDataSize] = useState(0);

	// get candidate id
	let { candidateId } = props;

	// candidate and jobs info
	const [candidateInfo, setCandidateInfo] = useState<Candidate | null>(null);
	const [candidateJobs, setCandidateJobs] = useState<Job[]>([]);
	const { state } = useLocation();

	useEffect(() =>
	{
		// pull candidate from firebase
		getCandidate(candidateId, setCandidateInfo);

		// get list of all jobs for this candidate
		getJobs(candidateId, setCandidateJobs);
	}, [candidateId])

	useEffect(() =>
	{
		setGeneralRating(candidateInfo?._generalRating ? candidateInfo?._generalRating : -1);
	}, [candidateInfo]);

	useEffect(() =>
	{
		// pull candidate from firebase
		getCandidate(candidateId, setCandidateInfo);

		getJobs(candidateId, setCandidateJobs);

		setLoading(false);
	}, [])

	// comments popup handlers
	const [popupOpen, setPopupOpen] = useState(false);
	const [initialData, setInitialData] = useState<string | undefined>("");

	const commentsPopupOpenHandler = () =>
	{
		setInitialData(candidateInfo?._note);
		setPopupOpen(true);
	};

	const commentsPopupCloseHandler = (event, reason) =>
	{
		if ((reason && reason !== "backdropClick") || reason === undefined)
		{
			setPopupOpen(false);
		}
	};

	// edit candidate handler
	const editCandidateHandler = () =>
	{
		navigate("/management/editCandidate", { state: candidateId });
	}

	// move to interviews page handler
	const interviewsPageHandler = (id) =>
	{
		navigate("/management/manageCandidates/" + id + "/interviews");
	}

	// general rating
	const [generalRating, setGeneralRating] = useState(0);

	return (
		<>
		{loading ? 
		(
			 <MyLoading loading={loading} setLoading={setLoading} />
		) : 
		(
			<>
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
					top: '-7%',
					right: '20%',
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
					top: '30%',
					bottom: 'auto',
					backgroundColor: 'hsla(0,0%,100%,.1)',
					background: 'hsla(0,0%,100%,.1)',
					width: '150px',
					height: '150px',
					borderRadius: '50%',
					position: 'absolute',
				}} />

				<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
					left: '2%',
					top: '16%',
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
						<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
					left: '45%',
					top: '16%',
					bottom: 'auto',
					backgroundColor: 'hsla(0,0%,100%,.1)',
					background: 'hsla(0,0%,100%,.1)',
					width: '30px',
					height: '30px',
					borderRadius: '50%',
					position: 'absolute',
				}} />

				<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', top:"165px", position:"absolute"}}>
					<Stack direction='row' spacing={1}>
						<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
							<AccountCircle sx={{ color: '#fff' }} />
						</Box>
						<Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 500 }}>
							צפייה במועמד
						</Typography>
					</Stack>
				</Box>
			</Box>

			{/* glass container */}
			<Box >
				<Box sx={{marginRight: "3rem", marginLeft: "3rem"}}>
					<Stack direction={'column'} sx={mainStackSx} spacing={6}>

						{/* Candidate Name */}
						<Box sx={{ display: 'flex', alignSelf: "center" }}>
							<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignSelf: "center" }}>
								<AccountCircle sx={{ fontSize: '3rem' }} />
							</Box>
							<Typography sx={candidateNameSx} variant='h2' >
								{candidateInfo?._firstName + " " + candidateInfo?._lastName}
							</Typography>

						</Box>

						<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

							<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
								<Typography component="legend" sx={jobTextSx} style={{ fontSize: "24px" }}>דרגת התאמה כללית</Typography>
								<Rating
									value={generalRating}
									onChange={(event, newValue) =>
									{
										candidateInfo?.updateGeneralRating(newValue ? newValue : -1);
										setGeneralRating(newValue ? newValue : -1);
									}}
									size='large'
								/>
							</Box>

							{ /* edit button to make them on the same line */}
							<Box sx={candidateNameAndEditButtonContainerSx}>
								{/* Edit Button */}
								<Button sx={editButtonSx} variant="contained" startIcon={<EditNote />} onClick={editCandidateHandler}>
									עריכת פרטים
								</Button>
							</Box>
						</Box>


						{/* text */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
							<Typography sx={jobTextSx} variant='h4'>
								משרות
							</Typography>
						</Box>

						{/* Jobs table */}
						<JobsTable setDataSize={setDataSize} candidateJobs={candidateJobs} candidateInfo={candidateInfo} />

						{/* Bottom Buttons */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
							<Button sx={interviewsButtonSx} variant="contained" startIcon={<QuestionAnswer />} onClick={() =>
							{
								interviewsPageHandler(candidateId);
							}}>
								ראיונות
							</Button>
							<Button sx={notesButtonSx} variant="contained" onClick={commentsPopupOpenHandler} startIcon={<SpeakerNotes />}>
								הערות
							</Button>
							<NotesPopup open={popupOpen} onClose={commentsPopupCloseHandler} candidate={candidateInfo} initialData={initialData} />
						</Box>

					</Stack>
				</Box>
			</Box>
		</>
		)}
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

const getJobs = async function (candidateId: string, setCandidateJobs)
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
	setCandidateJobs(jobs)
}

import { AccountCircle, EditNote, PictureAsPdfSharp, QuestionAnswer, SpeakerNotes } from '@mui/icons-material';
import { Box, Button, Divider, Rating, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyLoading from '../../../Components/MyLoading/MyLoading';
import { Candidate, getFilteredCandidates } from '../../../Firebase/FirebaseFunctions/Candidate';
import { getFilteredCandidateJobStatuses } from '../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { Job, getFilteredJobs } from '../../../Firebase/FirebaseFunctions/Job';
import { BoxGradientSx } from '../../PageStyles';
import AboutDialog from './Components/AboutDialog/AboutDialog';
import AreYouSureDialog from './Components/AreYouSureDialog/AreYouSureDialog';
import JobsTable from './Components/JobsTable/JobsTable';
import NotesPopup from './Components/NotesPopup/NotesPopup';
import RecommendersDialog from './Components/RecommendersDialog/RecommendersDialog';
import SuccessMessageSnackbar from './Components/SuccessMessageSnackbar/SuccessMessageSnackbar';
import { candidateNameAndEditButtonContainerSx, candidateNameSx, editButtonSx, interviewsButtonSx, jobTextSx, mainStackSx, notesButtonSx } from './ViewCandidatesPageStyle';

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

	useEffect(() =>
	{
		if (state === "success")
		{
			setSnackBarOpen(true);
		}
	}, [state])

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
			setLoading(false);
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

	// AboutDialog
	const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
	const [aboutDialogJobId, setAboutDialogJobId] = useState("");
	// onClose for AboutDialog
	const aboutDialogonClose = (event, reason) =>
	{
		if ((reason && reason !== "backdropClick") || reason === undefined)
		{
			setAboutDialogOpen(false);
		}
	}

	// RecommendersDialog
	const [recommendersDialogOpen, setRecommendersDialogOpen] = useState(false);
	const [recommendersDialogJobId, setRecommendersDialogJobId] = useState("");

	const closeRecommendersDialog = (event, reason) =>
	{
		if ((reason && reason !== "backdropClick") || reason === undefined)
		{
			setRecommendersDialogOpen(false);
		}
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

							<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "end", height: { xs: "280px", md: "220px" }, marginBottom: { xs: "1rem", md: "0" } }}>
								<Stack direction='row' spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
									<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
										<AccountCircle sx={{ color: '#fff', fontSize: "28px" }} />
									</Box>
									<Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 500 }}>
										צפייה במועמד
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
						<Box >
							<Box sx={{ marginRight: { xs: "0", md: "3rem" }, marginLeft: { xs: "0", md: "3rem" } }}>
								<Stack direction={'column'} sx={mainStackSx} spacing={6}>


									<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

										{ /* edit button to make them on the same line */}
										<Box sx={candidateNameAndEditButtonContainerSx}>
											{/* Edit Button */}
											<Button sx={editButtonSx} variant="contained" startIcon={<EditNote />} onClick={editCandidateHandler}>
												עריכת פרטים
											</Button>
										</Box>

										<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
											<Typography component="legend" sx={jobTextSx} style={{ fontSize: "24px" }}>דרגת התאמה כללית</Typography>
											<Rating
												value={generalRating}
												onChange={(event, newValue) =>
												{
													setAreYouSureDialogOpen(true);
													setAreYouSureDialogMessage("פעולה זו תשנה את דרגת ההתאמה הכללית של המועמד");
													setAreYouSureCallback((() =>

														() =>
														{
															candidateInfo?.updateGeneralRating(newValue ? newValue : -1);
															setGeneralRating(newValue ? newValue : -1);
															return true;
														}
													))
												}}
												size='large'
											/>
										</Box>

									</Box>

									{/* CV Button */}
									<Box sx={{ display: { md: "none", xs: "flex" }, justifyContent: "space-between" }}>
										<Button sx={{
											color: "white",
											backgroundColor: "#3333ff"
										}}

											variant="contained"
											startIcon={<PictureAsPdfSharp />}
											onClick={async () =>
											{
												setLoading(true);
												const cvLink = (await candidateInfo?.getCvUrl()!);
												setLoading(false);
												window.open(cvLink);

											}}
										>
											קו"ח
										</Button>
									</Box>

									<Divider />

									{/* Dialogs */}
									<AboutDialog open={aboutDialogOpen} onClose={aboutDialogonClose} candidate={candidateInfo} jobId={aboutDialogJobId} />

									<RecommendersDialog
										open={recommendersDialogOpen}
										onClose={closeRecommendersDialog}
										jobId={recommendersDialogJobId}
										candidateId={candidateInfo?._id!}
										setLoading={setLoading}
									/>

									<AreYouSureDialog
										open={areYouSureDialogOpen}
										onClose={closeAreYouSureDialog}
										message={areYouSureDialogMessage}
										callback={areYouSureCallback}
										setSnackBarOpen={setSnackBarOpen}
									/>
									<SuccessMessageSnackbar open={snackBarOpen} onClose={snackBarOnClose} />

									{/* Comments and interviews buttons */}
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
										<NotesPopup
											open={popupOpen}
											onClose={commentsPopupCloseHandler}
											candidate={candidateInfo}
											initialData={initialData}
											setLoading={setLoading}
											loading={loading}
										/>
									</Box>

									{/* text */}
									<Box sx={candidateNameAndEditButtonContainerSx}>
										<Typography sx={jobTextSx} variant='h4'>
											משרות
										</Typography>
									</Box>

									{/* Jobs table */}
									<JobsTable
										setDataSize={setDataSize}
										candidateJobs={candidateJobs}
										candidateInfo={candidateInfo}
										// about dialog
										setAboutDialogOpen={setAboutDialogOpen}
										aboutDialogOnClose={aboutDialogonClose}
										setAboutDialogJobId={setAboutDialogJobId}
										// recommenders dialog
										setRecommendersDialogOpen={setRecommendersDialogOpen}
										setRecommendersDialogJobId={setRecommendersDialogJobId}
										closeRecommendersDialog={closeRecommendersDialog}
									/>

									{/* CV Button */}
									<Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-between" }}>
										<Button sx={{
											color: "white",
											backgroundColor: "#3333ff"
										}}

											variant="contained"
											startIcon={<PictureAsPdfSharp />}
											onClick={async () =>
											{
												setLoading(true);
												const cvLink = (await candidateInfo?.getCvUrl()!);
												setLoading(false);
												window.open(cvLink);

											}}
										>
											קו"ח
										</Button>
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

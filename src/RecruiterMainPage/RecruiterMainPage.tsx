import React, { useState, useEffect, Fragment } from "react";
import WelcomePage from "./WelcomePage/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import ReportsPage from "./ReportsPage/ReportsPage";
import NavBar from "./Components/NavBar/NavBar";
import NewJobPage from "./ManageJobsPage/Components/NewJobPage/NewJobPage";
import { getFilteredJobs } from "../Firebase/FirebaseFunctions/Job";
import { Link } from "react-router-dom";
import SingleJob from "../DrushimMainPage/Components/Job";
import EditCandidate from "./ManageCandidatesPage/ViewCandidatesPage/Components/EditCandidate/EditCandidate";
import AdminPage from "./Components/AdminPage/AdminPage";
import { getFilteredCandidates } from "../Firebase/FirebaseFunctions/Candidate";
import ViewCandidatesPage from "./ManageCandidatesPage/ViewCandidatesPage/ViewCandidatesPage";
import { Box } from "@mui/material";
import ManageInterviewsPage from "./ManageCandidatesPage/ViewCandidatesPage/ManageInterviewsPage/ManageInterviewsPage";



function RecruiterMainPage({ handlelogout })
{
	const [HomeActive, setHomeActive] = useState(false);
	const [ReportsActive, setReportsActive] = useState(false);
	const [CandidatesActive, setCandidatesActive] = useState(false);
	const [JobsActive, setJobsActive] = useState(false);
	const [allJobs, setAllJobs] = React.useState<any[]>([]);
	const [candidateIDs, setCandidateIDs] = useState<string[]>([]);



	const fetchAllJobs = async () =>
	{
		const jobs = await getFilteredJobs();
		const jobsWithId = jobs.map((job) => ({ ...job, id: job._jobNumber }));
		setAllJobs(jobsWithId);
	};

	const fetchCandidateIDs = async () =>
	{
		const candidates = await getFilteredCandidates();
		setCandidateIDs(candidates.map(candidate => candidate._id));
	}

	useEffect(() =>
	{
		fetchAllJobs();
		fetchCandidateIDs();
	}, []);

	return (
		<>
			<NavBar handlelogout={handlelogout} HomeActive={HomeActive} setHomeActive={setHomeActive}
				ReportsActive={ReportsActive} setReportsActive={setReportsActive} CandidatesActive={CandidatesActive}
				setCandidatesActive={setCandidatesActive} JobsActive={JobsActive} setJobsActive={setJobsActive} />

			{allJobs.map(job => (<Link key={job.id} to={'/jobs/' + job.id} />))}
			<Routes>



				{allJobs.map((job) => (<Route path={`/jobs/${job.id}`} key={job.id} element={<SingleJob id={job.id}></SingleJob>} />))}

				<Route path="/" element={<WelcomePage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />
				{/* Jobs Routes */}
				<Route path="/manageJobs" element={<ManageJobsPage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />
				<Route path="/createJob" element={<NewJobPage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />

				{/* Candidate Routes */}
				<Route path="/editCandidate" element={<EditCandidate setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />
				<Route path="/manageCandidates" element={<ManageCandidatesPage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />
				{candidateIDs.map((candidateId) =>
				{	
					return (
						<React.Fragment key={candidateId + "fragment"}>
							<Route path={"/manageCandidates/" + candidateId} element={<ViewCandidatesPage candidateId={candidateId} setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} key={candidateId + "ViewCandidatesPage"}/>} key={candidateId} />
							<Route path={"/manageCandidates/" + candidateId + "/interviews"} element={<ManageInterviewsPage candidateId={candidateId} setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} key={candidateId + "interviews"} />
						</React.Fragment>
					);
				})
				}

				{/* Reports Routes */}
				<Route path="/reports" element={<ReportsPage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />

				{/* Admin Routes */}
				<Route path="/settings" element={<AdminPage />} />
			</Routes>
		</>

	);
}

export default RecruiterMainPage;

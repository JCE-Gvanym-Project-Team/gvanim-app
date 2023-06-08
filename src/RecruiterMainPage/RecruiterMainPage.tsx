import React, { useState, useEffect } from "react";
import WelcomePage from "./WelcomePage/WelcomePage";
import { Route, Routes } from "react-router-dom";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import ReportsPage from "./ReportsPage/ReportsPage";
import ReportRejection from "./ReportsPage/Components/Reports/RejectionReportForm";
import NavBar from "./Components/NavBar/NavBar";
import NewJobPage from "./ManageJobsPage/Components/NewJobPage/NewJobPage";
import { getFilteredJobs } from "../Firebase/FirebaseFunctions/Job";
import { Link } from "react-router-dom";
import SingleJob from "../DrushimMainPage/Components/Job";
import EditCandidate from "./ManageCandidatesPage/ViewCandidatesPage/Components/EditCandidate/EditCandidate";
import AdminPage from "./Components/AdminPage/AdminPage";
import { getFilteredCandidates } from "../Firebase/FirebaseFunctions/Candidate";
import ViewCandidatesPage from "./ManageCandidatesPage/ViewCandidatesPage/ViewCandidatesPage";
import Footer from "./Components/Footer/Footer";
import { CssBaseline } from "@mui/material";
import CandidateFiltersForm from "./ReportsPage/Components/Reports/CandidatesFiltersForm";
import JobsFiltersForm  from "./ReportsPage/Components/Reports/JobsFitersForm"



function RecruiterMainPage({ handlelogout })
{
	const [allJobs, setAllJobs] = React.useState<any[]>([]);
	const [candidateIDs, setCandidateIDs] = useState<string[]>([])


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

			<CssBaseline />
			<NavBar handlelogout={handlelogout} />
			{allJobs.map(job => (<Link key={job.id} to={'/management/jobs/' + job.id} />))}
			<Routes>
				{allJobs.map((job) => (<Route path={`jobs/${job.id}`} key={job.id} element={<SingleJob id={job.id}></SingleJob>} />))}

				<Route path="" element={<WelcomePage />} />
				{/* Jobs Routes */}
				<Route path="manageJobs" element={<ManageJobsPage />} />
				<Route path="createJob" element={<NewJobPage />} />

				{/* Candidate Routes */}
				<Route path="editCandidate" element={<EditCandidate />} />
				<Route path="manageCandidates" element={<ManageCandidatesPage />} />
				{candidateIDs.map((candidateId) =>
				{
					return (
						<React.Fragment key={candidateId + "fragment"}>
							<Route path={"manageCandidates/" + candidateId} element={<ViewCandidatesPage candidateId={candidateId} key={candidateId + "ViewCandidatesPage"} />} key={candidateId} />
							<Route path={"manageCandidates/" + candidateId + "/interviews"} element={<ManageInterviewsPage candidateId={candidateId} key={candidateId + "ViewCandidatesPage"} />} key={candidateId + "interviews"} />
						</React.Fragment>
					);
				})
				}

				{/* Reports Routes */}
				<Route path="reports" element={<ReportsPage />} />
				<Route path="reports/JobsByFilters" element={<JobsFiltersForm/>} />
				{/* <Route path="reports/rejection" element={<ReportRejection />} /> */}
				<Route path="reports/CandidateByFilters" element={<CandidateFiltersForm />} />

				{/* Admin Routes */}
				<Route path="settings" element={<AdminPage />} />

			</Routes>
			<Footer />

		</>

	);
}

export default RecruiterMainPage;

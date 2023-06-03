import Auth from './RecruiterMainPage/Components/Auth/Auth';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import { main } from './Firebase/FirebaseFunctions/test';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from './DrushimMainPage/theme';
import { CssBaseline, Switch } from '@mui/material';
import WelcomePage from './RecruiterMainPage/WelcomePage/WelcomePage';
import SingleJob from './DrushimMainPage/Components/Job';
import ManageJobsPage from './RecruiterMainPage/ManageJobsPage/ManageJobsPage';
import NewJobPage from './RecruiterMainPage/ManageJobsPage/Components/NewJobPage/NewJobPage';
import EditCandidate from './RecruiterMainPage/ManageCandidatesPage/ViewCandidatesPage/Components/EditCandidate/EditCandidate';
import ManageCandidatesPage from './RecruiterMainPage/ManageCandidatesPage/ManageCandidatesPage';
import React, { useEffect, useState } from 'react';
import ViewCandidatesPage from './RecruiterMainPage/ManageCandidatesPage/ViewCandidatesPage/ViewCandidatesPage';
import ManageInterviewsPage from './RecruiterMainPage/ManageCandidatesPage/ViewCandidatesPage/ManageInterViewsPage/ManageInterViewsPage';
import ReportsPage from './RecruiterMainPage/ReportsPage/ReportsPage';
import AdminPage from './RecruiterMainPage/Components/AdminPage/AdminPage';
import { getFilteredCandidates, getFilteredJobs, Job } from './Firebase/FirebaseFunctions/functionIndex';
import NavBar from './RecruiterMainPage/Components/NavBar/NavBar';
import Footer from './RecruiterMainPage/Components/Footer/Footer';
import AllJobsPage from './DrushimMainPage/AllJobsPage/AllJobsPage';
import OneJobPage from './DrushimMainPage/OneJobPage/OneJobPage';
import RecruiterMainPage from './RecruiterMainPage/RecruiterMainPage';

main();
const recruitersPageTheme = createTheme({
	direction: 'rtl',
});

function App()
{

	// ------------------- FOR RECRUITERS PAGE -------------------
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

	const handlelogout = () =>
	{

	}
	// ------------------- FOR RECRUITERS PAGE -------------------



	// ------------------- FOR DRUSHIM PAGE -------------------
	const temp = useMode();
	const drushimPageTheme = temp[0];
	const colorMode = temp[1];

	const [jobs, setJobs] = useState<Job[]>([]);

	const fetchJobs = async () =>
	{
		setJobs(await getFilteredJobs());
	}

	useEffect(() =>
	{
		fetchJobs();
	}, [])
	// ------------------- FOR DRUSHIM PAGE -------------------

	return (
		<>
			<Routes>
				{/* Recruiters page */}
				<Route path='/management/*' element={
					<ThemeProvider theme={recruitersPageTheme}>
						<Auth />
					</ThemeProvider>
				}
				/>

				{/* Drushim Page */}
				<Route path='/career/*' element={
					<ColorModeContext.Provider value={colorMode} >
						<ThemeProvider theme={drushimPageTheme}>
							<DrushimMainPage />
						</ThemeProvider>
					</ColorModeContext.Provider >
				}
				/>
			</Routes>
		</>
	);
}



export default App;
function createCache(arg0: { key: string; stylisPlugins: any[]; })
{
	throw new Error('Function not implemented.');
}


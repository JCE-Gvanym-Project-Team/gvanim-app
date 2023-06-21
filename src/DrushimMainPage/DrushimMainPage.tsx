import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Job, getFilteredJobs } from '../Firebase/FirebaseFunctions/functionIndex';
import AllJobsPage from './AllJobsPage/AllJobsPage';
import Accessibility from './Components/Accessibility/Accessibility';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import OneJobPage from './OneJobPage/OneJobPage';

export default function DrushimMainPage()
{
	const [jobs, setJobs] = useState<Job[]>([]);

	const fetchJobs = async () =>
	{
		setJobs(await getFilteredJobs(["open"],["true"]));
	}

	useEffect(() =>
	{
		fetchJobs();
	}, [])

	return (
		<>
			{/* All Jobs Page Route*/}
			<CssBaseline />
			<Navbar />
			<Accessibility />
			<Routes>
				{/* All Jobs Page Route*/}
				<Route path='jobs' element={<AllJobsPage jobs={jobs} />} />

				{/* One Job Pages Routes */}
				{jobs.map(job => <Route path={'jobs/' + job._jobNumber} element={<OneJobPage />} key={job._jobNumber} />)}
			</Routes>
			<Footer />
		</>
	)
}
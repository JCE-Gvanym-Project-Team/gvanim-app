import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Job, getFilteredJobs } from '../Firebase/FirebaseFunctions/functionIndex';
import AllJobsPage from './AllJobsPage/AllJobsPage';
import OneJobPage from './OneJobPage/OneJobPage';
import { CssBaseline } from '@mui/material';
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer';
import Accessibility from './Components/Accessibility/Accessibility';

export default function DrushimMainPage()
{
	const [jobs, setJobs] = useState<Job[]>([]);

	const fetchJobs = async () =>
	{
		setJobs(await getFilteredJobs());
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
				<Route path='jobs' element={<AllJobsPage />} />

				{/* One Job Pages Routes */}
				{jobs.map(job => <Route path={'jobs/' + job._jobNumber} element={<OneJobPage />} key={job._jobNumber} />)}
			</Routes>
			<Footer />
		</>
	)
}
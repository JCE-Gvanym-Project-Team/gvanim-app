import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Job, getFilteredJobs } from '../Firebase/FirebaseFunctions/functionIndex';


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
		<Routes>
			{/* All Jobs Page Route*/}
			<Route path='/career/jobs' />

			{/* One Job Pages Routes */}
			{jobs.map(job =><Route path={'/career/jobs/' + job._jobNumber} /> )}
		</Routes>
	)
}
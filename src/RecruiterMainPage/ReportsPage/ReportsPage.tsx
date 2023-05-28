import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ReportPageTable from "./Components/MyTable/MyTable";


function ReportsPage(props: { setHomeActive: any, setReportsActive: any, setCandidatesActive: any, setJobsActive: any })
{
	const { setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;
	useEffect(() =>
	{
		// Code inside this effect will run after the component has rendered
		setHomeActive(false);
		setCandidatesActive(false);
		setReportsActive(true);
		setJobsActive(false);
	}, []);



	return (
		<>
			{/* <Link to="/manageReports"> */}
			{/* <Button variant="contained" disableElevation >יצירת דו"ח</Button> */}
			{/* </Link> */}
			<h1>דוחות</h1>
			<ReportPageTable></ReportPageTable>
		</>
	)
}


export default ReportsPage;

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ReportPageTable from "./Components/MyTable/MyTable";
import { Box } from '@mui/material';
import { BoxGradientSx } from '../ManageJobsPage/ManageJobsPageStyle';


function ReportsPage()
{

	return (
		<>
		<Box sx={BoxGradientSx} />
			{/* <Link to="/manageReports"> */}
			{/* <Button variant="contained" disableElevation >יצירת דו"ח</Button> */}
			{/* </Link> */}
			<h1>דוחות</h1>
			<ReportPageTable></ReportPageTable>
		</>
	)
}


export default ReportsPage;

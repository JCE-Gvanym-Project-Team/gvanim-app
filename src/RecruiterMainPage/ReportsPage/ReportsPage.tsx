import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ReportPageTable from "./Components/ReportPageTable/ReportPageTable";


function ReportsPage() {
    return (
    <>
       <Link to="/manageReports">
       <Button variant="contained" disableElevation >יצירת דו"ח</Button>
       </Link>
       <ReportPageTable></ReportPageTable>        
    </>
  )
}


export default ReportsPage;

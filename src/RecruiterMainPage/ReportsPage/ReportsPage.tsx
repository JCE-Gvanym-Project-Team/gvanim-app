import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ReportPageTable from "./Components/ReportPageTable/ReportPageTable";
import ReportPageCreateReport from "./Components/ReportPageCreateReport/ReportPageCreateReport"
import ReportPageManageReports from './Components/ReportPageManageReports/ReportPageManageReports';


function ReportsPage() {
    return (
    <>
       <Link to="/ManageReports">
       <Button variant="contained" disableElevation >יצירת דו"ח</Button>
       </Link>
       <ReportPageTable></ReportPageTable>        
    </>
  )
}


function ManageReportsComponent(){
  return ReportPageManageReports;
}




export { ReportsPage, ManageReportsComponent };

// 
// function ManageReportsComponent(){
  // return <ReportPageManageReports></ReportPageManageReports>
// }
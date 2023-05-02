import React from "react";
import { Link } from "react-router-dom";
import ManageCandidatesPage from "../ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "../ManageJobsPage/ManageJobsPage";
import ReportsPage from "../ReportsPage/ReportsPage";

function Buttons1() {
  return (
    <div className="button-group">
      <Link to="ManageCandidatesPage">
        <button className="button">Manage Candidates</button>
      </Link>
      <Link to="ManageJobsPage">
        <button className="button">Job Management</button>
      </Link>
      <Link to="ReportsPage">
        <button className="button">Report</button>
      </Link>
    </div>
  );
}

export default Buttons1;

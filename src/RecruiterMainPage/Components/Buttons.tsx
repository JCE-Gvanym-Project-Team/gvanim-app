import React from "react";
import { Link } from "react-router-dom";
import ManageCandidatesPage from "../ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "../ManageJobsPage/ManageJobsPage";
import ReportsPage from "../ReportsPage/ReportsPage";

function Buttons() {
  return (
    <div className="button-group">
      <Link to="/manage-candidates">
        <button className="button">Manage Candidates</button>
      </Link>
      <Link to="/manage-jobs">
        <button className="button">Job Management</button>
      </Link>
      <Link to="/reports">
        <button className="button">Report</button>
      </Link>
    </div>
  );
}

export default Buttons;

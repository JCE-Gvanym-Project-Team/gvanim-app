import React from "react";
import { Link } from "react-router-dom";
import ManageCandidatesPage from "../ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "../ManageJobsPage/ManageJobsPage";
import ReportsPage from "../ReportsPage/ReportsPage";

function Buttons() {
  return (
    <div className="button-group">
      <Link to="/manageCandidates">
        <button className="button">ניהול מועמדים</button>
      </Link>
      <Link to="/manageJobs">
        <button className="button">ניהול משרות </button>
      </Link>
      <Link to="/reports">
        <button className="button">דו"ח</button>
      </Link>
    </div>
  );
}

export default Buttons;

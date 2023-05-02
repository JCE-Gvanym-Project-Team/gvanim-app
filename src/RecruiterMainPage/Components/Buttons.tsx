import React from "react";
import { Link } from "react-router-dom";
import ManageCandidatesPage from "../ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "../ManageJobsPage/ManageJobsPage";
import ReportsPage from "../ReportsPage/ReportsPage";

function Buttons() {
  return (
    <div className="button-group">
      <Link to="/ManageCandidatesPage">
        <button className="button">ניהול מועמדים</button>
      </Link>
      <Link to="/ManageJobsPage">
        <button className="button">ניהול משרות </button>
      </Link>
      <Link to="/ReportsPage">
        <button className="button">דו"ח</button>
      </Link>
    </div>
  );
}

export default Buttons;

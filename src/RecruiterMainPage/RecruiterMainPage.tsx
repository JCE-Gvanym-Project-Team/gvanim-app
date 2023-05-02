import React, { useState, useEffect } from "react";
import "./RecruiterMainPage.css";
import { dataref } from "../FirebaseConfig/firebase";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import ReportsPage from "./ReportsPage/ReportsPage";
import Buttons from "./Components/Buttons";
import Circles from "./Components/Circles";
import { Route, Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Redirect,
} from "react-router-dom";

function RecruiterMainPage() {
  return (
    <Router>
      <div className="recruiter-main-page">
        <Buttons />
        <Circles />
        <Switch>
          <Route path="/manageCandidates" component={ManageCandidatesPage} />
          <Route path="/manageJobs" component={ManageJobsPage} />
          <Route path="/reports" component={ReportsPage} />
          <Redirect from="/" to="/manageCandidates" />
        </Switch>
      </div>
    </Router>
  );
}

export default RecruiterMainPage;

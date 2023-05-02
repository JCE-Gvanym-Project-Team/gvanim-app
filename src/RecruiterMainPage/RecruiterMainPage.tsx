import React, { useState, useEffect } from "react";
import "./RecruiterMainPage.css";
import { dataref } from "../FirebaseConfig/firebase";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import ReportsPage from "./ReportsPage/ReportsPage";
import Buttons from "./Components/Buttons";
import Circles from "./Components/Circles";
import { Route, Link } from "react-router-dom";
import { redirect as Redirect } from "react-router-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";

function RecruiterMainPage() {
  return (
    <Router>
      <div className="recruiter-main-page">
        <Buttons />
        <Circles />
        <Routes>
          <Route
            path="./ManageCandidatesPage/ManageCandidatesPage"
            Component={ManageCandidatesPage}
          />
          <Route
            path="./ManageJobsPage/ManageJobsPage"
            Component={ManageJobsPage}
          />
          <Route path="/ReportsPage" Component={ReportsPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default RecruiterMainPage;

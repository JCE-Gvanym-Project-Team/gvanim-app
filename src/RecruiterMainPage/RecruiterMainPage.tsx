import React, { useState, useEffect } from "react";
import "./RecruiterMainPage.css";
import { dataref } from "../FirebaseConfig/firebase";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import ReportsPage from "./ReportsPage/ReportsPage";
import Buttons from "./Components/Buttons";
import Circles from "./Components/Circles";
import { Route, Link } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";

function RecruiterMainPage() {
  return (
      <div className="recruiter-main-page">
        <Buttons />
        <Circles />
      </div>
  );
}

export default RecruiterMainPage;

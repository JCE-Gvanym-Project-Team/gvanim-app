import React, { useState, useEffect } from "react";
import WelcomePage from "./WelcomePage/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import ReportsPage from "./ReportsPage/ReportsPage";
import NavBar from "./Components/NavBar/NavBar";
import NewJobPage from "./ManageJobsPage/Components/NewJobPage/NewJobPage";



function RecruiterMainPage({ handlelogout }) {
  const [HomeActive, setHomeActive] = useState(false);
  const [ReportsActive, setReportsActive] = useState(false);
  const [CandidatesActive, setCandidatesActive] = useState(false);
  const [JobsActive, setJobsActive] = useState(false);

  return (
    <>
      <NavBar handlelogout={handlelogout} HomeActive={HomeActive} setHomeActive={setHomeActive}
        ReportsActive={ReportsActive} setReportsActive={setReportsActive} CandidatesActive={CandidatesActive}
        setCandidatesActive={setCandidatesActive} JobsActive={JobsActive} setJobsActive={setJobsActive} />
      <Routes>
        <Route path="/" element={<WelcomePage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />
        <Route path="/manageCandidates" element={<ManageCandidatesPage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive}/>} />
        <Route path="/manageJobs" element={<ManageJobsPage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />
        <Route path="/createJob" element={<NewJobPage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />
        <Route path="/reports" element={<ReportsPage setHomeActive={setHomeActive} setReportsActive={setReportsActive} setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive} />} />
      </Routes>
    </>

  );
}

export default RecruiterMainPage;

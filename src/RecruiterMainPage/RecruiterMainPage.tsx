import React, { useState, useEffect } from "react";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import ReportsPage from "./ReportsPage/ReportsPage";
import NavBar from "./Components/NavBar/NavBar";



function RecruiterMainPage({handlelogout}) {
	const [HomeActive, setHomeActive] = useState(true);
	const [ReportsActive, setReportsActive] = useState(false);
	const [CandidatesActive, setCandidatesActive] = useState(false);
	const [JobsActive, setJobsActive] = useState(false);

  return (
    <>
      <BrowserRouter>
        <NavBar handlelogout={handlelogout} HomeActive={HomeActive} setHomeActive={setHomeActive} 
        ReportsActive={ReportsActive} setReportsActive={setReportsActive} CandidatesActive={CandidatesActive} 
        setCandidatesActive={setCandidatesActive} JobsActive={JobsActive} setJobsActive={setJobsActive} />
        <Routes>
          <Route path="/" element={<WelcomePage setHomeActive={setHomeActive} setReportsActive={setReportsActive} 
          setCandidatesActive={setCandidatesActive} setJobsActive={setJobsActive}  />} 
          />
          <Route path="/manageCandidates" element={<ManageCandidatesPage />} />
          <Route path="/manageJobs" element={<ManageJobsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default RecruiterMainPage;

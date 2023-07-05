import { CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import
  {
    Candidate,
    getFilteredCandidates,
  } from "../Firebase/FirebaseFunctions/Candidate";
import { getFilteredJobs } from "../Firebase/FirebaseFunctions/Job";
import AdminPage from "./Components/AdminPage/AdminPage";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import NewCandidatePage from "./ManageCandidatesPage/CreateCandidatePage/NewCandidatePage";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import EditCandidate from "./ManageCandidatesPage/ViewCandidatesPage/Components/EditCandidate/EditCandidate";
import ManageInterviewsPage from "./ManageCandidatesPage/ViewCandidatesPage/ManageInterViewsPage/ManageInterViewsPage";
import ViewCandidatesPage from "./ManageCandidatesPage/ViewCandidatesPage/ViewCandidatesPage";
import NewJobPage from "./ManageJobsPage/Components/NewJobPage/NewJobPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import CandidateFiltersForm from "./ReportsPage/Components/Reports/CandidatesFiltersForm";
import JobsFiltersForm from "./ReportsPage/Components/Reports/JobsFitersForm";
import ReportsPage from "./ReportsPage/ReportsPage";
import WelcomePage from "./WelcomePage/WelcomePage";

function RecruiterMainPage({ handlelogout }) {
  const [allJobs, setAllJobs] = React.useState<any[]>([]);
  const [candidateIDs, setCandidateIDs] = useState<string[]>([]);
  const [updatedCandidates, setUpdatedCandidates] = useState<Candidate[]>([]);

  const fetchAllJobs = async () => {
    const jobs = await getFilteredJobs();
    const jobsWithId = jobs.map((job) => ({ ...job, id: job._jobNumber }));
    setAllJobs(jobsWithId);
  };

  const fetchCandidateIDs = async () => {
    const candidates = await getFilteredCandidates();
    setCandidateIDs(candidates.map((candidate) => candidate._id));
  };

  useEffect(() => {
    fetchAllJobs();
    fetchCandidateIDs();
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar handlelogout={handlelogout} />
      {allJobs.map((job) => (
        <Link key={job.id} to={"/management/jobs/" + job.id} />
      ))}
      <Routes>

        <Route path="" element={<WelcomePage />} />
        {/* Jobs Routes */}
        <Route path="manageJobs" element={<ManageJobsPage />} />
        <Route path="createJob" element={<NewJobPage />} />

        {/* Candidate Routes */}
        <Route path="editCandidate" element={<EditCandidate />} />
        <Route path="manageCandidates" element={<ManageCandidatesPage />} />
        <Route path="createCandidate" element={<NewCandidatePage />} />
        {candidateIDs.map((candidateId) => {
          return (
            <React.Fragment key={candidateId + "fragment"}>
              <Route
                path={"manageCandidates/" + candidateId}
                element={
                  <ViewCandidatesPage
                    candidateId={candidateId}
                    key={candidateId + "ViewCandidatesPage"}
                  />
                }
                key={candidateId}
              />
              <Route
                path={"manageCandidates/" + candidateId + "/interviews"}
                element={
                  <ManageInterviewsPage
                    candidateId={candidateId}
                    key={candidateId + "ViewCandidatesPage"}
                  />
                }
                key={candidateId + "interviews"}
              />
            </React.Fragment>
          );
        })}

        {/* Reports Routes */}
        <Route path="reports" element={<ReportsPage />} />
        <Route path="reports/JobsByFilters" element={<JobsFiltersForm />} />
        <Route
          path="reports/CandidateByFilters"
          element={<CandidateFiltersForm />}
        />

        {/* reset passwors */}
        {/* <Route path='forgotPassword' element={<PasswordRecover/>} /> */}

        {/* Admin Routes */}
        <Route path="settings" element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default RecruiterMainPage;

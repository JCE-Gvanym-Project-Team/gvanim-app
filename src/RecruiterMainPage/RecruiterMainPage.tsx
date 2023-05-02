import React from "react";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import ReportsPage from "./ReportsPage/ReportsPage";

export default function RecruiterMainPage() {
  return (
    <>
      <ManageCandidatesPage />
      <ManageJobsPage />
      <ReportsPage />
    </>
  );
}

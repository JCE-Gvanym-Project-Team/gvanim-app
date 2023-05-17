import React, { useState, useEffect } from "react";
import "./RecruiterMainPage.css";
import Buttons from "./Components/Buttons";
import Circles from "./Components/Circles";
import { Box } from "@mui/material";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import ManageCandidatesPage from "./ManageCandidatesPage/ManageCandidatesPage";
import ManageJobsPage from "./ManageJobsPage/ManageJobsPage";
import ReportsPage from "./ReportsPage/ReportsPage";
import Auth from "./Components/Auth/Auth";

function RecruiterMainPage()
{
  return (
    <>
      {/* <Buttons />
        <Circles /> */}

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/manageCandidates" element={<ManageCandidatesPage />} />
          <Route path="/manageJobs" element={<ManageJobsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RecruiterMainPage;

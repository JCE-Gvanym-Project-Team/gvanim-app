import React, { useState, useEffect } from "react";
import "./RecruiterMainPage.css";
import Buttons from "./Components/Buttons";
import Circles from "./Components/Circles";
import { Box } from "@mui/material";
import WelcomePage from "./Components/WelcomePage/WelcomePage";

function RecruiterMainPage() {
  return (
    <>
      {/* <Buttons />
        <Circles /> */}

        <WelcomePage />
    </>
  );
}

export default RecruiterMainPage;

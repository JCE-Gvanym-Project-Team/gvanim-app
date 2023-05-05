import React, { useState, useEffect } from "react";
import "./RecruiterMainPage.css";
import Buttons from "./Components/Buttons";
import Circles from "./Components/Circles";

function RecruiterMainPage() {
  return (
      <div className="recruiter-main-page">
        <Buttons />
        <Circles />
      </div>
  );
}

export default RecruiterMainPage;

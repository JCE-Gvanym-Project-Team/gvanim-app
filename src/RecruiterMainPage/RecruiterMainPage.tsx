import React, { useState, useEffect } from "react";
import "./RecruiterMainPage.css";
import Buttons from "./Components/Buttons";
import Circles from "./Components/Circles";
import NavBar from '../Components/NavBar/NavBar';
import { Button, Typography } from "@mui/material";


function RecruiterMainPage({ handlelogout }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <Typography>ברוך הבא חנון (לא יודע למה זה בצבע אדום)</Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="outlined" onClick={handlelogout}>התנתק</Button>
          </div>
        </div>
      </div>
      <NavBar />
      <div className="recruiter-main-page">
        <Buttons />
        <Circles />
      </div>
    </>

  );
}

export default RecruiterMainPage;

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";
import React, { Component } from "react";

// design for the navbar
const AppBar = styled(MuiAppBar)({
  color: "black",
  backgroundColor: "#ADD8E6",
  "& .active": {
    fontWeight: "bold",
  },
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
});

// design for the navbar items (links and the written on the buttons)
const NavItem = styled(NavLink)(({ theme }) => ({
  fontSize: "1.2rem",
  display: "inline-block", // make the buttons appear in one line
  marginRight: "1rem",
  color: "white",
  backgroundColor: "#silver",
  textDecoration: "none",
  "&.active": {
    // when the button is active (clicked) make it bold and change the color
    fontWeight: "bold",
    color: "#00008b",
  },

  [theme.breakpoints.down("sm")]: {
    // when the screen is small (mobile) make the buttons appear in a column
    marginRight: 0,
  },
}));

interface NavBarDeProps {
  // interface for the navbar
  activePage: string;
  handleClick: (page: string) => void;
}

// The NavBarDe component is a functional component
// that receives the activePage and handleClick
// props from the NavBar component.
// It renders the AppBar and Toolbar components as well
export default function NavBarDe({ activePage, handleClick }: NavBarDeProps) {
  return (
    <AppBar position="static">
      {" "}
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <NavLink to="/">
          {" "}
          <img src={logo} className="logo" alt="Logo" height={100} />
        </NavLink>
        <div>
          <NavItem // make the buttons clickable and redirect to the relevant page
            to="/reports"
            className={`nav-item nav-link ${
              activePage === "reports" ? "active" : ""
            }`}
            onClick={() => handleClick("reports")}
          >
            דוחות
          </NavItem>
          <NavItem
            to="/manageCandidates"
            className={`nav-item nav-link ${
              activePage === "manageCandidates" ? "active" : ""
            }`}
            onClick={() => handleClick("manageCandidates")}
          >
            ניהול מועמדים
          </NavItem>
          <NavItem
            to="/manageJobs"
            className={`nav-item nav-link ${
              activePage === "manageJobs" ? "active" : ""
            }`}
            onClick={() => handleClick("manageJobs")}
          >
            ניהול משרות
          </NavItem>
          <NavItem
            to="/"
            className={`nav-item nav-link ${
              activePage === "recruiterMainPage" ? "active" : ""
            }`}
            onClick={() => handleClick("recruiterMainPage")}
          >
            ראשי
          </NavItem>
        </div>
      </Toolbar>
    </AppBar>
  );
}

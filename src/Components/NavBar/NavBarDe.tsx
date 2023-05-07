import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";

const AppBar = styled(MuiAppBar)({
  color: "black",
  backgroundColor: "#ADD8E6",
  "& .active": {
    fontWeight: "bold",
  },
  position: "fixed", // add this line
  top: 0, // add this line
  left: 0, // add this line
  right: 0, // add this line
});

const NavItem = styled(NavLink)(({ theme }) => ({
  fontSize: "1.2rem",
  display: "inline-block",
  marginRight: "1rem",
  color: "white",
  backgroundColor: "#silver",
  textDecoration: "none",
  "&.active": {
    fontWeight: "bold",
  },
  "&:hover": {
    color: "blue",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: 0,
  },
}));

export default function NavBarDe({ activePage, handleClick }) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <NavLink to="/">
          <img src={logo} className="logo" alt="Logo" height={100} />
        </NavLink>
        <div>
          <NavItem
            to="/reportsPage"
            className={`nav-item nav-link ${
              activePage === "reportsPage" ? "active" : ""
            }`}
            onClick={() => handleClick("reportsPage")}
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

import React, { Component } from "react";
import ManageCandidatesPage from "./../../RecruiterMainPage/ManageCandidatesPage/ManageCandidatesPage";
import ReportsPage from "./../../RecruiterMainPage/ReportsPage/ReportsPage";
import RecruiterMainPage from "./../../RecruiterMainPage/RecruiterMainPage";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-bootstrap-icons";
import ManageJobsPage from "../../RecruiterMainPage/ManageJobsPage/ManageJobsPage";
import logo from "./logo.png";

class NavBar extends Component {
	state = {
		activePage: "recruiterMainPage",
	};

	handleClick = (page) => {
		this.setState({ activePage: page });
	};

	render() {
		const { activePage } = this.state;

		return (
			<React.Fragment>
				<nav className="navbar navbar-expand-lg navbar-dark navbar-light-blue">
					<Link className="navbar-brand" to="/">
						Navbar
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="navbar-collapse collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<NavLink
								className={`nav-item nav-link ${activePage === "recruiterMainPage" ? "active" : ""
									}`}
								to="/"
								onClick={() => this.handleClick("recruiterMainPage")}
							>
								ראשי
							</NavLink>
							<NavLink
								className={`nav-item nav-link ${activePage === "manageCandidates" ? "active" : ""
									}`}
								to="/manageCandidates"
								onClick={() => this.handleClick("manageCandidates")}
							>
								ניהול מועמדים
							</NavLink>
							<NavLink
								className={`nav-item nav-link ${activePage === "manageJobs" ? "active" : ""
									}`}
								to="/manageJobs"
								onClick={() => this.handleClick("manageJobs")}
							>
								ניהול משרות
							</NavLink>
							<NavLink
								className={`nav-item nav-link ${activePage === "reports" ? "active" : ""
									}`}
								to="/reports"
								onClick={() => this.handleClick("reports")}
							>
								דו"ח
							</NavLink>
						</div>
						<img src={logo} alt="Logo" className="logo" />
					</div>
				</nav>
			</React.Fragment>
		);
	}
}

export default NavBar;
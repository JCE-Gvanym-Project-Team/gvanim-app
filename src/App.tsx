import React from 'react';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import AdminMainPage from './AdminMainPage/AdminMainPage';
import RecruiterMainPage from './RecruiterMainPage/RecruiterMainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Routes, Link } from "react-router-dom"

import ManageCandidatesPage from './RecruiterMainPage/ManageCandidatesPage/ManageCandidatesPage';
import ManageJobsPage from './RecruiterMainPage/ManageJobsPage/ManageJobsPage';
import ReportsPage from './RecruiterMainPage/ReportsPage/ReportsPage';
import LoginPage from './RecruiterMainPage/LoginPage/LoginPage';
import PasswordRecover from './RecruiterMainPage/LoginPage/PasswordRecoveryPage/PasswordRecoveryPage';
const Admin = "admin";
const Recruiter = "recruiter";

function App() {
	const currentUser = "recruiter";
	return (
		<>
			<HashRouter>
				<Routes>
					<Route path="/recovery" element={<PasswordRecover />} />
					<Route path="/" element={<LoginPage />} />
					<Route path="/manageCandidates" element={<ManageCandidatesPage />} />
					<Route path="/manageJobs" element={<ManageJobsPage />} />
					<Route path="/reports" element={<ReportsPage />} />
				</Routes>
			</HashRouter>
		</>
	);
}

// function decidePage(currentUser: any){
//   if (currentUser === Admin){
//     return (<AdminMainPage />)
//   }else if (currentUser === Recruiter){
//     return (
//       <RecruiterMainPage />
//     )
//   }else{
//     return (
//       <DrushimMainPage />
//     )
//   }
// }

export default App;

import React from 'react';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import AdminMainPage from './AdminMainPage/AdminMainPage';
import RecruiterMainPage from './RecruiterMainPage/RecruiterMainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import ManageCandidatesPage from './RecruiterMainPage/ManageCandidatesPage/ManageCandidatesPage';
import ManageJobsPage from './RecruiterMainPage/ManageJobsPage/ManageJobsPage';
import ReportsPage from './RecruiterMainPage/ReportsPage/ReportsPage';
import { Router } from 'express';
import NavBar from './Components/NavBar/NavBar';
import { main } from './Firebase/FirebaseFunctions/DBfuncs'
import { initializeApp } from 'firebase/app';
import Auth from './RecruiterMainPage/Components/Auth/Auth';

main();



main()
const Admin = "admin";
const Recruiter = "recruiter";

function App() {
	const currentUser = "recruiter";
	return (
		<>
		<Auth />	
		</>
	);
}



export default App;

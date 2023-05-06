import React from 'react';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import AdminMainPage from './AdminMainPage/AdminMainPage';
import RecruiterMainPage from './RecruiterMainPage/RecruiterMainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter, Route, Routes, Link } from "react-router-dom"
import ManageCandidatesPage from './RecruiterMainPage/ManageCandidatesPage/ManageCandidatesPage';
import ManageJobsPage from './RecruiterMainPage/ManageJobsPage/ManageJobsPage';
import ReportsPage from './RecruiterMainPage/ReportsPage/ReportsPage';
import { Router } from 'express';
import NavBar from './Components/NavBar/NavBar';
import firebase from "firebase/compat/app";
import "firebase/database";
import { firebaseConfig } from './FirebaseConfig/firebase';
import { getAllDB, getData } from './func';

firebase.initializeApp(firebaseConfig);

getData("/Jobs");

const Admin = "admin";
const Recruiter = "recruiter";

function App() {
	const currentUser = "recruiter";
	return (
		<>
			<HashRouter>
			<NavBar />
				<Routes>
					<Route path="/" element={<RecruiterMainPage />} />
					<Route path="/manageCandidates" element={<ManageCandidatesPage />} />
					<Route path="/manageJobs" element={<ManageJobsPage />} />
					<Route path="/reports" element={<ReportsPage />} />
				</Routes>
			</HashRouter>
		</>
	);
}

function decidePage(currentUser: any) {
	if (currentUser === Admin) {
		return (<AdminMainPage />)
	} else if (currentUser === Recruiter) {
		return (
			<RecruiterMainPage />
		)
	} else {
		return (
			<DrushimMainPage />
		)
	}
}

export default App;

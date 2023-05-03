import React from 'react';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import AdminMainPage from './AdminMainPage/AdminMainPage';
import RecruiterMainPage from './RecruiterMainPage/RecruiterMainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from "react-router-dom"
import ManageCandidatesPage from './RecruiterMainPage/ManageCandidatesPage/ManageCandidatesPage';
import ManageJobsPage from './RecruiterMainPage/ManageJobsPage/ManageJobsPage';
import ReportsPage from './RecruiterMainPage/ReportsPage/ReportsPage';
import { Router } from 'express';

const Admin = "admin";
const Recruiter = "recruiter";

function App() {
  const currentUser = "recruiter";
  return (
    <>
    <BrowserRouter>
		<div>
			<Route exact path="/" component={RecruiterMainPage} />
			<Route path="/manageCandidates" component={ManageCandidatesPage} />
			<Route path="/manageJobs" component={ManageJobsPage} />
			<Route path="/reports" component={ReportsPage} />
		</div>
    </BrowserRouter>
    </>
  );
}

function decidePage(currentUser: any){
  if (currentUser === Admin){
    return (<AdminMainPage />)
  }else if (currentUser === Recruiter){
    return (
      <RecruiterMainPage />
    )
  }else{
    return (
      <DrushimMainPage />
    )
  }
}

export default App;

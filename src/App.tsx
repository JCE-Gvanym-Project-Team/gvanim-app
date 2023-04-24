import React from 'react';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import AdminMainPage from './AdminMainPage/AdminMainPage';
import RecruiterMainPage from './RecruiterMainPage/RecruiterMainPage';

const Admin = "admin";
const Recruiter = "recruiter";

function App() {
  const currentUser = "recruiter";
  return (
    <>

    {decidePage(currentUser)}
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

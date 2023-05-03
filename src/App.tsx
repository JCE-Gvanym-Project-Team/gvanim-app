import React from 'react';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import AdminMainPage from './AdminMainPage/AdminMainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './RecruiterMainPage/Components/Auth/Auth';

const Admin = "admin";
const Recruiter = "recruiter";

function App() {
  const currentUser = "recruiter";
  return (
    <>
    <Auth />
    {/* {decidePage(currentUser)} */}
    </>
  );
}

function decidePage(currentUser: any){
  if (currentUser === Admin){
    return (<AdminMainPage />)
  }else if (currentUser === Recruiter){
    return (
      <Auth />
    )
  }else{
    return (
      <DrushimMainPage />
    )
  }
}

export default App;

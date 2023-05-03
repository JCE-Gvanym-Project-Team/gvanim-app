import React from 'react';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import AdminMainPage from './AdminMainPage/AdminMainPage';
import RecruiterMainPage from './RecruiterMainPage/RecruiterMainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import PasswordRecover from './RecruiterMainPage/Components/PasswordRecoveryPage/PasswordRecoveryPage';
import Auth from './RecruiterMainPage/Components/Auth/Auth';
import { Route, Routes } from 'react-router-dom';

const Admin = "admin";
const Recruiter = "recruiter";

function App() {
  // const currentUser = "recruiter";
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/Recovery' element={<PasswordRecover />} />
      {/* <RecruiterMainPage handlelogout={undefined} /> */}
      {/* {decidePage(currentUser)} */}
    </Routes>



  );
}

function decidePage(currentUser: any) {
  if (currentUser === Admin) {
    return (<AdminMainPage />)
  } else if (currentUser === Recruiter) {
    return (
      <RecruiterMainPage handlelogout={undefined} />
    )
  } else {
    return (
      <DrushimMainPage />
    )
  }
}

export default App;

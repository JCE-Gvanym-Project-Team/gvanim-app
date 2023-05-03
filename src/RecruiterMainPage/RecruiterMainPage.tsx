import React from 'react'
import ManageCandidatesPage from './ManageCandidatesPage/ManageCandidatesPage'
import ManageJobsPage from './ManageJobsPage/ManageJobsPage'
import ReportsPage from './ReportsPage/ReportsPage'
import { Button } from 'react-bootstrap'



const RecruiterMainPage = ({handlelogout}) => {

  
  return (
 <>
   <ManageCandidatesPage />
   <ManageJobsPage />
   <ReportsPage />


   <section>
    <nav>
    <h2>Welcome</h2>
    <Button onClick={handlelogout}>התנתק</Button>
    </nav>

   </section>
 </>
  )
}

export default RecruiterMainPage;
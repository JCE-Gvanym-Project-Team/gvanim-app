import { TextField } from '@mui/material'
import React from 'react'
import NewJobPage from '../ManageJobsPage/Components/NewJobPage/NewJobPage'

export default function ManageCandidatesPage(props: { setHomeActive: any, setReportsActive: any, setCandidatesActive: any, setJobsActive: any }) {
  // for the navigation bar
  const { setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;
  setHomeActive(false); setCandidatesActive(true);
  setReportsActive(false); setJobsActive(false);
  // ----------------------------

  return (
    <>
      <div>ManageCandidatesPage</div>
    </>
  )
}

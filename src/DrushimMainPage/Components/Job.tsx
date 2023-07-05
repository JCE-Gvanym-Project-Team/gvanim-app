import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { Job, getFilteredJobs } from '../../Firebase/FirebaseFunctions/Job';


const SingleJob = (props: { id: any }) => {
  const { id } = props;
  const [job, setJob] = useState<Job>();

  const fetchAllJobs = async () => {

    const jobs = await getFilteredJobs();
    let myJob = jobs.filter(job => job._jobNumber === id);
    setJob(myJob[0]);
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);




  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{
          mt: 3,padding: 3, height: 'fit-content', display: 'flex', flexDirection: 'column', justifyContent: 'start',
          border: '1px solid rgba(0, 0, 0, 0.125)',
          borderRadius: '0.75rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'saturate(200%) blur(30px)',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
        }}>
          <Stack direction='column'>
            <Typography variant='h2'>משרה מס': {job?._jobNumber}</Typography>
            <label>שם המשרה(כותרת):</label>
            <Box sx={{
              BorderStyle: 'solid',
              border: '1px solid rgba(0, 0, 0, 0.125)',
              borderRadius: '0.3rem',
              padding: '8px',
            }}> {job?._title}</Box>

            <label>שם המשרה:</label>
            <Box sx={{
              border: '1px solid rgba(0, 0, 0, 0.125)',
              borderRadius: '0.3rem',
              padding: '8px',
            }}> {job?._title}</Box>

            <label>תפקיד:</label>
            <Box sx={{
              border: '1px solid rgba(0, 0, 0, 0.125)',
              borderRadius: '0.3rem',
              padding: '8px',
            }}> {job?._role}</Box>

            <label>איזור:</label>
            <Box sx={{
              border: '1px solid rgba(0, 0, 0, 0.125)',
              borderRadius: '0.3rem',
              padding: '8px',
            }}> {job?._region}</Box>

            <label>תיאור:</label>
            <Box sx={{
              border: '1px solid rgba(0, 0, 0, 0.125)',
              borderRadius: '0.3rem',
              padding: '8px',
            }}> {job?._description[0]}</Box>

            <label>דרישות:</label>
            <Box sx={{
              border: '1px solid rgba(0, 0, 0, 0.125)',
              borderRadius: '0.3rem',
              padding: '8px',
            }}> {job?._requirements}</Box>



          </Stack>
        </Box>
      </Box>




    </>
  )
}

export default SingleJob;

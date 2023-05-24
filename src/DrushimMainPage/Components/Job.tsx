import { Box, Typography } from '@mui/material';
import React from 'react'


const Job = () => {
  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant='h1'>Single Page Job Details</Typography>
        </Box>
      </Box>
    </>
  )
}

export default Job;

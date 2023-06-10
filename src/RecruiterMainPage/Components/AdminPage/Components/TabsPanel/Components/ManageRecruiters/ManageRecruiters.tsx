import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import RecruitersTable from './Components/RecruitersList/RecruitersTable'

export default function ManageRecruiters() {
    return (
        <>

            <Stack p={2} direction='row' justifyContent='space-between'>
                <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'> ניהול מגייסים</Typography>
                <Button variant='contained'>הוסף מגייס</Button>
            </Stack>
            <RecruitersTable />
        </>
    )
}

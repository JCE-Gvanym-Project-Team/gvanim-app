import { Container, Divider, Grid } from '@mui/material'
import React from 'react'

export default function NewJobPage() {
    return (
        <Grid container spacing={2} alignItems="center">
        <Grid item>
          <div>Item</div>
          <div>Item</div>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item>Item</Grid>
      </Grid>
    )
}

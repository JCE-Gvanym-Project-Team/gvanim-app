import React from 'react'
import { Button, Grid, Container, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { editButtonStyle, nameStyle, mainGridStyle } from './ViewCandidatesPageStyle';

export default function ViewCandidatesPage() {
	//TODO: replace this with real info
	let candidateName = "ישראל ישראלי"
	return (
		<>
			<Container sx={mainGridStyle}>
				<Grid direction={'column'} sx={mainGridStyle} container spacing={2}>

					{/* Edit Button */}
					<Button sx={editButtonStyle} variant="contained" endIcon={<EditIcon />}>
						ערוך פרטים
					</Button>

					{/* Candidate Name */}
					<Typography sx={nameStyle}>
						שם: {candidateName}
					</Typography>

					{/* Candidate Info Table */}
					<Typography sx={nameStyle}>
						:משרות
					</Typography>
				</Grid>
			</Container>
		</>
	)
}

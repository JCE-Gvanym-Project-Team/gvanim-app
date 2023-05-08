import React from 'react'
import { Button, Grid, Container, Typography, Box, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { editButtonStyle, textStyle, titleStyle, mainStackStyle } from './ViewCandidatesPageStyle';

export default function ViewCandidatesPage() {
	//TODO: replace this with real info
	let candidateName = "ישראל ישראלי"
	return (
		<>
			<Container>
				<Stack direction={'column'} sx={mainStackStyle} spacing={2}>
					{/* Title */}
					<Typography sx={titleStyle} variant='h2'>
						ניהול משרות
					</Typography>

					{/* Box for candidate name and 
					 /* edit button to make them on the same line */}
					<Box sx={{ display: 'flex', justifyContent: 'space-between', justifySelf: 'stretch', flexGrow: '1'}}>
						{/* Candidate Name */}
						<Typography sx={textStyle}>
							שם: {candidateName}
						</Typography>

						{/* Edit Button */}
						<Button sx={editButtonStyle} variant="contained" startIcon={<EditIcon />}>
							ערוך פרטים
						</Button>
					</Box>


					{/* Candidate Info Table */}
					<Typography sx={textStyle}>
						משרות:
					</Typography>
				</Stack>
			</Container>
		</>
	)
}

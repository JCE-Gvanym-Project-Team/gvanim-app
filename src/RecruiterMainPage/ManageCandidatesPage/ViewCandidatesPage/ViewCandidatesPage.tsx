import React from 'react'
import { Button, Grid, Container, Typography, Box, Stack, Input, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { editButtonStyle, textStyle, titleStyle, mainStackStyle } from './ViewCandidatesPageStyle';

export default function ViewCandidatesPage() {
	//TODO: replace this with real info
	let candidateName = "ישראל ישראלי"
	return (
		<>
			<Container>
				<Stack direction={'column'} sx={mainStackStyle} spacing={6}>
					{/* Title */}
					<Typography sx={titleStyle} variant='h2'>
						צפייה במועמד
					</Typography>

					{/* Box for candidate name and 
					 /* edit button to make them on the same line */}
					<Box sx={{ display: 'flex', justifyContent: 'space-between', justifySelf: 'stretch', flexGrow: '1' }}>

						{/* Candidate Name */}
						<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
							<Typography sx={textStyle} variant='h4'>
								שם:
							</Typography>

							<Typography sx={{ textDecoration: 'underline', marginLeft: '1rem' }} variant='h4' >
								{candidateName}
							</Typography>
						</Box>

						{/* Edit Button */}
						<Button sx={editButtonStyle} variant="contained" startIcon={<EditIcon />}>
							ערוך פרטים
						</Button>
					</Box>


					{/* Candidate Info Table */}
					<Box>
						<Typography sx={textStyle} variant='h4'>
							משרות
						</Typography>
						
					</Box>
				</Stack>
			</Container>
		</>
	)
}

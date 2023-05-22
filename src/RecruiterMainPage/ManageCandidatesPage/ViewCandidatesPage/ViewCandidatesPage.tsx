import React from 'react'
import { Button, Grid, Container, Typography, Box, Stack, Input, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { editButtonSx, textSx, titleSx, mainStackSx, ContainerGradientSx, candidateNameSx, BoxGradientSx } from './ViewCandidatesPageStyle';

export default function ViewCandidatesPage() {
	//TODO: replace this with real info
	let candidateName = "ישראל ישראלי"
	return (
		<>
			<Box sx={BoxGradientSx} />
			<Box sx={ContainerGradientSx}>
				<Stack direction={'column'} sx={mainStackSx} spacing={6}>
					{/* Title */}
					<Typography sx={titleSx} variant='h2'>
						צפייה במועמד
					</Typography>

					{/* Box for candidate name and 
					 /* edit button to make them on the same line */}
					<Box sx={{ display: 'flex', justifyContent: 'space-between', justifySelf: 'stretch', flexGrow: '1' }}>

						{/* Candidate Name */}
						<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
							<Typography sx={textSx} variant='h4'>
								שם:
							</Typography>

							<Typography sx={candidateNameSx} variant='h4' >
								{candidateName}
							</Typography>
						</Box>

						{/* Edit Button */}
						<Button sx={editButtonSx} variant="contained" startIcon={<EditIcon />}>
							ערוך פרטים
						</Button>
					</Box>


					{/* Candidate Info Table */}
					<Box>
						<Typography sx={textSx} variant='h4'>
							משרות
						</Typography>
						
					</Box>
				</Stack>
			</Box>
		</>
	)
}

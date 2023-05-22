import React, { useState } from 'react'
import { Button, Grid, Container, Typography, Box, Stack, Input, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { editButtonSx, textSx, titleSx, mainStackSx, ContainerGradientSx, candidateNameSx, BoxGradientSx, candidateNameAndEditButtonContainerSx, jobTextSx } from './ViewCandidatesPageStyle';
import { ManageCandidatesPageGlobalStyle } from '../../PageStyles';
import JobsTable from './Components/JobsTable';

export default function ViewCandidatesPage()
{
	const [dataSize, setDataSize] = useState(0);
	//TODO: replace this with real info
	let candidateName = "ישראל ישראלי"
	return (
		<>
			{/* background div */}
			<Box sx={BoxGradientSx} />

			{/* glass container */}
			<Box sx={{marginTop: ManageCandidatesPageGlobalStyle.marginFromNavbar}}>
				<Box sx={ContainerGradientSx}>
					<Stack direction={'column'} sx={mainStackSx} spacing={6}>
						{/* Title */}
						<Typography sx={titleSx} variant='h2'>
							צפייה במועמד
						</Typography>

						{/* Box for candidate name and 
					 	/* edit button to make them on the same line */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
							{/* Candidate Name */}
							<Box sx={{ display: 'flex'}}>
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
							<Typography sx={jobTextSx} variant='h4'>
								משרות
							</Typography>

							<JobsTable setDataSize={setDataSize}/>

						</Box>
					</Stack>
				</Box>
			</Box>
		</>
	)
}

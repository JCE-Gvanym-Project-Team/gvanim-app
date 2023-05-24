import React, { useState } from 'react'
import { Button, Grid, Container, Typography, Box, Stack, Input, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { editButtonSx, textSx, titleSx, mainStackSx, ContainerGradientSx, candidateNameSx, BoxGradientSx, candidateNameAndEditButtonContainerSx, jobTextSx } from './ViewCandidatesPageStyle';
import { ManageCandidatesPageGlobalStyle } from '../../PageStyles';
import JobsTable from './Components/JobsTable';
import { Candidate } from '../../../Firebase/FirebaseFunctions/Candidate';
import { useLocation } from 'react-router-dom';

export default function ViewCandidatesPage()
{	
	// get candidate id
	const {state} = useLocation();
	const [dataSize, setDataSize] = useState(0);
	//TODO: replace this with real info

	//extract candidate object from database
	let candidateName = "";
	if (state != null){
		candidateName = state;
	}
	return (
		<>
			{/* background div */}
			<Box sx={BoxGradientSx} />

			{/* glass container */}
			<Box sx={{ marginTop: ManageCandidatesPageGlobalStyle.marginFromNavbar }}>
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
							<Box sx={{ display: 'flex' }}>
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


						{/* text + move to another job button */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
							<Typography sx={jobTextSx} variant='h4'>
								משרות
							</Typography>

							<Button sx={editButtonSx} variant="contained" startIcon={<EditIcon />}>
								העבר למשרה אחרת
							</Button>
						</Box>

						{/* Jobs table */}
						<JobsTable setDataSize={setDataSize} />

						{/* Bottom Buttons */}
						<Box sx={candidateNameAndEditButtonContainerSx}>
						<Button sx={editButtonSx} variant="contained" startIcon={<EditIcon />}>
								ניהול ראיונות
							</Button>
							<Button sx={editButtonSx} variant="contained" startIcon={<EditIcon />}>
								ממליצים
							</Button>
							<Button sx={editButtonSx} variant="contained" startIcon={<EditIcon />}>
							 	הערות
							</Button>
						</Box>

					</Stack>
				</Box>
			</Box>
		</>
	)
}

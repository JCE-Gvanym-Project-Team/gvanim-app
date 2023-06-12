import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Container, Stack, useTheme } from '@mui/material';
import MyTable from '../ReportsPage/Components/MyTable/MyTable';
import { BoxGradientSx } from '../PageStyles';
import { ManageJobPageBoxSx } from '../ManageJobsPage/ManageJobsPageStyle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import JobsByRegions from '../../Firebase/FirebaseFunctions/Reports/JobsByRegions';
import CandidatesByRoles from '../../Firebase/FirebaseFunctions/Reports/CandidatesByRoles';


function ReportsPage() {

	return (
		<>
			<Box sx={BoxGradientSx}>

				<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
					right: '2%',
					left: 'auto',
					top: '15%',
					bottom: 'auto',
					backgroundColor: 'hsla(0,0%,100%,.1)',
					background: 'hsla(0,0%,100%,.1)',
					width: '100px',
					height: '100px',
					borderRadius: '50%',
					position: 'absolute',
				}} />

				<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
					right: '10%',
					left: 'auto',
					top: '0%',
					backgroundColor: 'hsla(0,0%,100%,.1)',
					background: 'hsla(0,0%,100%,.1)',
					width: '170px',
					height: '170px',
					borderRadius: '50%',
					position: 'absolute',
				}} />

				<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
					left: '40%',
					top: '-1%',
					right: 'auto',
					bottom: 'auto',
					backgroundColor: 'hsla(0,0%,100%,.1)',
					background: 'hsla(0,0%,100%,.1)',
					width: '60px',
					height: '60px',
					borderRadius: '50%',
					position: 'absolute',
				}} />


				<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
					left: 'auto',
					top: '16%',
					bottom: 'auto',
					backgroundColor: 'hsla(0,0%,100%,.1)',
					background: 'hsla(0,0%,100%,.1)',
					width: '30px',
					height: '30px',
					borderRadius: '50%',
					position: 'absolute',
				}} />

				<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
					left: '-2%',
					top: '12%',
					bottom: 'auto',
					backgroundColor: 'hsla(0,0%,100%,.1)',
					background: 'hsla(0,0%,100%,.1)',
					width: '120px',
					height: '120px',
					borderRadius: '50%',
					position: 'absolute',
				}} />

				<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
					left: '4%',
					top: '8%',
					bottom: 'auto',
					backgroundColor: 'hsla(0,0%,100%,.1)',
					background: 'hsla(0,0%,100%,.1)',
					width: '80px',
					height: '80px',
					borderRadius: '50%',
					position: 'absolute',
				}} />

				<Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
					left: '25%',
					top: '12%',
					bottom: 'auto',
					backgroundColor: 'hsla(0,0%,100%,.1)',
					background: 'hsla(0,0%,100%,.1)',
					width: '60px',
					height: '60px',
					borderRadius: '50%',
					position: 'absolute',
				}} />


				<Box sx={{ display: 'flex', flexDirection: 'column', top: "120px", position: "absolute" }}>
					<Stack direction='row' spacing={1}>
						<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
						</Box>
						<Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 500 }}>
							<AssessmentIcon></AssessmentIcon>
							ניהול דוחות
						</Typography>
					</Stack>
				</Box>
			</Box>

			<Box> 
				<JobsByRegions></JobsByRegions>
				 <MyTable></MyTable> 
<<<<<<< HEAD
				<JobsByRegions></JobsByRegions>
				 <h2>כמות מועמדים למשרות השונות</h2>
				<CandidatesByRoles></CandidatesByRoles> 
				 
=======
				{/* <CandidatesByRoles></CandidatesByRoles> */}
>>>>>>> 9a9c86ed07127f0197f37b760284d0bbf7d5eacc
			</Box>
		</>
	)
}


export default ReportsPage;

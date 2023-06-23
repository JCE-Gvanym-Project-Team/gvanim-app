import AssessmentIcon from '@mui/icons-material/Assessment';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import CandidatesByRoles from '../../Firebase/FirebaseFunctions/Reports/CandidatesByRoles';
import JobsByRegions from '../../Firebase/FirebaseFunctions/Reports/JobsByRegions';
import { BoxGradientSx } from '../PageStyles';
import MyTable from '../ReportsPage/Components/MyTable/MyTable';


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
				<Typography variant='h2' style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>משרות לפי ערים</Typography>
				<JobsByRegions></JobsByRegions>
				<Typography variant='h2' style={{ textAlign: "center",marginTop: "250px", marginBottom: "0px"}}>משרות פופולריות</Typography>
				<CandidatesByRoles></CandidatesByRoles>
				<h2 style={{ textAlign: "center" }}>דוחות נוספים</h2>
				<MyTable></MyTable>
			</Box>
		</>
	)
}


export default ReportsPage;

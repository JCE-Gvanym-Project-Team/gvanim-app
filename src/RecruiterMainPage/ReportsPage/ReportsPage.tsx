import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Stack, useTheme } from '@mui/material';
import { ArticleOutlined } from '@mui/icons-material';
import MyTable from '../ReportsPage/Components/MyTable/MyTable';
import { BoxGradientSx } from '../PageStyles';
import { ManageJobPageBoxSx } from '../ManageJobsPage/ManageJobsPageStyle';



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


		 <Box sx={{ display: 'flex', flexDirection: 'column', top: "165px", position: "absolute" }}> 
			<Stack direction='row' spacing={1}>
				<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<ArticleOutlined sx={{ color: '#fff' }} />
				</Box>
				<Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 500 }}>
					ניהול דוחות
				</Typography>
			</Stack>
		 </Box>
		</Box>

       <Box sx={ManageJobPageBoxSx}>
		<MyTable></MyTable>
		</Box>
</>
	)
}


export default ReportsPage;

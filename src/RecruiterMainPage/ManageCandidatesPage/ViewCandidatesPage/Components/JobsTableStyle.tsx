import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { CSSProperties } from '@mui/material/styles/createTypography';


export const MyButtonSx: SxProps = {
		backgroundColor: 'rgb(52, 71, 103)',
		":hover": {
			bgcolor: "rgb(52, 71, 103)",
		}
}
export const dataGridContainerSx: SxProps = {
	border: 1,
	overflow: 'hidden'
}

export const dataGridContainerStyle:CSSProperties = {
	padding: 0,
	marginBottom: '15px',
}

export const dataGridSx = (theme: Theme): SxProps => ({
	padding: 1,
	height: 450, 
	overflow: 'hidden',
	boxShadow: 2,
	"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
		outline: "none !important",
	},
	border: 0,
	color:
		theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
	fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
	WebkitFontSmoothing: 'auto',
	letterSpacing: 'normal',
	'& .MuiDataGrid-columnsContainer': {
		backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
	},
	'& .MuiDataGrid-iconSeparator': {
		display: 'none',
	},
	'& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
		borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
	},
	'& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
		borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
			}`,
	},
	'& .MuiDataGrid-cell': {
		color:
			theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
	},
	'& .MuiPaginationItem-root': {
		borderRadius: 0,
	}
});

export const TypographyFooterSx: SxProps = {
	fontWeight: '500',
	marginLeft: '8px',
	color: 'rgb(62, 80, 96)',
	fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont,"Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"'
}

export const GridFooterContainerSx: SxProps = {
	width: '100%',
	display: 'flex',
	justifyContent: 'center'
}



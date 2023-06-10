import { SxProps, createTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';


export const MyButtonSx: SxProps = {
    ":active": {
		backgroundColor: 'transparent',
		transform: 'none'
	},
	":hover": {
		opacity: '0.75',
		color: '#555abf',
		backgroundColor: 'transparent',
		border: '1px solid #555abf',
		borderRadius: '0.5rem'

	},
	border: '1px solid #555abf',
	color: '#555abf',
	letterSpacing: 0,
	backgroundSize: '150%',
	backgroundPositionX: '25%',
	position: 'relative',
	overflow: 'hidden',
	WebkitAppearance: 'none',
	borderRadius: '0.5rem',
	fontSize: '0.85rem',
	paddingX: '1rem',
	paddingY: '0.375rem',
	fontWeight: 600,
	margin: '0px 4px 0px 4px',
	lineHeight: 1.667,
	height: '32px'
}
export const dataGridContainerSx: SxProps = {
	overflow: 'hidden',
	border: '1px solid rgba(0, 0, 0, 0.125)',
	display:"flex",
	justifyContent: "stretch",
	alignItems: "center"
}

export const dataGridContainerStyle = {
	padding: 0,
	marginBottom: '15px',
	width: "100%",
}

export const dataGridSx = (theme: Theme): SxProps => ({
	padding: 0,
	height: 'calc(100vh - 112px)',	
	overflow: 'hidden',
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
	'& .MuiDataGrid-columnHeader': {
		borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
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
	fontWeight: '400',
	marginLeft: '8px',
	color: 'black',
	fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont,"Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"'
}

export const GridFooterContainerSx: SxProps = {
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between'
}



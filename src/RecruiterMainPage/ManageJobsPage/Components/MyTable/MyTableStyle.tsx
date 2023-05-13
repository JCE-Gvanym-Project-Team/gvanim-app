import { SxProps, createTheme } from '@mui/material';
import { CSSProperties } from '@mui/material/styles/createTypography';
import { Theme } from '@mui/material/styles';

export const dataGridContainerSx: SxProps = (theme) => ({
	border: 1,
	overflow: 'hidden'
});

export const dataGridContainerStyle: CSSProperties = {
	padding: 0,
	marginTop: '15px',
	marginBottom: '15px'
}

export const dataGridSx = (theme: Theme): SxProps => ({
	maxHeight: 550, overflow: 'hidden',
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

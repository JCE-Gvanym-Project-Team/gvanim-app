import { SxProps, createTheme } from '@mui/material';
import type { } from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
	components: {
		// Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
		MuiDataGrid: {
			styleOverrides: {
				root: {
					backgroundColor: 'red',
				},
			},
		},
	},
});

const DataGridContainerSx: SxProps = {
	border: 1, 
	overflow: 'hidden'
}

const DataGridContainerStyle = {
	
}
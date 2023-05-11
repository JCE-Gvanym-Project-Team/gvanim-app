import { createTheme } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';

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
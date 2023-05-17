import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'CandidateName',
    headerName: 'שם המועמד',
    width: 150,
    editable: true,
  },
  {
    field: 'match',
    headerName: 'התאמה',
    width: 150,
    editable: true,
  },
 
];

const rows = [
  { CandidateName: 'Snow', match: 'Jon'},
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from "react";


const columns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 90 },
  {
    field: 'שם הדו"ח',
    headerName: 'שם דו"ח',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.name || ''}`,
  },
];

const rows = [
  { id: 1, name: 'משרות לפי תאריכים', age: 35 }
];


export default function DataGridDemo() {
    const [selectedRows, setSelectedRows] = useState([]);
  
    const onRowClick = (event, row) => {
      console.log("Hi")
      window.location.href = `./Components/ManageReports${row.id}`;
    };


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
        onRowClick={onRowClick}

      />
    </Box>
  );
};
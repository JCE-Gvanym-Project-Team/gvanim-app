import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Breakpoint, Container, useTheme } from '@mui/material';
import MyDropMenu from '../MyDropMenu/MyDropMenu';
import {
    DataGrid, GridToolbarFilterButton,
    GridColDef, GridToolbarDensitySelector,
    GridValueGetterParams, GridToolbarColumnsButton,
    GridInitialState, GridToolbarExport,
    useGridRootProps, GridApi,
    useGridApiContext, GridKeyValue,
    GridToolbarContainer, heIL, GridFooterContainer
} from '@mui/x-data-grid';
import { GridFooterContainerSx, TypographyFooterSx, dataGridContainerStyle, dataGridSx } from './MyTableStyle';



function GridCustomToolbar({
    syncState,
}: {
    syncState: (stateToSave: GridInitialState) => void;
}) {
    const rootProps = useGridRootProps();
    const apiRef = useGridApiContext();

    return (

        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const columns: GridColDef[] = [

    {
        field: 'עריכת משרה',
        headerName: '',
        width: 50,
        hideSortIcons: true,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        disableExport: true,
        editable: false,

        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking

                const api: GridApi = params.api;
                const thisRow: Record<string, GridKeyValue> = {};

                //   api
                //     .getAllColumns()
                //     .filter((c) => c.field !== '__check__' && !!c)
                //     .forEach(
                //       (c) => (thisRow[c.field] = params.value(params.id, c.field)),
                //     );

                alert(params.id);
            };

            return <MyDropMenu />;
        },


    },
    { field: 'id', headerName: 'ID', width: 90, align: 'left' },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 250,
        editable: false,
        align: 'left',


    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: false,
        align: 'left',
    },
    {
        field: 'age',
        headerName: 'Age',
        width: 150,
        editable: false,
        align: 'left',
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        align: 'left',
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows1 = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];




function CustomFooter() {

    const [dataSize, setDataSize] = React.useState(rows1.length);

    return (
        <GridFooterContainer sx={ GridFooterContainerSx }>
     
                <Typography variant='subtitle2' sx={ TypographyFooterSx }>
                    מס' משרות:
                </Typography>

                <Typography variant='subtitle2' sx={ TypographyFooterSx }>
                    {dataSize}
                </Typography>

        </GridFooterContainer>
    );
};


export default function MyTable() {

    const theme = useTheme();
    return (

        <Container className="shadow-lg border rounded"
            sx={dataGridContainerStyle}
            style={dataGridContainerStyle}
            maxWidth='xl'>
            <DataGrid
                sx={dataGridSx(theme)}
                rows={rows1}
                columns={columns}
                // checkboxSelection
                // disableRowSelectionOnClick
                // disableColumnMenu
                hideFooterSelectedRowCount
                hideFooterPagination
                // hideFooter
                localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
                slots={{ toolbar: GridCustomToolbar, footer: CustomFooter }}
            />
        </Container>
    );
}
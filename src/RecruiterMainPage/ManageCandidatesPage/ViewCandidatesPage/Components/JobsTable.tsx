// imports
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import React from 'react'
import { GridFooterContainerSx, TypographyFooterSx, dataGridContainerStyle, dataGridSx } from './JobsTableStyle';
import
    {
        DataGrid,
        GridColDef,
        GridFooterContainer,
        GridInitialState,
        GridToolbarColumnsButton,
        GridToolbarContainer,
        GridToolbarDensitySelector,
        GridToolbarExport,
        GridToolbarFilterButton,
        heIL,
        useGridApiContext,
        useGridRootProps
    } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';



// toolbar (sorting and stuff)
const GridCustomToolbar = ({ syncState }: { syncState: (stateToSave: GridInitialState) => void; }) => 
{
    const rootProps = useGridRootProps();
    const apiRef = useGridApiContext();
    const navigate = useNavigate();

    const handleCreatejob = () =>
    {
        navigate("/createJob", { state: null });
    }

    return (

        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>

            <Box>
                <GridToolbarFilterButton />
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </Box>

            <Box>

                <Button color='info' variant='contained' size='small' onClick={handleCreatejob}>משרה חדשה</Button>
            </Box>

        </GridToolbarContainer>
    );
};

// columns
const columns: GridColDef[] = [

    {
        field: '_jobNumber',
        headerName: "מס' משרה",
        width: 150,
        align: 'left'
    },

    {
        field: '_region',
        headerName: 'איזור',
        width: 200,
        editable: false,
        align: 'left',


    },
    {
        field: '_role',
        headerName: 'תפקיד',
        width: 300,
        editable: false,
        align: 'left',
    },
    {
        field: '_scope',
        headerName: 'אחוז משרה',
        width: 150,
        editable: false,
        align: 'left',
    }
];

// Footer
const CustomFooterComponent = ({setDataSize, jobs}) =>
{
    setDataSize(jobs.length);

    return (
        <GridFooterContainer sx={GridFooterContainerSx}>

            <Typography variant='subtitle2' sx={TypographyFooterSx}>
                מס' משרות:
            </Typography>

            <Typography variant='subtitle2' sx={TypographyFooterSx}>
                {jobs.length}
            </Typography>

        </GridFooterContainer>
    );
};

export default function JobsTable(props: { setDataSize: any })
{
    const [jobs, setAllJobs] = React.useState<any[]>([]);
    const theme = useTheme();
    const { setDataSize } = props;
    const CustomFooter = () => {
        return <CustomFooterComponent setDataSize={setDataSize} jobs={jobs}/>
    }
    return (
        <>
            <Container className="shadow-lg border rounded"
                sx={dataGridContainerStyle}
                style={dataGridContainerStyle}
                maxWidth='xl'>
                <DataGrid
                    sx={dataGridSx(theme)}
                    rows={jobs}
                    columns={columns}
                    onRowDoubleClick={(job) => { console.log(job.id) }}

                    // checkboxSelection
                    // disableRowSelectionOnClick
                    // disableColumnMenu
                    hideFooterSelectedRowCount
                    hideFooterPagination
                    // hideFooter
                    localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
                    slots={{ toolbar: GridCustomToolbar, footer: CustomFooter }} />

            </Container></>
    );
}

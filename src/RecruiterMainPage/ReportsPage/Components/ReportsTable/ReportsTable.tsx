import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container, Fab, useTheme } from '@mui/material';
import {
    DataGrid, GridToolbarFilterButton,
    GridColDef, GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridInitialState, GridToolbarExport,
    useGridRootProps, GridApi,
    useGridApiContext, GridKeyValue,
    GridToolbarContainer, heIL, GridFooterContainer
} from '@mui/x-data-grid';
import { GridFooterContainerSx, TypographyFooterSx, dataGridContainerStyle, dataGridSx } from './ReportsTableStyle';



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
        field: 'תפריט',
        headerName: '',
        width: 50,
        hideSortIcons: true,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        disableExport: true,
        editable: false,

        // renderCell: () => {


            //  return <MyDropMenu />;
        // },


    },

    {
        field: '_jobNumber',
        headerName: "מס' משרה",
        width: 110,
        align: 'left'
    },

    {
        field: '_region',
        headerName: 'איזור',
        width: 150,
        editable: false,
        align: 'left',


    },
    {
        field: '_role',
        headerName: 'תפקיד',
        width: 250,
        editable: false,
        align: 'left',
    },
    {
        field: '_scope',
        headerName: 'אחוז משרה',
        width: 90,
        editable: false,
        align: 'left',
    },
    {
        field: 'candidates',
        headerName: 'מועמדים שניגשו',
        description: 'עמודה זו אינה ניתנת למיון',
        sortable: false,
        editable: false,
        align: 'left',
        width: 260,
        // renderCell: (job) => {
            //  return <CandidatesListFullScreenDialog JobId={job.id} />;
        // },
        // valueGetter: (params: GridValueGetterParams) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, _jobNumber: 1, _region: 'באר שבע', _role: 'מהנדס תוכנה', _scope: '80%', _candidates: 'לרשימת המועמדים' },

];




function CustomFooter() {

    const [dataSize, setDataSize] = React.useState(3);

    return (
        <GridFooterContainer sx={GridFooterContainerSx}>

            <Typography variant='subtitle2' sx={TypographyFooterSx}>
                מס' משרות:
            </Typography>

            <Typography variant='subtitle2' sx={TypographyFooterSx}>
                {dataSize}
            </Typography>

        </GridFooterContainer>
    );
};


function getScopeFormated(scope: number[] | null) {

    return scope === null ? '0-100' : scope[0].toString() + '-' + scope[1].toString();

}

export default function MyTable() {
    const [allJobs, setAllJobs] = React.useState<any[]>([]);
// 
    // const fetchAllJobs = async () => {
        // const jobs = await getFilteredJobs();
        //  const jobsWithId = jobs.map((job) => ({ ...job, id: job._jobNumber, _scope: getScopeFormated(job._scope) }));
        // setAllJobs(jobsWithId);
// 
    // };
// 
    // React.useEffect(() => {
        // fetchAllJobs();
    // }, []);


    const theme = useTheme();

    return (
        <>
            <Container className="shadow-lg border rounded"
                sx={dataGridContainerStyle}
                style={dataGridContainerStyle}
                maxWidth='xl'>
                <DataGrid
                    sx={dataGridSx(theme)}
                    rows={allJobs}
                    columns={columns}
                    onRowDoubleClick={(job)=>{console.log(job.id)}}
                   
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
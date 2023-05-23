import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Container, Divider, Fab, Stack, useTheme } from '@mui/material';
import MyDropMenu from '../MyDropMenu/MyDropMenu';
import {
    DataGrid, GridToolbarFilterButton,
    GridColDef, GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridInitialState, GridToolbarExport,
    useGridRootProps, GridApi,
    useGridApiContext, GridKeyValue,
    GridToolbarContainer, heIL, GridFooterContainer, GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { GridFooterContainerSx, TypographyFooterSx, dataGridContainerStyle, dataGridSx } from './MyTableStyle';
import CandidatesListFullScreenDialog from '../CandidatesListDialog/CandidatesListDialog';
import { getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/Job';
import { useNavigate } from "react-router-dom";








const rows = [
    { id: 1, _jobNumber: 1, _region: 'באר שבע', _role: 'מהנדס תוכנה', _scope: '80%', _candidates: 'לרשימת המועמדים' },

];


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

        renderCell: (job) => {


            return <MyDropMenu JobId={job.id} />;
        },


    },

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
    },
    {
        field: 'candidates',
        headerName: 'מועמדים שניגשו',
        description: 'עמודה זו אינה ניתנת למיון',
        sortable: false,
        editable: false,
        align: 'left',
        width: 300,
        renderCell: (job) => {
            return <CandidatesListFullScreenDialog JobId={job.id} />;
        },
        // valueGetter: (params: GridValueGetterParams) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const GridCustomToolbar = ({ syncState }: { syncState: (stateToSave: GridInitialState) => void; }) => {
    const rootProps = useGridRootProps();
    const apiRef = useGridApiContext();
    const navigate = useNavigate();

    const handleCreatejob = () => {
        navigate("/createJob", { state: null });
    }

    return (
        <GridToolbarContainer>
            <Stack direction='row' sx={{ width: '100%' }}>
                <Box sx={{ width: '100%' }}>
                    <GridToolbarQuickFilter variant='outlined' size='small' sx={{ width: '100%' }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', width: '100%'}}>
                    <Box>

                        <Button type="button" onClick={handleCreatejob} variant='contained' sx={{
                            backgroundColor: 'rgb(52, 71, 103)',
                            ":hover": {
                                bgcolor: "rgb(52, 71, 103)",
                            }
                        }} fullWidth>משרה חדשה</Button>

                    </Box>
                </Box>

            </Stack>


            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', borderBottomColor: 'rgba(224, 224, 224, 1)' }}>

                <Box>
                    <GridToolbarFilterButton />
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </Box>
                {/* 
                <Box>
                    <Button color='info' variant='contained' size='small' onClick={handleCreatejob}>משרה חדשה</Button>
                </Box> */}




            </Box>
        </GridToolbarContainer>
    );
};

function getScopeFormated(scope: number[] | null) {

    return scope === null ? '0-100' : scope[0].toString() === scope[1].toString() ? scope[0].toString() + '%' : scope[1].toString() + '% - ' + scope[0].toString() + '%';

}

export default function MyTable(props: { setDataSize: any }) {
    const { setDataSize } = props;
    const [allJobs, setAllJobs] = React.useState<any[]>([]);

    const fetchAllJobs = async () => {
        const jobs = await getFilteredJobs();
        const jobsWithId = jobs.map((job) => ({ ...job, id: job._jobNumber, _scope: getScopeFormated(job._scope) }));
        setAllJobs(jobsWithId);

    };


    const CustomFooter = () => {
        setDataSize(allJobs.length);

        return (
            <GridFooterContainer sx={GridFooterContainerSx}>

                <Typography variant='subtitle2' sx={TypographyFooterSx}>
                    מס' משרות:
                </Typography>

                <Typography variant='subtitle2' sx={TypographyFooterSx}>
                    {allJobs.length}
                </Typography>

            </GridFooterContainer>
        );
    };



    React.useEffect(() => {
        fetchAllJobs();
    }, []);


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
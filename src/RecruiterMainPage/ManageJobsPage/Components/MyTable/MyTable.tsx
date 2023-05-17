import * as React from 'react';
import Typography from '@mui/material/Typography';
import {  Container, Fab, useTheme } from '@mui/material';
import MyDropMenu from '../MyDropMenu/MyDropMenu';
import {
    DataGrid, GridToolbarFilterButton,
    GridColDef, GridToolbarDensitySelector,
     GridToolbarColumnsButton,
    GridInitialState, GridToolbarExport,
    useGridRootProps, GridApi,
    useGridApiContext, GridKeyValue,
    GridToolbarContainer, heIL, GridFooterContainer
} from '@mui/x-data-grid';
import { GridFooterContainerSx, TypographyFooterSx, dataGridContainerStyle, dataGridSx } from './MyTableStyle';
import NavigationIcon from '@mui/icons-material/Navigation';
import CandidatesListFullScreenDialog from '../CandidatesListDialog/CandidatesListDialog';
import { getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/Job';




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

        renderCell: () => {
      

            return <MyDropMenu />;
        },


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
        renderCell: () => {
            return <CandidatesListFullScreenDialog />;
        },
        // valueGetter: (params: GridValueGetterParams) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, _jobNumber: 1, _region: 'באר שבע', _role: 'מהנדס תוכנה',_scope: '80%', _candidates: 'לרשימת המועמדים'},

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


function getScopeFormated(scope: number[] | null){

  return scope === null ? '0-100' : scope[0].toString() + '-' + scope[1].toString();

}



async function test(){
    let x = [{}];
    let jobs = await getFilteredJobs();
 
    var obj = {};


    jobs.forEach((job) => {
        obj['id'] = job._jobNumber;
        obj['_jobNumber'] = job._jobNumber;
        obj['_region'] = job._region;
        obj['_role'] = job._role;
        obj['_scope'] = getScopeFormated(job._scope);

        x.push(obj)
    });


    console.log(x);
// 
}

export default function MyTable() {
    const [allJobs,setAllJobs] = React.useState({});



    const theme = useTheme();
    return (
        <>
        <Container className="shadow-lg border rounded"
            sx={dataGridContainerStyle}
            style={dataGridContainerStyle}
            maxWidth='xl'>
                <DataGrid
                    sx={dataGridSx(theme)}
                    rows={rows}
                    columns={columns}
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
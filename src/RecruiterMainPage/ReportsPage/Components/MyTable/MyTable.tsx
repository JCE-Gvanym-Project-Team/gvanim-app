import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container, Fab, useTheme } from '@mui/material';
import {
    DataGrid, GridToolbarFilterButton,
    GridColDef, GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridInitialState, GridToolbarExport,
    useGridRootProps, GridApi,
    useGridApiContext, GridKeyValue, GridValueGetterParams,
    GridToolbarContainer, heIL, GridFooterContainer, GridRowParams
} from '@mui/x-data-grid';
import { GridFooterContainerSx, TypographyFooterSx, dataGridContainerStyle, dataGridSx } from './MyTableStyle';
import { useNavigate } from 'react-router-dom';

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
    { field: 'id', headerName: 'id', width: 90 },
    {
        field: 'שם דו"ח',
        headerName: 'שם דו"ח',
        width: 500,
        hideSortIcons: true,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        disableExport: true,
        editable: false,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.name || ''}`,
    },
];

const rows = [
    // { id: 1, name: "מועדמים שנדחו" },
    { id: 1, name: "מועמדים על פי פילטרים" },
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

export default function MyTable() {
    const navigate = useNavigate();

    const onRowClick = (params, event) => {
        const actions = {
            1: () => navigate('CandidateByFilters'),
            // 2: () => navigate('CandidateByFilters')
            // הוסיפו פעולות נוספות כרצונכם לפי הערכים הנדרשים
        };

        const id = params.row.id;
        console.log(id);
        const action = actions[id];

        if (action) {
            action();
        }
    };

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
                    onRowClick={onRowClick}
                    hideFooterSelectedRowCount
                    hideFooterPagination
                    localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
                    slots={{ toolbar: GridCustomToolbar, footer: CustomFooter }} />
                    </Container></>
                    );
                    }

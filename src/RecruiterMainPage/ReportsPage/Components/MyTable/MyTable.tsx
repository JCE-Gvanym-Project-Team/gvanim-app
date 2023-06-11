import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Stack, useTheme } from '@mui/material';
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
import { ArticleOutlined } from '@mui/icons-material';
import MyLoading from '../../../../Components/MyLoading/MyLoading';
import { BoxGradientSx } from '../../../PageStyles';
import { useState } from 'react';

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
    { field: 'id', headerName: 'id', width: 90},
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
    { id: 1, name: "מועמדים על פי פילטרים" },
    { id: 2, name: "משרות על פי פילטרים" },
];


export default function MyTable() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const onRowClick = (params, event) => {
        const actions = {
            1: () => navigate('CandidateByFilters'),
            2: () => navigate('JobsByFilters')
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
            <Box className="shadow-lg border rounded"
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
                    autoHeight 
               />
            </Box>
        </>
    );
}
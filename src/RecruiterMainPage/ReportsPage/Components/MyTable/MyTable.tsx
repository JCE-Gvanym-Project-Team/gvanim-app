import { Box, useTheme } from '@mui/material';
import
    {
        DataGrid,
        GridColDef,
        GridInitialState,
        GridToolbarColumnsButton,
        GridToolbarContainer,
        GridToolbarDensitySelector,
        GridToolbarExport,
        GridToolbarFilterButton,
        GridValueGetterParams,
        heIL,
        useGridApiContext,
        useGridRootProps
    } from '@mui/x-data-grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataGridContainerStyle, dataGridSx } from './MyTableStyle';

function GridCustomToolbar({
    syncState,
}: {
    syncState: (stateToSave: GridInitialState) => void;
})
{
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
    { id: 1, name: "מועמדים על פי פילטרים" },
    { id: 2, name: "משרות על פי פילטרים" },
];


export default function MyTable()
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const onRowClick = (params, event) =>
    {
        const actions = {
            1: () => navigate('CandidateByFilters'),
            2: () => navigate('JobsByFilters')
        };

        const id = params.row.id;

        const action = actions[id];

        if (action)
        {
            action();
        }
    };

    const theme = useTheme();

    return (
        <>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        }}>
            <Box sx={dataGridContainerStyle}>
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
        </Box>
        </>
    );
}
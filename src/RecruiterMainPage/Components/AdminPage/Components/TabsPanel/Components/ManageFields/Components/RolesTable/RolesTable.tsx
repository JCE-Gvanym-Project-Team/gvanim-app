import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Alert, AlertProps, Box, Button, IconButton, Snackbar, Stack, SxProps, Theme, Tooltip, styled, useTheme } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    heIL,
    GridFooterContainer,
    GridRowSelectionModel,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    GridEventListener,
    GridRowParams

} from '@mui/x-data-grid';
import { GridFooterContainerSx, TypographyFooterSx } from '../../../../../../../../ManageJobsPage/Components/MyTable/MyTableStyle';
import MyRoleRemoveDialog from './Components/RemoveRoleDialog';
import AddRoleDialog from './Components/AddRoleDialog';
import { Role, getAllRoles } from '../../../../../../../../../Firebase/FirebaseFunctions/Role';
import ChangeStatusRoleDialog from './Components/ChangeStatusRoleDialog';

interface SelectedRowParams {
    currentRow: any;
}
interface EditGridCustomToolbar {
    selectedRowParams?: SelectedRowParams;
}

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>אין תפקידים</Box>
        </StyledGridOverlay>
    );
}



const dataGridSx = (theme: Theme): SxProps => ({
    height: '500px',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
        outline: "none !important",

    },

    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    }
});



export default function RolesTable() {
    const [rows, setRows] = React.useState<any>([]);
    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

    const [selectedRowParams, setSelectedRowParams] = React.useState<SelectedRowParams | null>(null);

    const handleRowClick: GridEventListener<'rowClick'> = (
        params, // GridRowParams
    ) => {
        const currentRow = params.row;
        setSelectedRowParams({ currentRow });
    };


    //------------------------------------------------------------------------------------------------
    const GridCustomToolbar = () => {

        // for add new role
        const [roleName, setRoleName] = React.useState("");
        const [roleStatus, setRoleStatus] = React.useState<string | number>(1);

        // add role
        const handleAdd = () => {
            if (rows.filter((row: any) => row.role_name === roleName).length !== 0) {
                setSnackbar({ children: `כבר 'קיים תפקיד בשם '${roleName}'.`, severity: 'error' });
            }
            else {
                let role: Role = new Role(roleName, roleStatus === 1 ? true : false);
                role.add(); // add to data base

                setRows([...rows, { id: rows.length, role_name: roleName, role_status: (roleStatus === 1 ? true : false) }]); //refresh table

                setSnackbar({ children: `התפקיד '${roleName}' נוסף בהצלחה.`, severity: 'success' });
            }
        };

        // delete role
        const handleDelete = async () => {

            const roles = await getAllRoles();
            const roleToRemove = roles.filter((role) => role._name === selectedRowParams?.currentRow?.role_name)!;

            roleToRemove[0]?.remove();

            const updateRows = rows.filter(function (role) {
                return role !== selectedRowParams?.currentRow;
            });

            setRows(updateRows);


            setSnackbar({ children: `התפקיד "${selectedRowParams?.currentRow?.role_name}" נמחק בהצלחה`, severity: 'success' });

        }


        return (
            <GridToolbarContainer>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>

                    <GridToolbarQuickFilter size='small' sx={{ padding: 1 }} />

                    <Stack direction='row'>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'start' }}>
                            <AddRoleDialog roleName={roleName} setRoleName={setRoleName} roleStatus={roleStatus} setRoleStatus={setRoleStatus} handleAdd={handleAdd} />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'start' }}>
                            <MyRoleRemoveDialog handleDelete={handleDelete} selectedRowParams={selectedRowParams} />
                        </Box>

                    </Stack>
                </Box>
            </GridToolbarContainer>
        );
    };




    const CustomFooter = () => {
        return (
            <GridFooterContainer sx={GridFooterContainerSx}>

                <Typography variant='subtitle2' sx={TypographyFooterSx}>
                    מס' תפקידים:
                </Typography>

                <Typography variant='subtitle2' sx={TypographyFooterSx}>
                    {rows.length}
                </Typography>

            </GridFooterContainer>
        );
    };

    const fetchAllRoles = async () => {
        const roles = await getAllRoles();
        setRows(roles.map((role, i) => ({ id: i, role_name: role._name, role_status: role._open })));
    }

    React.useEffect(() => {
        fetchAllRoles();
    }, []);


    const handleCloseSnackbar = () => setSnackbar(null);

    const columns: GridColDef[] = [
        {
            field: 'role_name',
            headerName: "שם התפקיד",
            headerAlign: 'left',

            sortable: true,
            editable: false,
            align: 'left',
            minWidth: 241,

        },
        {
            field: 'role_status',
            headerName: 'סטטוס',
            headerAlign: 'center',
            align: 'center',
            sortable: true,
            editable: false,

            renderCell: (role) => {
                return <Stack direction='row' padding={0}>
                    <ChangeStatusRoleDialog setSnackbar={setSnackbar} row={role.row} />



                </Stack >;
            },


        },
    ];


    const theme = useTheme();
    return (

        <>
            <DataGrid
                density='compact'
                sx={dataGridSx(theme)}
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                disableColumnMenu
                hideFooterSelectedRowCount
                hideFooterPagination
                localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
                slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: GridCustomToolbar, footer: CustomFooter }}
                onRowClick={handleRowClick}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                slotProps={{
                    toolbar: { selectedRowParams, setSelectedRowParams }
                    ,
                }}
                rowSelectionModel={rowSelectionModel}
            />
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </>
    );
}



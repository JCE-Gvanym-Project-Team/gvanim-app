import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Breakpoint, Container, Theme, createTheme, styled, useTheme } from '@mui/material';
import MyDropMenu from '../MyDropMenu/MyDropMenu';
import
{
    DataGrid, GridToolbarFilterButton,
    GridColDef, GridToolbarDensitySelector,
    GridValueGetterParams, GridToolbarColumnsButton,
    GridInitialState, GridToolbarExport,
    useGridRootProps, GridApi,
    useGridApiContext, GridKeyValue,
    GridToolbarContainer, heIL,
    GridFooterContainer, GridFooter
} from '@mui/x-data-grid';
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

        renderCell: (params) =>
        {
            const onClick = (e) =>
            {
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

const tableContainerStyle = {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    price: number,
)
{
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props: { row: ReturnType<typeof createData> })
{
    const { row } = props;
    const [open, setOpen] = React.useState(false);



    return (

        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right" component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography style={{ textAlign: 'right' }} variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">Customer</StyledTableCell>
                                        <StyledTableCell align="right">Amount</StyledTableCell>
                                        <StyledTableCell align="right">Total price ($)</StyledTableCell>
                                        <StyledTableCell align="right">Date</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>

                                            <TableCell align="right">{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                            <TableCell align='right' component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerdeeeeeebreadxdewdewdwe', 356, 16.0, 49, 3.9, 1.5),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];


function CustomFooter()
{

    const [dataSize, setDataSize] = React.useState(rows1.length);

    return (
        <GridFooterContainer>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography
                        variant='subtitle2'
                        color='rgb(62, 80, 96)'
                        fontWeight='500'
                        fontFamily='"IBM Plex Sans", -apple-system, BlinkMacSystemFont, 
        "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji",
         "Segoe UI Emoji", "Segoe UI Symbol"'
                    >
                        מס' משרות:
                    </Typography>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    <Typography
                        variant='subtitle2'
                        fontWeight='500'
                        marginLeft='8px'
                        color='rgb(62, 80, 96)'
                        fontFamily='"IBM Plex Sans", -apple-system, BlinkMacSystemFont, 
            "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji",
             "Segoe UI Emoji", "Segoe UI Symbol"'
                    >
                        {dataSize}
                    </Typography>
                </div>
            </div>


            {/* Add what you want here */}
            <GridFooter sx={{
                border: 'none', // To delete double border.
            }} />
        </GridFooterContainer>
    );
};


export default function MyTable(props: { TableWidth: any })
{
    const { TableWidth } = props;

    const theme = useTheme();
    return (

        <Container className="shadow-lg border rounded"
            sx={dataGridContainerStyle}
            style={dataGridContainerStyle}
            maxWidth={TableWidth as Breakpoint}>
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
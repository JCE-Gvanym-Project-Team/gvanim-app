import { Box, Button, Chip, LinearProgress, Stack, SxProps, Theme, Typography, alpha, styled, useTheme } from '@mui/material';
import
	{
		DataGrid,
		GridColDef,
		GridColumnHeaders,
		GridRow,
		GridToolbarColumnsButton,
		GridToolbarContainer,
		GridToolbarDensitySelector,
		GridToolbarFilterButton,
		GridToolbarQuickFilter,
		gridClasses,
		gridPageCountSelector,
		gridPageSelector,
		heIL,
		useGridApiContext,
		useGridSelector,
	} from '@mui/x-data-grid';
import * as React from 'react';
import MyDropMenu from '../MyDropMenu/MyDropMenu';

import { Lock, LockOpen } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { useNavigate } from "react-router-dom";
import MyLoading from '../../../../Components/MyLoading/MyLoading';
import { Job, getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/Job';
import CandidatesListFullScreenDialog from '../CandidatesListDialog/CandidatesListDialog';
import { MyButtonSx } from './MyTableStyle';



// -------------------Use Memorie for better performance----------------------------------------------------
const TraceUpdates = React.forwardRef<any, any>((props, ref) =>
{
	const { Component, ...other } = props;
	const rootRef = React.useRef<HTMLElement>();
	const handleRef = useForkRef(rootRef, ref);

	React.useEffect(() =>
	{
		const root = rootRef.current;
		root!.classList.add('updating');
		root!.classList.add('updated');

		const timer = setTimeout(() =>
		{
			root!.classList.remove('updating');
		}, 360);

		return () =>
		{
			clearTimeout(timer);
		};
	});

	return <Component ref={handleRef} {...other} />;
});

const RowWithTracer = React.forwardRef((props, ref) =>
{
	return <TraceUpdates ref={ref} Component={GridRow} {...props} />;
});

const ColumnHeadersWithTracer = React.forwardRef((props, ref) =>
{
	return <TraceUpdates ref={ref} Component={GridColumnHeaders} {...props} />;
});

const MemoizedRow = React.memo(RowWithTracer);
const MemoizedColumnHeaders = React.memo(ColumnHeadersWithTracer);

// ---------------------------------------------------------------------------------------------------------
const ODD_OPACITY = 0.2;
const MyDataGrid = (theme: Theme): SxProps => ({
	paddingTop: 1,
	height: '618px',
	borderTop: '1px solid rgba(0, 0, 0, 0.125)',
	borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
	borderRight: 'unset',
	borderLeft: 'unset',
	borderTopRightRadius: 0,
	borderTopLeftRadius: 0,
	overflow: 'hidden',
	"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
		outline: "none !important",

	},
	"&.MuiDataGrid-root .MuiDataGrid-row:focus-within": {
		background: alpha(
			theme.palette.primary.main,
			ODD_OPACITY + theme.palette.action.selectedOpacity,
		),
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
		borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
	},
	'& .MuiDataGrid-iconSeparator': {
		display: 'none',
	},
	'& .MuiDataGrid-columnHeader': {
		borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
	},
	'& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
		borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
		borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
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
		borderRadius: '35%',
	},
	[`& .${gridClasses.row}.even`]: {
		backgroundColor: theme.palette.grey[50],
		'&:hover, &.Mui-hovered': {
			backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
			'@media (hover: none)': {
				backgroundColor: 'transparent',
			},
		},
		'&.Mui-selected': {
			backgroundColor: alpha(
				theme.palette.primary.main,
				ODD_OPACITY + theme.palette.action.selectedOpacity,
			),
			'&:hover, &.Mui-hovered': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					ODD_OPACITY +
					theme.palette.action.selectedOpacity +
					theme.palette.action.hoverOpacity,
				),
				// Reset on touch devices, it doesn't add specificity
				'@media (hover: none)': {
					backgroundColor: alpha(
						theme.palette.primary.main,
						ODD_OPACITY + theme.palette.action.selectedOpacity,
					),
				},
			},
		},
	},

});

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

function CustomNoRowsOverlay()
{
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
			<Box sx={{ mt: 1 }}>אין משרות</Box>
		</StyledGridOverlay>
	);
}

const columns: GridColDef[] = [

	{
		field: 'options',
		headerName: '',
		width: 50,
		hideSortIcons: true,
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		disableExport: true,
		editable: false,
		align: 'center',

		renderCell: (job) => {
			return <MyDropMenu job={job?.row} />;
		},
	},

	{
		field: '_jobNumber',
		headerName: "מס' משרה",
		width: 110,
		headerAlign: 'center',
		align: 'center',
		// renderCell: (job) => { return <strong>{job?.row?._jobNumber}</strong> }
	},
	{
		field: '_status',
		headerName: 'סטטוס',
		description: 'סטטוס המשרה',
		sortable: false,
		editable: false,
		headerAlign: 'center',
		align: 'center',
		width: 120,
		renderCell: (job) => {
			const { _open } = job.row;
			return (
				<>
					{_open ?
						<Chip variant='outlined' sx={{ padding: 0.5 }} label={'פתוח'} color="success" icon={<LockOpen sx={{ fontSize: 'medium' }} />} />
						:
						<Chip variant='outlined' sx={{ padding: 0.8 }} label={'סגור'} color="error" icon={<Lock sx={{ fontSize: 'medium' }} />} />
					}
				</>);
		},
	},


	{
		field: '_region',
		headerName: 'איזור',
		width: 200,
		editable: false,
		headerAlign: 'center',
		align: 'center',


	},
	{
		field: '_role',
		headerName: 'תפקיד',
		width: 350,
		headerAlign: 'center',
		align: 'center',
	},
	{
		field: '_sector',
		headerName: 'אשכול',
		width: 250,
		headerAlign: 'center',
		align: 'center',
		renderCell: (job) => { return <>{job?.row?._sector}</> }
	},
	{
		field: '_scope',
		headerName: 'אחוז משרה',
		width: 150,
		headerAlign: 'center',
		align: 'center',
		renderCell: (job) => { return getScopeFormated(job?.row._scope); }

	},

	{
		field: 'candidates',
		headerName: 'מועמדים שניגשו',
		description: 'עמודה זו אינה ניתנת למיון',
		sortable: false,
		editable: false,
		headerAlign: 'center',
		align: 'center',
		width: 200,
		renderCell: (job) => {
			const { _jobNumber } = job.row;
			return <CandidatesListFullScreenDialog JobId={_jobNumber} />;
		},
	},
];

const GridCustomToolbar = () =>
{
	const navigate = useNavigate();

	const handleCreatejob = () =>
	{
		navigate("/management/createJob", { state: null });
	}

	return (
		<GridToolbarContainer>
			<Stack direction='row' sx={{ width: '100%' }}>
				<Box sx={{ width: '100%' }}>
					<GridToolbarQuickFilter variant='outlined' size='small' sx={{
						width: '100%',
						'& .muirtl-2ehmn7-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
							borderRadius: '0.75rem',
							border: '1px solid rgba(0, 0, 0, 0.23)',
						},
						'& .muirtl-ptiqhd-MuiSvgIcon-root': {
							color: 'rgba(0, 0, 0, 0.23)'
						},
					}} 
					/>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
					<Box>
						<Button onClick={handleCreatejob} disableRipple sx={MyButtonSx}>

							<Typography sx={{ font: '12px Roboto, Helvetica,Arial, sans-serif', margin: '0px 0px 2px 0px', fontWeight: 600 }}>משרה חדשה</Typography>
						</Button>

					</Box>
				</Box>

			</Stack>
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', borderBottomColor: 'rgba(224, 224, 224, 1)' }}>

				<Box>
					<GridToolbarFilterButton />
					<GridToolbarColumnsButton />
					<GridToolbarDensitySelector />
				</Box>

			</Box>
		</GridToolbarContainer>
	);
};

function getScopeFormated(scope: number[] | null)
{

	return scope === null ? '0-100' : scope[0].toString() === scope[1].toString() ? scope[0].toString() + '%' : scope[1].toString() + '% - ' + scope[0].toString() + '%';

}

const CustomPaginationAndFooter = () =>
{
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);
	const rowsCount = apiRef.current.getRowsCount();


	return (
		<Stack direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row-reverse', xl: 'row-reverse' }}
			justifyContent='space-between'
			alignItems='center'
			spacing={2}
			padding={1} >

			<Box >
				<Pagination
					color="primary"
					variant="outlined"
					shape="rounded"
					page={page + 1}
					count={pageCount}
					// @ts-expect-error
					renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
					onChange={(event: React.ChangeEvent<unknown>, value: number) =>
						apiRef.current.setPage(value - 1)
					}
				/>
			</Box>

			<Box>
				<Chip
					label={rowsCount + ' משרות'}
					sx={{ fontWeight: 'bold', borderRadius: '0.5rem', color: 'black' }}
					variant="outlined"
				/>
			</Box>
		</Stack>

	);
};


export default function MyTable() {
	const [pageloading, setPageLoading] = React.useState(true);
	const [dataloading, setDataLoading] = React.useState(true);
	const [rows, setRows] = React.useState<Job[]>([]);

	const navigate = useNavigate();

	const fetchAllJobs = async () =>
	{
		setDataLoading(true);

		setRows(await getFilteredJobs());

		setDataLoading(false);
	};

	React.useEffect(() =>
	{
		setPageLoading(false);
		fetchAllJobs();
	}, []);


	const theme = useTheme();

	return (
		<>
			{pageloading ? (<MyLoading loading={pageloading} setLoading={setPageLoading} />) : (
				<>

					<DataGrid
						getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
						autoPageSize

						sx={MyDataGrid(theme)}
						rows={rows}
						columns={columns}
						onRowDoubleClick={(job) => navigate(`/career/jobs/${job.id}`)}
						hideFooterSelectedRowCount
						rowCount={rows.length}

						getRowId={(row) => row._jobNumber}
						localeText={heIL.components.MuiDataGrid.defaultProps.localeText}

						loading={dataloading}
						slots={{
							noRowsOverlay: CustomNoRowsOverlay,
							toolbar: GridCustomToolbar,
							footer: CustomPaginationAndFooter,
							loadingOverlay: LinearProgress,
							row: MemoizedRow,
							columnHeaders: MemoizedColumnHeaders,
						}}
					/>


				</>
			)}
		</>

	);
}
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Container, Stack, styled, useTheme } from '@mui/material';
import MyDropMenu from '../MyDropMenu/MyDropMenu';
import
{
	DataGrid, GridToolbarFilterButton,
	GridColDef, GridToolbarDensitySelector,
	GridToolbarColumnsButton,
	GridInitialState,
	useGridRootProps,
	useGridApiContext,
	GridToolbarContainer, heIL, GridFooterContainer, GridToolbarQuickFilter, GridToolbarExportContainer, GridCsvExportMenuItem, GridPrintExportMenuItem
} from '@mui/x-data-grid';
import { GridFooterContainerSx, TypographyFooterSx, dataGridContainerStyle, dataGridSx } from './MyTableStyle';
import CandidatesListFullScreenDialog from '../CandidatesListDialog/CandidatesListDialog';
import { getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/Job';
import { useNavigate } from "react-router-dom";
import { ArticleOutlined } from '@mui/icons-material';




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
			const { id } = job.row;
			return <CandidatesListFullScreenDialog JobId={id} />;
        },
        // valueGetter: (params: GridValueGetterParams) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const GridCustomToolbar = ( {syncState }: {syncState: (stateToSave: GridInitialState) => void;}) => 
{
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
				<Box sx={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
					<Box>

						<Button type="button" endIcon={<ArticleOutlined />} onClick={handleCreatejob} variant='contained' sx={{
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

					<GridToolbarExportContainer >
						<GridPrintExportMenuItem options={{ hideFooter: true, hideToolbar: true }} />
					</GridToolbarExportContainer>

				</Box>
				{/* 
                <Box>
                    <Button color='info' variant='contained' size='small' onClick={handleCreatejob}>משרה חדשה</Button>
                </Box> */}




			</Box>
		</GridToolbarContainer>
	);
};

function getScopeFormated(scope: number[] | null)
{

	return scope === null ? '0-100' : scope[0].toString() === scope[1].toString() ? scope[0].toString() + '%' : scope[1].toString() + '% - ' + scope[0].toString() + '%';

}

export default function MyTable(props: { setDataSize: any }) {
    const { setDataSize } = props;
    const [allJobs, setAllJobs] = React.useState<any[]>([]);
	const navigate = useNavigate();

    const fetchAllJobs = async () => {
        const jobs = await getFilteredJobs();
        const jobsWithId = jobs.map((job) => ({ ...job, id: job._jobNumber, _scope: getScopeFormated(job._scope) }));
        setAllJobs(jobsWithId);

    };


    const CustomFooter = () => {
		React.useEffect(() => {
			setDataSize(allJobs.length);
		}, []);
        
    
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
					onRowDoubleClick={(job) => navigate(`../jobs/${job.id}`)}

					// checkboxSelection
					// disableRowSelectionOnClick
					// disableColumnMenu
					hideFooterSelectedRowCount
					hideFooterPagination
					// hideFooter
					localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
					slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: GridCustomToolbar, footer: CustomFooter }} />

			</Container></>
	);
}
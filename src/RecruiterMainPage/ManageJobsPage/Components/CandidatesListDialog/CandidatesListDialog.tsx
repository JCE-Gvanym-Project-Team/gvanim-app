import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Avatar, Box, Container, Link, ListItemAvatar, ListItemButton, ListItemIcon, Rating } from '@mui/material';
import { ListItemTypographySx } from './CandidatesListDialogStyle';
import { ChevronLeft, ConstructionOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Candidate, getFilteredCandidates } from '../../../../Firebase/FirebaseFunctions/Candidate';
import { getFilteredCandidateJobStatuses } from '../../../../Firebase/FirebaseFunctions/CandidateJobStatus';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
)
{
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function CandidatesListFullScreenDialog({ JobId })
{
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [CMR, setCMR] = React.useState<any[]>([]);

	const getCandidates = async () =>
	{
		const _candidates_jobstatus = await getFilteredCandidateJobStatuses(["jobNumber"], [`${JobId}`]);

		const promises = _candidates_jobstatus.map(async (candidateJobStatus) =>
		{
			const candidate1: Candidate[] = await getFilteredCandidates(["id"], [candidateJobStatus._candidateId]);
			return [candidate1, candidateJobStatus._matchingRate];
		});

		const results = await Promise.all(promises);
		// TODO: FIX THIS
		setCMR(results);
	}

	React.useEffect(() =>
	{

	}, JobId)

	const handleClickOpen = () =>
	{
		getCandidates();
		setOpen(true);
	};

	const handleClose = () =>
	{
		setOpen(false);
	};

	const listOfCandidates = ["candidate1", "candidate2"];
	return (
		<Box>

			<Button variant='text' endIcon={<ChevronLeft />} onClick={handleClickOpen} >לרשימת המועמדים</Button>


			<Dialog
				sx={{
					"& .MuiDialog-container": {

					}
				}}
				PaperProps={{
					sx: {
						maxWidth: { xs: 'xl', sm: 'xl', md: 'md', lg: 'md', xl: 'md' }, maxHeight: '80%',
						borderRadius: '0.6rem'
					}
				}}
				fullScreen
				open={open}
				TransitionComponent={Transition}

			>

				<AppBar sx={{ position: 'relative', backgroundColor: 'rgb(52, 71, 103)' }} >
					<Toolbar>

						<Typography sx={{ ml: 2, flex: 1, textAlign: 'center' }} variant="h6" component="div">
							משרה מס' {JobId}
						</Typography>

						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>

				<List>
					{/* this is the header */}
					<ListItem>
						<ListItemText sx={{ paddingRight: '16px', paddingLeft: '16px' }} >
							<Typography sx={ListItemTypographySx} variant='subtitle1'>
								שם המועמד
							</Typography>
						</ListItemText>

						<ListItemIcon>
							<ListItemText sx={{ paddingRight: '16px', paddingLeft: '16px' }} >
								<Typography sx={ListItemTypographySx} variant='subtitle1'>
									התאמה
								</Typography>
							</ListItemText>
						</ListItemIcon>
					</ListItem>
					{/* END HEADER */}
					<Divider />

					<ListItemButton accessKey='ID עומר' onClick={(e) =>
					{
						navigate("/manageCandidates", { state: listOfCandidates[0] })
					}}>

						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>


						<ListItemText primary="עומר תורג'מן" secondary="מעלה אדומים" />

						<ListItemIcon >
							<Rating defaultValue={2} size="medium" readOnly />
						</ListItemIcon>

					</ListItemButton>

					<Divider />

				</List>

			</Dialog>

		</Box>
	);
}
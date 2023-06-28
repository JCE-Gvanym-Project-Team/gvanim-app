import { ChevronLeft } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, ListItemAvatar, ListItemButton, ListItemIcon, Rating } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Candidate, getFilteredCandidates } from '../../../../Firebase/FirebaseFunctions/Candidate';
import { getFilteredCandidateJobStatuses } from '../../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { ListItemTypographySx } from './CandidatesListDialogStyle';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function CandidatesListFullScreenDialog({ JobId }) {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [CMR, setCMR] = React.useState<any[]>([]);

	const getCandidates = async () => {
		const _candidates_jobstatus = await getFilteredCandidateJobStatuses(["jobNumber"], [`${JobId}`]);

		const promises = _candidates_jobstatus.map(async (candidateJobStatus) => {
			const candidate1: Candidate[] = await getFilteredCandidates(["id"], [candidateJobStatus?._candidateId]);
			return [candidate1[0], candidateJobStatus._matchingRate];
		});

		const results = await Promise.all(promises);

		setCMR(results);
	}

	React.useEffect(() => {
		getCandidates();
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box>
			
			<Button variant='text' disableRipple style={{backgroundColor: 'transparent'}} endIcon={<ChevronLeft />} onClick={handleClickOpen} >לרשימת המועמדים</Button>


			<Dialog
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


					{CMR.map(((cmr) => (
						<React.Fragment key={cmr[0]?._id}>
							<ListItemButton onClick={() => {
								navigate("/management/manageCandidates/" + cmr[0]?._id, { state: cmr[0]?._id })
							}}>

								<ListItemAvatar>
									<Avatar />
								</ListItemAvatar>

								<ListItemText primary={cmr[0]?._firstName + ' ' + cmr[0]?._lastName} secondary={cmr[0]?._eMail} />

								{cmr[1] < 0 ? (
									<>
										<ListItemIcon sx={{ paddingRight: '16px', paddingLeft: '16px' }} >
											<Typography >לא צויין</Typography>
										</ListItemIcon>
									</>) :
									(
										<>
											<ListItemIcon>
												<Rating defaultValue={cmr[1]} size="medium" readOnly />
											</ListItemIcon>
										</>)}


							</ListItemButton>

							<Divider />
						</React.Fragment>

					)))}

				</List>

				{CMR.length < 1 ? (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'rgb(52, 71, 103)' }} variant='h6'>לא נמצאו מועמדים למשרה זו.</Typography>
					</Box>
				) : (<></>)}

			</Dialog>

		</Box>
	);
}
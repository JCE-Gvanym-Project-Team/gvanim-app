import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Button, Chip, Divider, Stack, TextField, Typography } from '@mui/material';
import { EditNote, GroupAdd } from '@mui/icons-material';
import { MyFieldsSx } from './RecruiterDialogStyle';
import Tooltip from '@mui/material/Tooltip';
import RemoveConfirmPopup from './Components/RemoveConfirmPopup/RemoveConfirmPopup';
import { Recruiter } from '../../../../../../../../../../../Firebase/FirebaseFunctions/Recruiter';
import SectorsChip from './Components/SectorsChip/SectorsChip/SectorsChip';
import { getAllSectors } from '../../../../../../../../../../../Firebase/FirebaseFunctions/Sector';
import { Sector } from '../../../../../../../../../../../Firebase/FirebaseFunctions/Sector'


const recruiter_sectors = [
	"אשכול 4",
	"אשכול 3",
	"אשכול 2",
	"אשכול 1"
];

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecruiterDialog(props: { recruiterRow: any, recruiters: any, setRecruiters: any, setSnackbar: any, isEdit: boolean }): JSX.Element {
	const { recruiterRow, recruiters, setRecruiters, setSnackbar, isEdit } = props;
	const [recruiterSectors, setRecruiterSectors] = React.useState<string[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [saveButton, setSaveButton] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const fetchData = async () => {
			const sectors = await getAllSectors();
			const sectorStrings = sectors.map((sector: Sector) => sector._name.toString());
			setRecruiterSectors(sectorStrings);
			setLoading(false);
			if (isEdit) {
				typeof recruiterRow?._firstName === 'string' && setFirstName(recruiterRow?._firstName);
				typeof recruiterRow?._lastName === 'string' && setLastName(recruiterRow?._lastName);
				typeof recruiterRow?._email === 'string' && setEmail(recruiterRow?._email);
				recruiterRow?._sectors !== null && setRecruiterSectors(recruiterRow?._sectors);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	// React.useEffect(() => {
	// 	if (isEdit) {
	// 		typeof recruiterRow?._firstName === 'string' && setFirstName(recruiterRow?._firstName);
	// 		typeof recruiterRow?._lastName === 'string' && setLastName(recruiterRow?._lastName);
	// 		typeof recruiterRow?._email === 'string' && setEmail(recruiterRow?._email);
	// 		recruiterRow?._sectors !== null && setRecruiterSectors(recruiterRow?._sectors);
	// 	}
	// }, []);


	const handleRemoveRecruiter = () => {
		// recruiterRow?.remove();
		// const updateData = recruitersList.filter(rec => rec._id !== recruiter._id);
		// setRecruitersList(updateData);
		// setOpen(false);

		// setMessage(`המגייס/ת ${recruiter._firstName} ${recruiter._lastName} נמחק/ה בהצלחה מהמערכת.`);
		// setOpenSnackBar(true);


	}
	const handleSubmit = () => {
		// recruiter.edit(email, firstName, lastName);  // one more argument is needed (Sectors)
		// setOpen(false);
		alert("need to implement");
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	return (
		<Box>

			{/* <ListItemIcon>
				<IconButton onClick={handleClickOpen}>
				<EditNote sx={{ color: 'rgb(52, 71, 103)' }} />
				</IconButton>
				
			</ListItemIcon> */}
			<Tooltip title={isEdit ? 'ערוך מגייס' : 'מגייס חדש'}>
				<IconButton onClick={handleClickOpen}>
					{isEdit ? <EditNote /> : <GroupAdd />}
				</IconButton>
			</Tooltip>

			<Dialog
				PaperProps={{
					sx: {
						maxWidth: { xs: 'xl', sm: 'xl', md: 'md', lg: 'md', xl: 'md' }, maxHeight: { xs: '100%', sm: '90%' },
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
							{isEdit ? recruiterRow?._firstName + ' ' + recruiterRow?._lastName : 'מגייס חדש'}
						</Typography>

						<Box>
							<IconButton
								edge="start"
								color="inherit"
								onClick={handleClose}
								aria-label="close"
							>
								<CloseIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>


				<Stack spacing={3} sx={{ height: '100%', padding: { xs: 1, sm: 4 } }}>

					<Stack spacing={2}>

						<Stack direction="row" display="flex" justifyContent="center">

							<Stack direction='column' sx={MyFieldsSx}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
									<Stack spacing={2.5} sx={{ width: '100%' }}>
										<Box sx={{ display: 'flex', justifyContent: 'center' }}>
											<TextField
												sx={{ width: '100%' }}
												type='text'
												variant='outlined'
												size='small'
												required
												label="שם פרטי"
												value={firstName}
												onChange={(e) => { setFirstName(e.target.value); setSaveButton(true); }}
											/>
										</Box>

										<Box sx={{ display: 'flex', justifyContent: 'center' }}>
											<TextField
												sx={{ width: '100%' }}
												type='text'
												variant='outlined'
												size='small'
												required
												label="שם משפחה"
												value={lastName}
												onChange={(e) => { setLastName(e.target.value); setSaveButton(true); }}
											/>
										</Box>

										<Box sx={{ display: 'flex', justifyContent: 'center' }}>

											<TextField
												sx={{ width: '100%' }}

												type='email'
												variant='outlined'
												size='small'
												required
												label="אימייל"
												value={email}
												onChange={(e) => { setEmail(e.target.value); setSaveButton(true); }}
											/>
										</Box>

										<Box sx={{ display: 'flex', justifyContent: 'center' }}>
											<SectorsChip recruiterSectors={recruiterSectors} setRecruiterSectors={setRecruiterSectors} setSaveButton={setSaveButton} />
										</Box>
									</Stack>
								</Box>
								<Divider sx={{ mt: 3 }} />
								{/* <Box sx={{
									mt: 1,
									flexWrap: 'wrap',
									gap: 1,
									padding: 2,
									height: 'fit-content',
									display: 'flex',
								}}>
									{recruiterSectors.map((value) => (
										<Chip color='primary' onDelete={() => { setRecruiterSectors(recruiterSectors.filter((sector) => sector !== value)) }} key={value} label={value} />
									))}
								</Box> */}

							</Stack>


						</Stack>

					</Stack>




				</Stack>
				<Divider />
				<Stack spacing={1} direction='row' sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
					{isEdit && (<Box>
						<RemoveConfirmPopup handleRemoveRecruiter={handleRemoveRecruiter} />
					</Box>)}

					<Button disabled={!saveButton} onClick={handleSubmit} variant='contained' color='primary'>
						{isEdit ? 'שמור שינויים' : 'הוסף מגייס'}
					</Button>


				</Stack>

			</Dialog>

		</Box>
	);

}



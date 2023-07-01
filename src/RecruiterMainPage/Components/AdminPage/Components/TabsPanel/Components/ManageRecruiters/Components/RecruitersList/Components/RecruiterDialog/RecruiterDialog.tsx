import { Alarm, EditNote, GroupAdd, Password } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, Chip, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, ListItemIcon, Snackbar, Stack, TextField, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import validator from 'validator';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { Recruiter, getRecruitersFromDatabase } from '../../../../../../../../../../../Firebase/FirebaseFunctions/Recruiter';
import { Sector, getAllSectors } from '../../../../../../../../../../../Firebase/FirebaseFunctions/Sector';
import RemoveConfirmPopup from './Components/RemoveConfirmPopup/RemoveConfirmPopup';
import SectorsChip from './Components/SectorsChip/SectorsChip/SectorsChip';
import { MyFieldsSx } from './RecruiterDialogStyle';


const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function RecruiterDialog(props: { recruiterRow: Recruiter, recruiters: any, setRecruiters: any, setSnackbar: any, isEdit: boolean }): JSX.Element {
	const { recruiterRow, recruiters, setRecruiters, setSnackbar, isEdit } = props;
	const [recruiter, setRecruiter] = React.useState<Recruiter>();
	const [allSectors, setAllSectors] = React.useState<string[]>([]);
	const [sectorsSelection, setSectorsSelection] = React.useState<string[]>([]);
	const [recruiterCurentSectors, setRecruiterCurentSectors] = React.useState<string[]>([]);
	const [listToShow, setListToShow] = React.useState<string[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [firstNameError, setFirstNameError] = React.useState('');
	const [lastNameError, setLastNameError] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [saveButton, setSaveButton] = React.useState(false);
	const [openWindows, setOpenWindows] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [dialogEmail, setDialogEmail] = React.useState('');
	const [dialogPassword, setDialogPassword] = React.useState('');
	const [sectorsChanged, setSectorsChanged] = React.useState(false);

	// const [time, setTime] = React.useState(20);

	// React.useEffect(() => {
	// let timer;

	// if (dialogOpen) {
	// timer = setInterval(() => {
	// setTime((prevTime) => prevTime - 1);
	// }, 1000);
	// }

	// return () => {
	// clearInterval(timer);
	// };
	// }, [dialogOpen]);

	React.useEffect(() => {
		const fetchData = async () => {
			const sectors = await getAllSectors();
			const sectorStrings = sectors.map((sector: Sector) => sector._name.toString());
			setAllSectors(sectorStrings);
			setLoading(false);
			await sleep(1000);
			try {
				let recruiters = await getRecruitersFromDatabase();
				const recruiterCurrent = recruiters.filter((recruiter) => recruiter._email === recruiterRow?._email);
				setRecruiter(recruiterCurrent[0]);
			} catch (error) {
				return;
			}


			if (isEdit) {
				setFirstName(recruiterRow?._firstName);
				setLastName(recruiterRow?._lastName);
				setEmail(recruiterRow?._email);
				setRecruiterCurentSectors(recruiterRow?._sectors);
				setListToShow(recruiterRow?._sectors);
			}
		};

		fetchData();
		setSectorsChanged(false);


	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}


	const handleRemoveRecruiter = async () => {
		recruiter?.remove();
		setOpenWindows(false);
		postMessage(`המגייס/ת ${recruiterRow._firstName} ${recruiterRow._lastName} נמחק/ה בהצלחה מהמערכת.`);
		setSnackbar(true);

	}

	const handleSubmit = async () => {

		if (firstName.trim() === '') {
			setFirstNameError('שדה זה הוא חובה');
			return;
		}

		if (lastName.trim() === '') {
			setLastNameError('שדה זה הוא חובה');
			return;
		}

		if (email.trim() === '') {
			setEmailError('שדה זה הוא חובה');
			return;
		}

		const validEmail = isValidEmail(email);
		if (!validEmail) {
			alert('יש להזין כתובת תקינה');
			setEmail('');
			return;
		}

		if (!isEdit) {
			const newRecruter = new Recruiter(email, firstName, lastName, listToShow);
			let isRecruterExsit = (await newRecruter.getPath()).length;
			if (isRecruterExsit > 0) {
				alert('האימייל כבר קיים במערכת!');
				setEmail('');
				return;
			}
			let firstPassword: string = generateCodeFromEmail(email);
			setDialogPassword(firstPassword);
			setDialogEmail(email);
			setDialogOpen(true);
			setRecruiter(newRecruter);
		}
		else {
			if (recruiter !== undefined) {
				await recruiter.edit(firstName, lastName);
				await updateSectors(recruiter, setSectorsChanged, listToShow, recruiterCurentSectors, setSaveButton);
				setOpenWindows(false);
				setFirstName('')
				setLastName('');
				setEmail('');
			}
		}
	};


	const handleClickOpen = () => {
		setOpenWindows(true);
	};

	const handleClose = () => {
		setOpenWindows(false);
	};

	const handleDialogClose = async () => {
		if (recruiter !== undefined)
			await recruiter.add(dialogPassword);
		setFirstName('')
		setLastName('');
		setEmail('');
		setDialogOpen(false);
		setOpenWindows(false);
	};


	return (
		<Box>
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle>מגייס/ת חדש/ה הצטרפ/ה למערכת</DialogTitle>
				<DialogContent>
					<DialogContentText>
						מייל: {email}
						<br />
						סיסמא זמנית: {dialogPassword}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>סגור</Button>
				</DialogActions>
			</Dialog>

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
				open={openWindows}
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
												onChange={
													(e) => {
														const isHebrewInput = /^[א-ת\s]+$/u.test(e.target.value);
														if (!isHebrewInput && e.target.value.length > 0) {
															setFirstName('');
															alert('יש להקליד בעברית בלבד');
															return;
														}
														setFirstName(e.target.value); setSaveButton(true);
														setFirstNameError('');
													}
												}
												error={firstNameError !== ''}
												helperText={firstNameError}
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
												onChange={
													(e) => {
														const isHebrewInput = /^[א-ת\s]+$/u.test(e.target.value);
														if (!isHebrewInput && e.target.value.length > 0) {
															setLastName('');
															alert('יש להקליד בעברית בלבד');
															return;
														}
														setLastName(e.target.value); setSaveButton(true);
														setLastNameError('');
													}}
												error={lastNameError !== ''}
												helperText={lastNameError}
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
												onChange={(e) => {
													setEmail(e.target.value);
													setSaveButton(true);
													setEmailError('');
												}}
												disabled={isEdit} 
												error={emailError !== ''}
												helperText={emailError}
											/>
										</Box>

										{/* Sectors */}
										<Box sx={{ justifyContent: 'center' }}>
											<SectorsChip
												allSectors={allSectors}
												setListToShow={setListToShow}
												listToShow={listToShow}
												setSaveButton={setSaveButton}
											/>
										</Box>
									</Stack>
								</Box>

								<Divider sx={{ mt: 3 }} />
								<Box sx={{
									mt: 1,
									flexWrap: 'wrap',
									gap: 1,
									padding: 2,
									height: 'fit-content',
									display: 'flex',
								}}>
									{listToShow.map((value) => (
										<Chip color='primary' onDelete={() => { setListToShow(listToShow.filter((sector) => sector !== value)); setSaveButton(true); }} key={value} label={value} />
									))

									}
								</Box>
							</Stack>
						</Stack>
					</Stack>

				</Stack>
				<Divider />
				<Stack spacing={1} direction='row' sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
					{isEdit && (
						<Box>
							<RemoveConfirmPopup handleRemoveRecruiter={handleRemoveRecruiter} />
						</Box>)
					}

					<Button disabled={!saveButton} onClick={handleSubmit} variant='contained' color='primary'>

						{isEdit ? 'שמור שינויים' : 'הוסף מגייס'}
					</Button>


				</Stack>

			</Dialog>
		</Box>
	);

}




function generateCodeFromEmail(email: string) {

	const atIndex = email.indexOf('@');

	if (atIndex === -1) {
		throw new Error('Invalid email format');
	}

	const username = email.substring(0, atIndex);
	const usernameSubstring = username.substring(0, Math.min(4, username.length));

	let code: string = usernameSubstring;

	while (code.length < 6) {
		code += Math.floor(Math.random() * 10) + "";
	}

	return code;
}

async function updateSectors(recruiter: Recruiter, setSectorsChanged: (value: boolean) => void, listToShow: string[], recruiterCurentSectors: string[], setSaveButton: (value: boolean) => void) {
	for (let i = 0; i < listToShow.length; i++) {
		if (recruiterCurentSectors.indexOf(listToShow[i]) === -1) {
			await recruiter.addSector(listToShow[i]);
		}
	}
	await sleep(1000);

	for (let i = 0; i < recruiterCurentSectors.length; i++) {
		if (listToShow.indexOf(recruiterCurentSectors[i]) === -1) {
			await recruiter.removeSector(recruiterCurentSectors[i]);
		}
	}
	setSaveButton(true);
	setSectorsChanged(true);
}



function isValidEmail(email) {
	return validator.isEmail(email);
}
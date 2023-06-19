import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Button, Chip, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack, TextField, Typography } from '@mui/material';
import { EditNote, GroupAdd } from '@mui/icons-material';
import { MyFieldsSx } from './RecruiterDialogStyle';
import Tooltip from '@mui/material/Tooltip';
import RemoveConfirmPopup from './Components/RemoveConfirmPopup/RemoveConfirmPopup';
import { Recruiter, getRecruitersFromDatabase } from '../../../../../../../../../../../Firebase/FirebaseFunctions/Recruiter';
import SectorsChip from './Components/SectorsChip/SectorsChip/SectorsChip';
import { getAllSectors } from '../../../../../../../../../../../Firebase/FirebaseFunctions/Sector';
import { Sector } from '../../../../../../../../../../../Firebase/FirebaseFunctions/Sector'



const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecruiterDialog(props: { recruiterRow: Recruiter, recruiters: any, setRecruiters: any, setSnackbar: any, isEdit: boolean }): JSX.Element {
	const { recruiterRow, recruiters, setRecruiters, setSnackbar, isEdit } = props;
	const [recruiter, setRecruiter] = React.useState<Recruiter>();
	const [allSectors, setAllSectors] = React.useState<string[]>([]);
	const [sectorsSelection, setSectorsSelection] = React.useState<string[]>([]);
	const [recruiterCurentSectors, setRecruiterCurentSectors] = React.useState<string[]>([]);
	const [listToDel, setListToDel] = React.useState<string[]>([]);
	const [listToAdd, setListToAdd] = React.useState<string[]>([]);

	const [listToShow, setListToShow] = React.useState<string[]>([]);


	const [loading, setLoading] = React.useState(true);
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [firstNameError, setFirstNameError] = React.useState('');
	const [lastNameError, setLastNameError] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [saveButton, setSaveButton] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [dialogEmail, setDialogEmail] = React.useState('');
	const [dialogPassword, setDialogPassword] = React.useState('');
	const [sectorsChanged, setSectorsChanged] = React.useState(false);

	const rew = new Recruiter();

	// 
	// React.useEffect(() => {
	// console.log(sectorsSelection);
	// }, [sectorsSelection])


	React.useEffect(() => {
		const fetchData = async () => {
			const sectors = await getAllSectors();
			const sectorStrings = sectors.map((sector: Sector) => sector._name.toString());
			setAllSectors(sectorStrings);
			setLoading(false);
			const recruiters = await getRecruitersFromDatabase();
			const recruiterCurrent = recruiters.filter((recruiter) => recruiter._email === recruiterRow?._email);
			setRecruiter(recruiterCurrent[0]);

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


	}, [sectorsChanged]);

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


	const handleRemoveRecruiter = async () => {
		// const recruiters = await getRecruitersFromDatabase();
		// const recruiterToRemove = recruiters.filter((recruiter) => recruiter._email === recruiterRow?._email)!;
		// recruiterToRemove[0]?.remove();
		recruiter?.remove();
		// await recruiterRow?.remove();
		// const updateData = recruiters.filter(rec => rec._id !== recruiterRow._id);
		// setRecruiters(updateData);
		setOpen(false);

		// postMessage(`המגייס/ת ${recruiterRow._firstName} ${recruiterRow._lastName} נמחק/ה בהצלחה מהמערכת.`);
		// setSnackbar(true);

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
		const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
		if (!isValidEmail) {
			alert('יש להזין כתובת תקינה');
			setEmail('');
			return;
		}
		if (!isEdit) {
			const newRecruter = new Recruiter(email, firstName, lastName, sectorsSelection);
			let firstPassword = generateCodeFromEmail(email);
			firstPassword = "aviv11"
			console.log(firstPassword);
			await newRecruter.add(firstPassword);
			setDialogOpen(true);
			setDialogEmail(email);
			setDialogPassword(firstPassword);
			// updateSectors(sectorsSelection,);
		}
		else {
			if (recruiter !== undefined) {
				await recruiter.edit(firstName, lastName);
				await updateSectors(recruiter, setSectorsChanged, listToShow, recruiterCurentSectors, setSaveButton);
			}
			setOpen(false);
		}
		setFirstName('')
		setLastName('');
		setEmail('');
	};


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
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
												onChange={
													(e) => {
														setEmail(e.target.value);
														setSaveButton(true);
														setEmailError('');
													}
												}
												error={emailError !== ''}
												helperText={emailError}
											/>

										</Box>
										{/* Sectors */}
										<Box sx={{ justifyContent: 'center' }}>
											<SectorsChip
												allSectors={allSectors}
												setSectorsSelection={setSectorsSelection}
												sectorsSelection={sectorsSelection}
												recruiterCurentSectors={recruiterCurentSectors}
												setSaveButton={setSaveButton}
												isEdit={isEdit}
												setListToDel={setListToDel}
												listToDel={listToDel}
												setListToAdd={setListToAdd}
												listToAdd={listToAdd}
												setListToShow={setListToShow}
												listToShow={listToShow}
											/>
										</Box>
									</Stack>
								</Box>
								<Dialog open={dialogOpen} onClose={handleDialogClose}>
									<DialogTitle>מגייס/ת חדש/ה הצטרפ/ה למערכת</DialogTitle>
									<DialogContent>
										<DialogContentText>
											מייל: {dialogEmail}
											<br />
											סיסמא זמנית: {dialogPassword}
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleDialogClose}>סגור</Button>
									</DialogActions>
								</Dialog>
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
			{/* <Button onClick={() => { test() }}></Button> */}
		</Box>
	);

}




function generateCodeFromEmail(email) {
	const atIndex = email.indexOf('@');

	if (atIndex === -1) {
		throw new Error('Invalid email format');
	}

	const username = email.substring(0, atIndex);
	const usernameSubstring = username.substring(0, Math.min(4, username.length));

	let code = usernameSubstring;

	while (code.length < 6) {
		code += Math.floor(Math.random() * 10);
	}

	return code;
}


//
// async function test() {
// const recruiter = new Recruiter("112123@gmail.com", "ראובן", "לוי", ['אשכול 10']);
// await recruiter.add();
// recruiter.edit("ירון", "לוי");
// const reqs = await getRecruitersFromDatabase();
// console.log(reqs);
// }


async function updateSectors(recruiter: Recruiter, setSectorsChanged: (value: boolean) => void, newList: string[], listCurrent: string[], setSaveButton: (value: boolean) => void) {

	for (let i = 0; i < newList.length; i++) {
		if (listCurrent.indexOf(newList[i]) === -1) {
			await recruiter.addSector(newList[i]);
		}
	}

	// for (let i = 0; i < listCurrent.length; i++)
	// if (newList.indexOf(listCurrent[i]) === -1)
	// await recruiter.removeSector(listCurrent[i]);

	console.log("to show: " + listCurrent);
	console.log("current: " + newList);
	setSaveButton(true);
	setSectorsChanged(true);
}
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Button, Chip, Divider, ListItemIcon, Stack, TextField, Typography } from '@mui/material';
import { EditNote } from '@mui/icons-material';
import { MyFieldsSx } from './RecruiterDialogStyle';

import RemoveConfirmPopup from './Components/RemoveConfirmPopup/RemoveConfirmPopup';
import { Recruiter } from '../../../../../../../../../../../Firebase/FirebaseFunctions/Recruiter';
import SectorsChip from './Components/SectorsChip/SectorsChip/SectorsChip';



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

export default function RecruiterDialog(props: { recruitersList: Recruiter[], setRecruitersList: any, recruiter: Recruiter, setOpenSnackBar: any, setMessage: any }) {
	const { recruitersList, setRecruitersList, recruiter, setOpenSnackBar, setMessage } = props;

	const [recruiterSectors, setRecruiterSectors] = React.useState<string[]>(recruiter._sectors);

	const [firstName, setFirstName] = React.useState(recruiter._firstName);
	const [lastName, setLastName] = React.useState(recruiter._lastName);
	const [email, setEmail] = React.useState(recruiter._email);


	const [saveButton, setSaveButton] = React.useState(false);

	const [open, setOpen] = React.useState(false);



	const handleRemoveRecruiter = () => {
		recruiter.remove();
		const updateData = recruitersList.filter(rec => rec._id !== recruiter._id);
		setRecruitersList(updateData);
		setOpen(false);

		setMessage(`המגייס/ת ${recruiter._firstName} ${recruiter._lastName} נמחק/ה בהצלחה מהמערכת.`);
		setOpenSnackBar(true);


	}
	const handleSave = () => {
		recruiter.edit(email, firstName, lastName);  // one more argument is needed (Sectors)
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box>

			<ListItemIcon>
				<IconButton onClick={handleClickOpen}>
					<EditNote sx={{ color: 'rgb(52, 71, 103)' }} />
				</IconButton>

			</ListItemIcon>

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
							{recruiter._firstName + ' ' + recruiter._lastName}
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
													onChange={(e) => {setFirstName(e.target.value); setSaveButton(true);}}
												/>
											</Box>

											<Box  sx={{ display: 'flex', justifyContent: 'center' }}>
												<TextField
													sx={{ width: '100%' }}
													type='text'
													variant='outlined'
													size='small'
													required
													label="שם משפחה"
													value={lastName}
													onChange={(e) =>{ setLastName(e.target.value); setSaveButton(true);}}
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
													onChange={(e) => {setEmail(e.target.value); setSaveButton(true);}}
												/>
											</Box>

											<Box sx={{ display: 'flex', justifyContent: 'center' }}>
												<SectorsChip recruiterSectors={recruiterSectors} setRecruiterSectors={setRecruiterSectors} setSaveButton={setSaveButton} />
											</Box>
										</Stack>
									</Box>
								<Divider sx={{mt: 3}} />
									<Box sx={{
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
									</Box>

								</Stack>
							

						</Stack>

					</Stack>




				</Stack>
				<Divider />
				<Stack spacing={1} direction='row' sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
					<Box>
						<RemoveConfirmPopup handleRemoveRecruiter={handleRemoveRecruiter} />
					</Box>

					<Button disabled={!saveButton} onClick={handleSave} variant='contained' color='primary'>
						שמור שינויים
					</Button>


				</Stack>

			</Dialog>

		</Box>
	);
}
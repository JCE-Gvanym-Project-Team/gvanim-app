import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Button, Chip, Divider, ListItemIcon, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Save, Edit, EditNote } from '@mui/icons-material';
import SectorChip from '../../SectorChip/SectorChip';
import { MyFieldsSx } from './RecruiterDialogStyle';
import ClickAwayListener from '@mui/base/ClickAwayListener';


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

export default function RecruiterDialog() {
	const [recruiterSectors, setRecruiterSectors] = React.useState<string[]>(recruiter_sectors);
	const [editSectors, setEditSectors] = React.useState(false);  // of sector chip
	const [editFirstName, setEditFirstName] = React.useState(false);
	const [editLastName, setEditLastName] = React.useState(false);
	const [editEmail, setEditEmail] = React.useState(false);

	const [open, setOpen] = React.useState(false);

	const handleClickAway = () => {
		setEditSectors(false);
		setEditFirstName(false);
		setEditLastName(false);
		setEditEmail(false);
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
						maxWidth: { xs: 'xl', sm: 'xl', md: 'md', lg: 'md', xl: 'md' }, maxHeight: '90%',
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
							משרה מס'
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


				<Stack spacing={3} sx={{ height: '100%', padding: 4 }}>

					<Stack spacing={2}>

						<Stack direction="row" display="flex" justifyContent="center">
							<ClickAwayListener onClickAway={handleClickAway}>
								<Stack direction='column' sx={MyFieldsSx}>
									<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
										<Stack spacing={2} sx={{ width: 'fit-content' }}>
											<Box>
												<IconButton sx={{ mr: 1 }} onClick={() => setEditFirstName(!editFirstName)}>
													{editFirstName ? <Save sx={{ color: 'rgb(52, 71, 103)' }} /> : <Edit sx={{ color: 'rgb(52, 71, 103)' }} />}
												</IconButton>
												<TextField
													disabled={!editFirstName}
													type='text'
													size='small'
													variant='standard'
													required
													label="שם פרטי"
													defaultValue="עומר"
												/>
											</Box>

											<Box>
												<IconButton sx={{ mr: 1 }} onClick={() => setEditLastName(!editLastName)}>
													{editLastName ? <Save sx={{ color: 'rgb(52, 71, 103)' }} /> : <Edit sx={{ color: 'rgb(52, 71, 103)' }} />}
												</IconButton>
												<TextField
													disabled={!editLastName}
													size='small'
													type='text'
													variant='standard'
													required
													label="שם משפחה"
													defaultValue="תורג'מן"
												/>
											</Box>

											<Box>
												<IconButton sx={{ mr: 1 }} onClick={() => setEditEmail(!editEmail)}>
													{editEmail ? <Save sx={{ color: 'rgb(52, 71, 103)' }} /> : <Edit sx={{ color: 'rgb(52, 71, 103)' }} />}
												</IconButton>

												<TextField
													disabled={!editEmail}
													size='small'
													type='email'
													variant='standard'
													required
													label="אימייל"
													defaultValue="omer4389@gmail.com"
												/>
											</Box>

											<Box>
												<SectorChip recruiterSectors={recruiterSectors} setRecruiterSectors={setRecruiterSectors} edit={editSectors} setEdit={setEditSectors} />
											</Box>
										</Stack>
										<Box>
											<Button variant='contained' color='error'>
												הסר מגייס
											</Button>
										</Box>
									</Box>
									<Box sx={{
										mt: 1,
										flexWrap: 'wrap',
										gap: 0.5,
										padding: 3,
										height: 'fit-content',
										display: 'flex',
									}}>
										{recruiterSectors.map((value) => (
											<Chip disabled={!editSectors} color='primary' onDelete={() => { setRecruiterSectors(recruiterSectors.filter((sector) => sector !== value)) }} key={value} label={value} />
										))}
									</Box>


								</Stack>
							</ClickAwayListener>

						</Stack>
					</Stack>




				</Stack>
				<Divider />
				<Stack spacing={1} direction='row' sx={{ padding: 2, display: 'flex', justifyContent: 'end' }}>
					<Button variant='contained' color='primary'>
						שמור שינויים
					</Button>


				</Stack>

			</Dialog>

		</Box>
	);
}
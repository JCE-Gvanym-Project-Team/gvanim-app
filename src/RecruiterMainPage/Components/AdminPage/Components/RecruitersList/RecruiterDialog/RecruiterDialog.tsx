import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Avatar, Box, Container, ListItemIcon, Stack, TextField } from '@mui/material';
import { ChevronLeft, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import GvanimAvatar from '../../../../../../Components/GvanimAvatar/GvanimAvatar';
import SectorChip from '../../SectorChip/SectorChip';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecruiterDialog() {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [CMR, setCMR] = React.useState<any[]>([]);

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
					<Edit />
				</IconButton>

			</ListItemIcon>
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

						<Box display='flex' justifyContent='end' width='100%'>
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


				<Stack spacing={2} sx={{ height: '100%', padding: 4 }}>
					<Avatar sx={{ mr: 'auto', ml: 'auto', height: 70, width: 70 }} />


					<Stack spacing={2} sx={{ borderStyle: 'solid' }}>
						<Stack direction="row" display="flex" justifyContent="center">
							<IconButton sx={{ mr: 1 }} onClick={() => alert('click')}>
								<Edit />
							</IconButton>
							<TextField
								disabled
								type='text'
								size='small'
								variant='standard'
								required
								label="שם פרטי"
								defaultValue="עומר"
							/>
						</Stack>

						<Stack direction="row" display="flex" justifyContent="center">
							<IconButton sx={{ mr: 1 }} onClick={() => alert('click')}>
								<Edit />
							</IconButton>
							<TextField
								disabled
								size='small'
								type='text'
								variant='standard'
								required
								label="שם משפחה"
								defaultValue="תורג'מן"
							/>
						</Stack>

						<Stack direction="row" display="flex" justifyContent="center">
							<IconButton sx={{ mr: 1 }} onClick={() => alert('click')}>
								<Edit />
							</IconButton>
							
							<TextField
								disabled
								size='small'
								type='email'
								variant='standard'
								required
								label="אימייל"
								defaultValue="omer4389@gmail.com"
							/>
						</Stack>


						<Stack direction="row" display="flex" justifyContent="center">
							<SectorChip />
						</Stack>
					</Stack>



					
				</Stack>


			</Dialog>

		</Box>
	);
}
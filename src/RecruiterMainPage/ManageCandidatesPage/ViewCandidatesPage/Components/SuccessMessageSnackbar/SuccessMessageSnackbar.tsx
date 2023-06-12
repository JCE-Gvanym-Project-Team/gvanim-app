import { Close } from '@mui/icons-material';
import { Alert, Box, IconButton, Snackbar, Typography } from '@mui/material'
import React from 'react'

export default function SuccessMessageSnackbar(props: {open, onClose})
{
	const {open, onClose} = props;
	return (
		<Snackbar
			open={open}
			onClose={(event, reason) => { onClose(event, reason, false) }}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}
		>
			<Alert
				variant="filled"
				sx={{ alignItems: 'flex-start' }}
				action={
					<React.Fragment>
						<IconButton
							aria-label="close"
							color="inherit"
							sx={{ p: 0 }}
							onClick={onClose}
						>
							<Close />
						</IconButton>
					</React.Fragment>
				}
			>
				<Box sx={{ flex: 1 }}>
					<Typography variant='h6'>
						השינויים בוצעו בהצלחה
					</Typography>

				</Box>
			</Alert>
		</Snackbar>
	)
}

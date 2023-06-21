import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React from 'react';
import { dialogActionsSx, dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './AreYouSureDialogStyle';

export default function AreYouSureDialog(props: { open, onClose, message, callback, setSnackBarOpen })
{
	const { open, onClose, message, callback, setSnackBarOpen } = props;


	return (
		// popup dialog
		<Dialog open={open} onClose={onClose} sx={dialogSx} >
			<Box sx={dialogTopAreaSx}>
				{/* Title */}
				<DialogTitle sx={dialogTitleSx}>
					האם את\ה בטוח\ה?
				</DialogTitle>

				<Box sx={{ display: "flex", justifyContent: "end" }}>

					{/* Close button */}
					<IconButton
						edge="start"
						color="inherit"
						onClick={(event) => { onClose(event, undefined) }}
						aria-label="close"
					>
						<Close />
					</IconButton>
				</Box>
			</Box>

			{/* Job Picking Area */}
			<DialogContent sx={dialogContentSx} style={dialogContentStyle}>
				{message.split('\n').map((line, index) => (
					<React.Fragment key={index}>
						{line}
						<br />
					</React.Fragment>
				))}
			</DialogContent>

			{/* Action Button */}
			<DialogActions sx={dialogActionsSx}>
				<Button
					variant='contained'
					onClick={(event) => onClose(event, undefined)}
					sx={{
						backgroundColor: "#008000",

						"&:hover": {
							backgroundColor: "#66b366",
							color: "black"
						}
					}}
				>
					לא
				</Button>
				<Button
					variant='outlined'
					onClick={async (event) =>
					{
						if (!(await callback()))
						{
							onClose(event, undefined);
							return;
						}
						onClose(event, undefined);
						setSnackBarOpen(true);
					}}
					sx={{
						borderColor: "red",
						color: "red",
						"&:hover": {
							backgroundColor: "#ff6666",
							color: "white"
						}
					}}
				>
					כן
				</Button>
			</DialogActions>
		</Dialog>
	)
}

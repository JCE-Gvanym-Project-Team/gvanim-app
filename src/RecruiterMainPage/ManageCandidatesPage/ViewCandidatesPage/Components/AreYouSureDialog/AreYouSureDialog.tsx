import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import { dialogActionsSx, dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './AreYouSureDialogStyle';
import { Close } from '@mui/icons-material';

export default function AreYouSureDialog(props: { open, onClose, message, callback })
{
	const { open, onClose, message, callback } = props;
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

					}}
				>
					לא
				</Button>
				<Button
					variant='outlined'
					onClick={(event) => { callback(); onClose(event, undefined) }}
					sx={{

					}}
				>
					כן
				</Button>
			</DialogActions>
		</Dialog>
	)
}

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import { dialogActionsSx, dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './AreYouSureDialogStyle';
import { Close } from '@mui/icons-material';

export default function AreYouSureDialog(props: { open, onClose })
{
	const { open, onClose } = props;
	return (
		// popup dialog
		<Dialog open={open} onClose={onClose} sx={dialogSx} >
			<Box sx={dialogTopAreaSx}>
				{/* Title */}
				<DialogTitle sx={dialogTitleSx}>
					העברת משרה
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

			</DialogContent>

			{/* Action Button */}
			<DialogActions sx={dialogActionsSx}>
				<Button
					onClick={() => { }}
					sx={{

					}}
				>
					כן
				</Button>
				<Button
					onClick={() => { }}
					sx={{

					}}
				>
					לא
				</Button>
			</DialogActions>
		</Dialog>
	)
}

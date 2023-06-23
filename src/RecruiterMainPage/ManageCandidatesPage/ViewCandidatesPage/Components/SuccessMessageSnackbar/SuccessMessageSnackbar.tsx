import { Alert, Snackbar } from '@mui/material';

export default function SuccessMessageSnackbar(props: { open, onClose })
{
	const { open, onClose } = props;
	return (
		<Snackbar
			open={open}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			onClose={onClose}
			autoHideDuration={6000}
		>
			<Alert children={"השינויים בוצעו בהצלחה"} severity='success' onClose={onClose} />
		</Snackbar>
	)
}

import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { dialogContentStyle, dialogContentSx, dialogSx, dialogTopAreaSx } from './AreYouSureDialogStyle';

export default function AreYouSureDialog(props: { open, onClose, recommenderName, index })
{

    const { open, onClose, recommenderName, index } = props;

    return (
        <Dialog open={open} onClose={onClose} sx={dialogSx} >
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        flex: 10
                    }}
                    variant='h2'>
                    האם את\ה בטוח\ה?
                </DialogTitle>

                <Box sx={{ display: "flex", justifyContent: "end" }}>

                    {/* Close button */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={(event) => { onClose(event, undefined, index, false); }}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                </Box>
            </Box>


            {/* about text */}
            <DialogContent sx={dialogContentSx} style={dialogContentStyle}>
                <Typography
                    sx={{
                        alignSelf: "center",
                        maxWidth: "100%",
                        overflowWrap: "break-word"
                    }}
                    variant='h4'
                >
                    פעולה זו תמחק את הממליץ ששמו {recommenderName}
                </Typography>
            </DialogContent>

            <DialogActions sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: "secondary.main",
                        "&:hover": {
                            backgroundColor: "secondary.half",
                            color: "primary.main"
                        }
                    }}
                    onClick={(event) =>
                    {
                        onClose(event, undefined, index, false)
                    }}
                >
                    <Typography variant='h4'>
                        השאר ממליץ
                    </Typography>
                </Button>
                <Button
                    variant='outlined'
                    sx={{
                        borderColor: "error.main",
                        "&:hover": {
                            backgroundColor: "error.main",
                            color: "primary.textBright"
                        }
                    }}
                    onClick={(event) =>
                    {
                        onClose(event, undefined, index, true);
                    }}
                >
                    <Typography variant='h4'>
                        מחק ממליץ
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

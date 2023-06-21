import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { dialogContentStyle, dialogContentSx, dialogSx, dialogTopAreaSx } from './ErrorDialogStyle';

export default function ErrorDialog(props: { open, onClose })
{

    const { open, onClose } = props;

    return (
        <Dialog open={open} onClose={onClose} sx={dialogSx} >
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle sx={{
                    textAlign: "center",
                    flex: 10
                }}>
                    <Typography 
                    variant='h2'
                    sx={{
                        alignSelf: "center",
                        justifySelf: "center"
                    }}
                    >
                        שגיאה
                    </Typography>
                </DialogTitle>

                <Box sx={{ display: "flex", justifyContent: "end" }}>

                    {/* Close button */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={(event) => { onClose(event, undefined); }}
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
                    variant='h3'
                    >
                        מועמדותך כבר נקלטה עבור משרה זו
                </Typography>
            </DialogContent>
        </Dialog>
    )
}

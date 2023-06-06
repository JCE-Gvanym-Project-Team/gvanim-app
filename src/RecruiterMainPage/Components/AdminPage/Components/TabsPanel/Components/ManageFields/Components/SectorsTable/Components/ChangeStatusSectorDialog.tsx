import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Lock, LockOpen } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';
import { Sector } from '../../../../../../../../../../Firebase/FirebaseFunctions/Sector';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function ChangeStatusSectorDialog(props: { setSnackbar: any, row: any }) {
    const { setSnackbar, row } = props;
    const { sector_status, sector_name } = row;

    const fromStatus = sector_status ? `פתוח` : `סגור`;
    const toStatus = sector_status ? `סגור` : `פתוח`;

    const [open, setOpen] = React.useState(false);


    const handleStatusChange = () => {
        let sectorToEdit: Sector = new Sector(sector_name, sector_status); 

         sectorToEdit.edit(sector_name,!sector_status);

        setOpen(false);
        
        setSnackbar({ children: `סטטוס האשכול '${sector_name}' שונה בהצלחה`, severity: 'success' });

        row!.sector_status = !sector_status; 
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>

            {sector_status ? (
                <Tooltip title="סגור אשכול">

                        <Chip onClick={handleClickOpen} sx={{padding: 0.5}} label={'פתוח'}size='small'  color="success" icon={<LockOpen sx={{fontSize: 'small'}} />} />

                </Tooltip>
            ) : (
                <Tooltip title="פתח אשכול">
                      <Chip onClick={handleClickOpen} sx={{padding: 0.65}} label={'סגור'} size='small' color="error" icon={<Lock sx={{fontSize: 'small'}} />} />
                </Tooltip>

            )}

            <BootstrapDialog
                fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    הודעת אימות
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        האם את/ה בטוח/ה שברצונך לשנות את סטטוס האשכול <strong style={{textDecoration: 'underline'}}>'{sector_name}'</strong> ממצב <strong style={{textDecoration: 'underline'}}>{fromStatus}</strong> למצב <strong style={{textDecoration: 'underline'}}>{toStatus}</strong> ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' autoFocus onClick={handleClose}>
                        ביטול
                    </Button>
                    <Button variant='text' type='submit' autoFocus onClick={handleStatusChange}>
                        אישור
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
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
import { Role } from '../../../../../../../../../../Firebase/FirebaseFunctions/Role';


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

export default function ChangeStatusRoleDialog(props: { setSnackbar: any, row: any, setLoading: any  }) {
    const { setSnackbar, row, setLoading } = props;
    const { role_status, role_name } = row;

    const fromStatus = role_status ? `פתוח` : `סגור`;
    const toStatus = role_status ? `סגור` : `פתוח`;

    const [open, setOpen] = React.useState(false);


    const handleStatusChange = () => {
        let roleToEdit: Role = new Role(role_name, role_status); 

        setLoading(true);
        roleToEdit.edit(!role_status);
        setLoading(false);

        setOpen(false);
        
        setSnackbar({ children: `סטטוס התפקיד '${role_name}' שונה בהצלחה`, severity: 'success' });

        row!.role_status = !role_status; 
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>

            {role_status ? (
                <Tooltip title="סגור תפקיד">

                        <Chip onClick={handleClickOpen} variant='outlined' sx={{padding: 0.5}} label={'פתוח'}size='small'  color="success" icon={<LockOpen sx={{fontSize: 'small'}} />} />

                </Tooltip>
            ) : (
                <Tooltip title="פתח תפקיד">
                      <Chip onClick={handleClickOpen} variant='outlined' sx={{padding: 0.65}} label={'סגור'} size='small' color="error" icon={<Lock sx={{fontSize: 'small'}} />} />
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
                        האם את/ה בטוח/ה שברצונך לשנות את סטטוס התפקיד <strong style={{textDecoration: 'underline'}}>'{role_name}'</strong> ממצב <strong style={{textDecoration: 'underline'}}>{fromStatus}</strong> למצב <strong style={{textDecoration: 'underline'}}>{toStatus}</strong> ?
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
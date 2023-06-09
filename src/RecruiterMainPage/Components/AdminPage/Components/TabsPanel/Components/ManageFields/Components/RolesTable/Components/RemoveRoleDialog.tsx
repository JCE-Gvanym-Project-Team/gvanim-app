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
import { Delete } from '@mui/icons-material';


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

export default function MyRoleRemoveDialog(props: { handleDelete: any, selectedRowParams: any }) {
    const { handleDelete, selectedRowParams } = props;


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (selectedRowParams) {
            setOpen(true);
        }

    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen} disabled={!selectedRowParams}>
                <Delete />
            </IconButton>

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
                            לתשומת ליבך! מחיקת התפקיד לצמיתות עלולה להשפיע על נתוני הסטטיסטיקות, יש באפשרותך לשנות את סטטוס התפקיד ל-'סגור',
                        האם בכל זאת את/ה מעוניין/ת להמשיך בפעולה ולהסיר את התפקיד <strong style={{textDecoration: 'underline'}}>{selectedRowParams ?  `'${selectedRowParams!.currentRow!.role_name}'` : 'לא ידוע'}</strong> לצמיתות?
                    
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' autoFocus onClick={handleClose}>
                        ביטול
                    </Button>
                    <Button variant='text' color='error' type='submit' autoFocus onClick={() => { handleDelete(); setOpen(false); }}>
                        הסר
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
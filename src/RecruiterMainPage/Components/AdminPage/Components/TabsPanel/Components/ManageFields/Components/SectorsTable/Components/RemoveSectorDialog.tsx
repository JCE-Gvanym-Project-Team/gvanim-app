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
import { Recruiter, getRecruitersFromDatabase } from '../../../../../../../../../../Firebase/FirebaseFunctions/Recruiter';
import { Sector, loginAdmin, loginRecruiter } from '../../../../../../../../../../Firebase/FirebaseFunctions/functionIndex';
import { sleep } from '../../../../../../../../../../Firebase/FirebaseFunctions/test';


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

export default function MySectorRemoveDialog(props: { handleDelete: any, selectedRowParams: any }) {
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

    const deleteSector = async () => {
        handleDelete();
        setOpen(false);
        //remove the sector from all recruiters
        // const recruiters: Recruiter[] = await getRecruitersFromDatabase();
        // recruiters.forEach(async (recruiter) => {
            // const sectorName = selectedRowParams.currentRow.sector_name;
            // const sectors: string[] = await recruiter._sectors;
            // if (sectors.indexOf(sectorName) !== -1) {
                //  recruiter.removeSector(sectorName);
                // await sleep(3000);
            // }
        // });
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

                        לתשומת ליבך! מחיקת האשכול לצמיתות עלולה להשפיע על נתוני הסטטיסטיקות, יש באפשרותך לשנות את סטטוס האשכול ל-'סגור',
                        האם בכל זאת את/ה מעוניין/ת להמשיך בפעולה ולהסיר את האשכול <strong style={{ textDecoration: 'underline' }}>{selectedRowParams ? `'${selectedRowParams!.currentRow!.sector_name}'` : 'לא ידוע'}</strong> לצמיתות?


                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' autoFocus onClick={handleClose}>
                        ביטול
                    </Button>
                    <Button variant='text' color='error' type='submit' autoFocus onClick={() => { deleteSector(); }}>
                        הסר
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}
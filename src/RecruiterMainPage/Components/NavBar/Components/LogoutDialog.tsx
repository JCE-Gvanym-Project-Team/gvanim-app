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
import { Box, Link, Stack } from '@mui/material';
import { LoginOutlined } from '@mui/icons-material';

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

export default function MyLogoutDialog(props: { handlelogout: any, isMobile: Boolean }) {
    const { handlelogout, isMobile } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {isMobile ? (

                    <Box id="logout" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%',mb: 1 }}>
                        <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                            <Link onClick={handleClickOpen}
                                sx={{
                                    cursor: 'pointer',
                                    ":hover > #reportsIcon": {
                                        transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                        transform: 'translateY(-2px)',
                                    },
                                    textDecoration: 'unset',
                                    color: '#344767',
                                    fontSize: '0.87rem'
                                }}
                            >
                                <LoginOutlined id="reportsIcon" sx={{ fontSize: '1.07rem', marginRight: 1, alignSelf: 'bottom' }} />
                                התנתק
                            </Link>
                        </Stack>

                    </Box>
            ) : (
                <Button onClick={handleClickOpen} disableRipple sx={{
                    ":active": {
                        backgroundColor: 'transparent',
                        transform: 'none'
                    },
                    ":hover": {
                        opacity: '0.75',
                        color: '#e91e63',
                        backgroundColor: 'transparent',
                        border: '1px solid #e91e63',
                        borderRadius: '0.5rem'

                    },
                    border: '1px solid #e91e63',
                    color: '#e91e63',
                    letterSpacing: 0,
                    backgroundSize: '150%',
                    backgroundPositionX: '25%',
                    position: 'relative',
                    overflow: 'hidden',
                    WebkitAppearance: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.85rem',
                    paddingX: '1rem',
                    paddingY: '0.375rem',
                    fontWeight: 600,
                    margin: '0px 4px 0px 4px',
                    lineHeight: 1.667,
                    height: '32px'

                }}>

                    <Typography sx={{ font: '12px Roboto, Helvetica,Arial, sans-serif', margin: '0px 0px 2px 0px', fontWeight: 600 }}>התנתק</Typography>
                </Button>)
            }
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
                        האם את/ה בטוח/ה שברצונך להתנתק?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' autoFocus onClick={handleClose}>
                        ביטול
                    </Button>
                    <Button variant='text' color='error' type='submit' autoFocus onClick={()=>{handleClose(); handlelogout(); window.location.reload();}}>
                        התנתק
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

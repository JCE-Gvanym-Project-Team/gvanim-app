import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, SxProps, TextField, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';


const MyFieldsSx: SxProps = {
    width: '100%',
    height: 'fit-content',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '1rem',
    padding: 5,
}




const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddSectorDialog(props: { sectorName: any, setSectorName: any, sectorStatus: any, setSectorStatus: any, handleAdd: any }) {
    const {
        sectorName,
        setSectorName,
        sectorStatus,
        setSectorStatus,
        handleAdd,
    } = props;



    const [open, setOpen] = React.useState(false);


    const handleAdd_ = async () => {
        await handleAdd();
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>


            <IconButton onClick={handleClickOpen}>
                <Add />
            </IconButton>

            <Dialog
                PaperProps={{
                    sx: {
                        maxWidth: { xs: 'xl', sm: 'xl', md: 'md', lg: 'md', xl: 'md' }, maxHeight: { xs: '100%', sm: '90%' }, height: 'fit-content',
                        borderRadius: '0.6rem'
                    }
                }}
                fullScreen
                open={open}
                TransitionComponent={Transition}

            >

                <AppBar sx={{ position: 'relative', backgroundColor: 'rgb(52, 71, 103)' }} >
                    <Toolbar>

                        <Typography sx={{ ml: 2, flex: 1, textAlign: 'center' }} variant="h6" component="div">
                            אשכול חדש
                        </Typography>

                        <Box>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>


                <Stack spacing={3} sx={{ height: '100%', padding: { xs: 1, sm: 4 }, justifyContent: 'center' }}>

                    <Stack spacing={2}>

                        <Stack direction="row" display="flex" justifyContent="center">

                            <Stack direction='column' sx={MyFieldsSx}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Stack spacing={2.5} sx={{ width: '100%' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <TextField
                                                sx={{ width: '100%' }}
                                                type='text'
                                                variant='outlined'
                                                size='small'
                                                required
                                                label="שם האשכול"
                                                value={sectorName}
                                                onChange={(e) => setSectorName(e.target.value)}
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">סטטוס האשכול</InputLabel>
                                                <Select
                                                    defaultValue={1}
                                                    size='small'
                                                    label="סטטוס האשכול"
                                                    value={sectorStatus}
                                                    onChange={(e) => setSectorStatus(e.target.value)}

                                                >
                                                    <MenuItem value={1}>פתוח</MenuItem>
                                                    <MenuItem value={2}>סגור</MenuItem>
                                                </Select>
                                            </FormControl>

                                        </Box>


                                    </Stack>
                                </Box>


                            </Stack>


                        </Stack>

                    </Stack>




                </Stack>
                <Divider />
                <Stack spacing={1} direction='row' sx={{ padding: 2, display: 'flex', justifyContent: 'end' }}>

                    <Button disabled={!sectorName || sectorStatus === null} onClick={handleAdd_} variant='contained' color='primary'>
                        הוסף
                    </Button>


                </Stack>

            </Dialog>

        </Box>
    );
}
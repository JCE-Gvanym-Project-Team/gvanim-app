import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Avatar, Box, Link, ListItemAvatar, ListItemButton, ListItemIcon, Rating } from '@mui/material';
import { ListItemTypographySx } from './CandidatesListDialogStyle';
import { ChevronLeft } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CandidatesListFullScreenDialog({JobId}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    alert(JobId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant='text' endIcon={<ChevronLeft />} onClick={handleClickOpen} >לרשימת המועמדים</Button>

      <Dialog
        fullScreen
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '8px',
          }
        }}
        open={open}

        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>

            <Typography sx={{ ml: 2, flex: 1, textAlign: 'center' }} variant="h6" component="div">
              משרה מס' {JobId}
            </Typography>

            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <List sx={{ padding: 0 }}>
          {/* this is the header */}

          <ListItem>
            <ListItemText sx={{ paddingRight: '16px', paddingLeft: '16px' }} >
              <Typography sx={ListItemTypographySx} variant='subtitle1'>
                שם המועמד
              </Typography>
            </ListItemText>

            <ListItemIcon>
              <ListItemText sx={{ paddingRight: '16px', paddingLeft: '16px' }} >
                <Typography sx={ListItemTypographySx} variant='subtitle1'>
                  התאמה
                </Typography>
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          {/* END HEADER */}

          <ListItemButton accessKey='ID עומר' onClick={(e) => console.log(e.currentTarget.accessKey)}>

            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>


            <ListItemText primary="עומר תורג'מן" secondary="מעלה אדומים" />

            <ListItemIcon >
              <Rating defaultValue={2} size="medium" readOnly />
            </ListItemIcon>

          </ListItemButton>
          <Divider />

          <ListItemButton accessKey='ID גבריאל' onClick={(e) => console.log(e.currentTarget.accessKey)}>

            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>

            <ListItemText
              primary="עמוס לוי"
              secondary="באר שבע"
            />
            <Rating defaultValue={5} size="medium" readOnly />
          </ListItemButton>

        </List>

      </Dialog>
    </Box>
  );
}
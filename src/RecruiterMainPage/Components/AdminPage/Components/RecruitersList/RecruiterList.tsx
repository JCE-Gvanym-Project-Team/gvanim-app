import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { ListItemTypographySx, MyPaperSx } from './RecruitersListStyle'
import RecruiterDialog from './RecruiterDialog/RecruiterDialog';

const recruiters = [
    { fullname: 'יוסי כהן', email: 'yossi324@gmail.com' },
    { fullname: 'אסי לוי', email: 'asi333@gmail.com' },
    { fullname: 'איציק מזרחי', email: 'itzik232@gmail.com' },
    { fullname: 'גבריאל שלם', email: 'gavriel333@gmail.com' },
    { fullname: "עומר תורג'מן", email: 'omer43@gmail.com' },
    { fullname: 'עדן ועקנין', email: 'eden32@gmail.com' },
    { fullname: 'ישראל כהן', email: 'israel322@gmail.com' },
    { fullname: 'עמית כהן', email: 'amit3232@gmail.com' },
    { fullname: 'דורון כהן', email: 'doron333@gmail.com' },
    { fullname: 'תמר כהן', email: 'tamar32@gmail.com' },
];

export default function () {
    return (
        <Box>
            <List >
                {/* this is the header */}
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between'}}>
      
                        <Typography sx={ListItemTypographySx} variant='subtitle1'>
                            שם המגייס
                        </Typography>
            

                        <Box sx={{borderStyle: 'solid'}}>
                            <Button>
                                Search
                            </Button>
                        </Box>
                    <ListItemIcon>
                        <ListItemText sx={{paddingRight: '16px', paddingLeft: '16px' }} >
                            <Typography sx={ListItemTypographySx} variant='subtitle1'>
                                עריכה
                            </Typography>
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>
                {/* END HEADER */}




                <Box sx={MyPaperSx}>


                    {recruiters.map((recruiter, i) => (
                        <React.Fragment key={i}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText primary={recruiter.fullname} secondary={recruiter.email} />
                                {/* <ListItemIcon>
                                    <IconButton onClick={()=>alert('clicked item')}>
                                        <Edit />
                                    </IconButton>
                                </ListItemIcon> */}
                                <RecruiterDialog />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </Box>



            </List>
        </Box>
    )
}

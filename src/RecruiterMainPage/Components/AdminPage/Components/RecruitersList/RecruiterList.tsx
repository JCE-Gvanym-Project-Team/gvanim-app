import { Avatar, Box, Button, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { ListItemTypographySx, MyPaperSx } from './RecruitersListStyle'
import RecruiterDialog from './RecruiterDialog/RecruiterDialog';
import { Search } from '@mui/icons-material';

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

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Box
                        id="searchBarDesktop"
                        component="form"
                        sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' }, flexDirection: 'row-reverse', alignItems: 'center', borderRadius: '0.75rem', backgroundColor: 'transparent', border: '1.5px solid rgba(0, 0, 0, 0.3)', width: { xs: 'unset', sm: 'unset', md: '400px', lg: '600px', xl: '600px' } }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="חיפוש"
                        />
                        <IconButton disabled type="button" sx={{ p: '7px' }} aria-label="search">
                            <Search />
                        </IconButton>
                    </Box>
                </Box>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Typography sx={ListItemTypographySx} variant='subtitle1'>
                        שם המגייס
                    </Typography>



                    <Box
                        id="searchBarDesktop"
                        component="form"
                        sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }, flexDirection: 'row-reverse', alignItems: 'center', borderRadius: '0.75rem', backgroundColor: 'transparent', border: '1.5px solid rgba(0, 0, 0, 0.3)', width: { xs: 'unset', sm: 'unset', md: '400px', lg: '600px', xl: '600px' } }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="חיפוש"
                        />
                        <IconButton disabled type="button" sx={{ p: '7px' }} aria-label="search">
                            <Search />
                        </IconButton>
                    </Box>

                    <ListItemIcon>
                        <ListItemText sx={{ paddingRight: '16px', paddingLeft: '16px' }} >
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
                            <ListItemButton disableRipple sx={{ ":hover": { backgroundColor: 'rgba(25, 118, 210, 0.08)' }, ":focus": { backgroundColor: 'rgba(25, 118, 210, 0.08)' } }}>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText primary={recruiter.fullname} secondary={recruiter.email} />
                                <RecruiterDialog />
                            </ListItemButton>
                            <Divider />
                        </React.Fragment>
                    ))}
                </Box>



            </List>
        </Box>
    )
}

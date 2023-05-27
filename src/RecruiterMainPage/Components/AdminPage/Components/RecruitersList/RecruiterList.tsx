import { Avatar, Box, Container, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { ListItemTypographySx, MyPaperSx } from './RecruitersListStyle'
import { Edit } from '@mui/icons-material'

export default function () {
    return (
        <Box>
            <List >
                {/* this is the header */}
                <ListItem>
                    <ListItemText sx={{ paddingRight: '16px', paddingLeft: '16px' }} >
                        <Typography sx={ListItemTypographySx} variant='subtitle1'>
                            שם המגייס
                        </Typography>
                    </ListItemText>

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
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={"עומר תורג'מן"} secondary={"dewikjdwi@gmail.com"} />
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                    </ListItem>
                    <Divider />


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={"עומר תורג'מן"} secondary={"dewikjdwi@gmail.com"} />
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                    </ListItem>
                    <Divider />


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={"עומר תורג'מן"} secondary={"dewikjdwi@gmail.com"} />
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                    </ListItem>
                    <Divider />


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={"עומר תורג'מן"} secondary={"dewikjdwi@gmail.com"} />
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                    </ListItem>
                    <Divider />


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={"עומר תורג'מן"} secondary={"dewikjdwi@gmail.com"} />
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                    </ListItem>
                    <Divider />


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={"עומר תורג'מן"} secondary={"dewikjdwi@gmail.com"} />
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                    </ListItem>
                    <Divider />


                    <ListItem>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={"עומר תורג'מן"} secondary={"dewikjdwi@gmail.com"} />
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                    </ListItem>
                    <Divider />
                </Box>



            </List>
        </Box>
    )
}

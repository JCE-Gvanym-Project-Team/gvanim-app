import { Avatar, Box, Button, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Search } from '@mui/icons-material';
import { Recruiter, getRecruitersFromDatabase } from '../../../../../../../../../Firebase/FirebaseFunctions/Recruiter';
import { ListItemTypographySx, MyPaperSx } from './RecruitersTableStyle';
import RecruiterDialog from './Components/RecruiterDialog/RecruiterDialog';
import SuccessSnackBar from '../SuccessSnackBar/SuccessSnackBar';



const recruiters = [
    { email: 'yossi324@gmail.com', firstname: 'יוסי', lastname: 'כהן', sectors: ["sec1", "sec2"] },
    { email: 'asi333@gmail.com', firstname: 'אסי', lastname: 'לוי', sectors: ["sec1", "sec2"] },
    { email: 'itzik232@gmail.com', firstname: 'איציק', lastname: 'מזרחי', sectors: ["sec1", "sec2"] },
    { email: 'gavriel333@gmail.com', firstname: 'גבריאל', lastname: 'שלם', sectors: ["sec1", "sec2"] },
    { email: 'omer43@gmail.com', firstname: 'עומר', lastname: "תורג'מן", sectors: ["sec1", "sec2"] },
    { email: 'eden32@gmail.com', firstname: 'עדן', lastname: 'ועקנין', sectors: ["sec1", "sec2"] },


    { email: 'israel322@gmail.com', firstname: 'ישראל', lastname: 'כהן', sectors: ["sec1", "sec2"] },
    { email: 'amit3232@gmail.com', firstname: 'עמית', lastname: 'כהן', sectors: ["sec1", "sec2"] },
    { email: 'doron333@gmail.com', firstname: 'דורון', lastname: "תורג'מן", sectors: ["sec1", "sec2"] },
    { email: 'tamar32@gmail.com', firstname: 'תמר', lastname: 'כהן', sectors: ["sec1", "sec2"] }

];



export default function RecruitersList() {
    const [recruitersList, setRecruitersList] = React.useState<Recruiter[]>();
    const [searchValue, setSearchValue] = React.useState("");
    const [refreshData, setRefreshData] = React.useState(false);
    // snackabr
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const handleChange = (event: any) => {
        setSearchValue(event.target.value);
    }

    const isContain = (sectors: string[]) => {
        var bool = false;

        if (sectors === null || sectors.length === 0) { return bool }

        sectors.forEach(sec => { bool = bool || sec.includes(searchValue) });

        return bool;
    }


    const fetchRecruitersList = async () => {
        const recruiters_ = await getRecruitersFromDatabase();
        setRecruitersList(recruiters_);
    }

    React.useEffect(() => {
        fetchRecruitersList();

    }, []);

    return (
        <Box>
            <List>
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                    {recruitersList?.filter(recruiter =>

                        recruiter._firstName.includes(searchValue) ||
                        recruiter._lastName.includes(searchValue) ||
                        recruiter._email.includes(searchValue) ||
                        isContain(recruiter._sectors)

                    ).map((filtered_recruiter, i) => (
                        <React.Fragment key={filtered_recruiter._id}>
                            <ListItemButton key={filtered_recruiter._id} disableRipple sx={{
                                ":hover": { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
                                ":focus": { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
                                // height: '50px',
                            }}>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText primary={filtered_recruiter._firstName + ' ' + filtered_recruiter._lastName} secondary={filtered_recruiter._email} />
                            <Box sx={{paddingRight: '16px', paddingLeft: '16px'}}>
                                <Box sx={{ width: '80px',display: 'flex',justifyContent: 'center'}}>
                                {/* <RecruiterDialog recruiter={filtered_recruiter} recruitersList={recruitersList} setRecruitersList={setRecruitersList} setOpenSnackBar={setOpenSnackBar} setMessage={setMessage} /> */}
                                </Box>
                              
                            </Box>
                            </ListItemButton>
                            {recruitersList.length === i + 1 ? <></> : <Divider />}
                        </React.Fragment>
                    ))}
                </Box>

            </List>
            <SuccessSnackBar openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} message={message} />
        </Box>
    )
}

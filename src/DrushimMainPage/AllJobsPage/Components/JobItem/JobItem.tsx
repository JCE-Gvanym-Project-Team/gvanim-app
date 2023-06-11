import React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArticleOutlined, Place } from '@mui/icons-material';
import { blue } from '@mui/material/colors';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function JobItem(props: { job: any }) {
    const { job } = props;
    return (
        <Item sx={{
            minHeight: '250px',
            border: '1px solid rgba(0, 0, 0, 0.095)',
            borderRadius: '0.475rem'
        }}>
            <Avatar
                sx={{
                    width: '60px',
                    height: '60px',
                    marginY: -5,
                    content: '""',
                    position: 'absolute',
                    zIndex: 0,
                    background: 'linear-gradient(to top, rgb(83, 87, 206), rgb(148, 110, 214))',
                    borderRadius: '1rem',
                }}>


                <ArticleOutlined />


            </Avatar>
            <Box id="CardTopBar" display='flex' justifyContent='end'>

                <Typography sx={{
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontSize: '0.8rem',
                    color: 'rgb(52, 71, 103)',
                    letterSpacing: '-0.125px'
                }}>
                    משרה מס' {job?._jobNumber}
                </Typography>
            </Box>

            <Stack direction='column' justifyContent='space-between' height='100%' divider={<Divider />} spacing={1.5} sx={{ mt: 1 }} >
                <Box id="header">

                    <Box>
                        <Typography variant='h5' sx={{
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            mt: '0.3rem',
                            fontWeight: 'bold',
                            color: 'black',

                        }}>
                            {job?._title}
                        </Typography>
                    </Box>
                </Box>

                <Box id='body' display='flex' flexDirection='column' justifyContent='space-between' sx={{ minHeight: '130px' }}>
                    <Box>
                        <Typography variant='h6' sx={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', }}>
                            {job?._requirements}
                        </Typography>
                    </Box>

                    <Stack display='flex' flexDirection='row' justifyContent='space-between' sx={{ bottom: 0 }}>
                        <Box display='flex' flexDirection='row'>
                            <Typography sx={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', color: 'black', fontWeight: 'bold', alignSelf: 'end', mr: 0.5 }} fontSize={13}>היקף משרה: </Typography>
                            <Typography sx={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif',alignSelf: 'end' }} fontSize={13}>
                                {`${job?._scope[0]}%-${job?._scope[1]}%`}
                            </Typography>
                        </Box>

                        <Box display='flex' flexDirection='row'>
                        <Typography sx={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', color: 'black', fontWeight: 'bold', alignSelf: 'end', mr: 0.5 }} fontSize={13}>מיקום:</Typography>
                            <Typography sx={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif',alignSelf: 'end' }} fontSize={13}>
                                {job?._region}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>


                <Box sx={{

                    top: 0, bottom: 0, display: 'flex', justifyContent: 'space-between'
                }}>

                    <Box>
                        <Chip variant='outlined' size='small' sx={{
                            color: '#fff', opacity: 0.72, fontSize: '0.75rem',
                            borderRadius: '8px', backgroundColor: 'rgba(0, 0, 0, 0.38)'
                        }}
                            label={job?._creationDate.toLocaleDateString()} />
                    </Box>

                    <Link to={`${job?._jobNumber}`}
                        style={{
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontSize: '1rem',
                            lineHeight: 1.375,
                            fontWeight: 600,
                            opacity: 1,
                            textTransform: 'none',
                            verticalAlign: 'unset',
                            textDecoration: 'none',
                            color: 'rgb(52, 71, 103)',
                            letterSpacing: '-0.125px'
                        }}>
                        <Box display='flex' flexDirection='column' justifyContent='end'>
                            <Typography sx={{

                                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                fontSize: '1rem',
                                lineHeight: 1.375,
                                fontWeight: 600,
                                opacity: 1,
                                textTransform: 'none',
                                verticalAlign: 'unset',
                                textDecoration: 'none',
                                color: 'rgb(52, 71, 103)',
                                letterSpacing: '-0.125px'
                            }}>
                                לפרטים
                            </Typography>
                        </Box>
                    </Link>

                </Box>

            </Stack>
        </Item>
    )
}

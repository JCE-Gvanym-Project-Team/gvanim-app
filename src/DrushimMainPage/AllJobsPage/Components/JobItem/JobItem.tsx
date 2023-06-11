import React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArticleOutlined, Place } from '@mui/icons-material';



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
            height: '250px', 
             border: '1px solid rgba(0, 0, 0, 0.095)',
             borderRadius: '0.475rem' }}>
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
            <Stack direction='column' justifyContent='space-between' height='100%' >
                <Box sx={{
                      borderBottom: '1px solid rgba(0, 0, 0, 0.095)',
                      top: 0, 
                      height: '55px' }}>
             
                    <Box display='flex' justifyContent='end' id="header">

               <Typography sx={{
                   fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                   fontSize: '0.8rem',
                   lineHeight: 1.375,
                   fontWeight: 500,
                   opacity: 1,
                   textTransform: 'none',
                   verticalAlign: 'unset',
                   textDecoration: 'none',
                   color: 'rgb(52, 71, 103)',
                   letterSpacing: '-0.125px'
              }}>
                  משרה מס' {job?._jobNumber} 
              </Typography>
               </Box>
               
               <Typography sx={{
                   mt: '0.1rem',
                   fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                   fontSize: '1.2rem',
                   lineHeight: 1.375,
                   fontWeight: 500,
                   opacity: 1,
                   textTransform: 'none',
                   verticalAlign: 'unset',
                   textDecoration: 'none',
                   color: 'rgb(52, 71, 103)',
                   letterSpacing: '-0.125px'
              }}>
                   {job?._title} 
              </Typography>
                    </Box>
                    {/* <Divider /> */}
                <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{
                    //   border: '1px solid rgba(0, 0, 0, 0.095)',
                     borderRadius: '0.25rem', top: 0, height: '110px', paddingRight: 1,paddingLeft: 1}} id='body'>
                  <Box>
                  {job?._requirements}
                  </Box>

                    <Stack display='flex' flexDirection='row' justifyContent='start' sx={{bottom: 0}}>
<Typography sx={{fontFamily: 'Roboto, Helvetica, Arial, sans-serif',color: 'black',fontWeight: 600 ,alignSelf:'end', mr: 0.5}} fontSize={13}>היקף משרה: </Typography>
<Typography sx={{fontFamily: 'Roboto, Helvetica, Arial, sans-serif'}} fontSize={13}>
    50%-70%
</Typography>
                    </Stack>
                </Box>
                    <Divider />
                <Box sx={{
                    //  border: '1px solid rgba(0, 0, 0, 0.095)', 
                     top: 0, bottom: 0, display: 'flex', justifyContent: 'space-between' }}>

                    <Box>
                        <Chip variant='outlined' size='small' sx={{
                            color: '#fff', opacity: 0.72, padding: '0.05rem', fontSize: '0.75rem',
                            borderRadius: '8px', backgroundColor: 'rgba(0, 0, 0, 0.38)'
                        }}
                            label={job?._creationDate.toLocaleDateString()} />
                    </Box>

                    <Link to={''} 
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
                        // textDecoration: 'unset'
                        }}>
                      <Box display='flex' flexDirection='column' justifyContent='end' height='100%'>
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

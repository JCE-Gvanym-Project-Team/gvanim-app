import { Stack, Grid, Box, Typography } from '@mui/material'
import React from 'react'
import Logo from "../../../../Components/Logo/logo.png"
import { ColorModeContext } from '../../../theme';

export default function NoItems() {
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Grid item
        style={{
            // background: 'linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)',
            backgroundColor: 'inherit',
            overflow: 'initial',
            position: 'relative',
            // boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
       
            transition: '0.3s',
            alignItems: 'center',
            borderRadius: '16px',
            filter:
            colorMode?.getActualMode()! !== 'light' && colorMode?.getActualMode()! !== 'dark-contrast' && colorMode?.getActualMode()! !== 'bright-contrast'
                ? 'grayscale(1)'
                : colorMode?.getActualMode()! === 'bright-contrast'
                    ? 'brightness(0.7)' : 'brightness(1)',
        }}
            xs={12} sm={12} md={12} lg={12} xl={12}
           >

            <Stack direction='column' spacing={3} width='100%' sx={{
       
            }}>

                <Box display='flex' justifyContent='center'>
                    <Stack 
                    borderTop={'5px solid'}
                    borderRadius={4}
                     paddingTop={4}
                      paddingBottom={4} 
                       direction='column'
                        width='100%'
                         spacing={4}
                          sx={{
                            borderRadius: '0px 0px 10px 10px',
                            boxShadow: '0px 3px 10px',
                            color: 'primary.myBoxShadow',
                            borderColor: 'background.JobTitle2',
                        }}
                          >
                    <Box display='flex' justifyContent='center' paddingRight={2}>
                    <img style={{
                        height: 100,
                       
                    }} 
                    src={Logo} alt="Logo" />
                    </Box>

             <Stack direction='column' spacing={1}>
             <Typography color='primary.drushimTitle' variant='h2' textAlign='center'>
                    אנו מתנצלים,
                </Typography>

                <Typography variant='body2' color='secondary.drushimTitle' textAlign='center'>
                לא נמצאו משרות זמינות כרגע...
                </Typography>
             </Stack>
                    </Stack>
                    
                </Box>

               <Box alignItems='center' display='flex' flexDirection='column' justifyContent='center'>

     
     
               </Box>
            </Stack>

        </Grid>
    )
}

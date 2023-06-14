import { experimentalStyled as styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArticleOutlined, NewReleases } from '@mui/icons-material';





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',

}));

// const TypographyTitle = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',

// }));




export default function JobItem(props: { job: any }) {
    const { job } = props;

    const theme = useTheme();

    return (
        <Stack direction='row-reverse' sx={{   width: '643px',height: '431px'}}>
        <Item id='JobCard' sx={{
            height: '431px',
            borderTop: '5px solid #053B7A',
            borderRadius: '0px 0px 10px 10p',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            boxShadow: ' 0px 3px 10px #00000029',
             width: '621px',
            padding: 0,
            // border: '1px solid rgba(0, 0, 0, 0.095)',
            // borderRadius: '0.8rem',
            // ':hover': {transform: 'scale(1.1)'
            // 'translateY(-2px)'
            // }

        }}>
            <Box sx={{
                top: '48px',
                height: '55px',
                background: '#053B7A 0% 0% no-repeat padding-box',
                // bordeRadius: '31px 0px 0px 31px',
                borderRadius: '0px 31px 31px 0px',
                opacity: 1,
                marginTop: '48px',
                ml: '-22px',
            
                maxWidth: 'fit-content'
            }}>

                <Stack direction='column' justifyContent='center' sx={{ height: '100%',}}>
                    <Typography sx={{
                        textAlign: 'left',
                        fontFamily: "'Rubik'",
                        width: 'fit-content',
                        fontWeight: 'medium',
                         fontSize: '30px',
                        letterSpacing: '0px',
                    
                        color: '#FFFFFF',

                        opacity: 1,
                        ml: '47px',

                         mr: '40px',



                    }}>
                        תפקיד:לורם איפסום דולור סיט אמט
                    </Typography>
                </Stack>



            </Box>
        </Item>
        </Stack>
    )
}

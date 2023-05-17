import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import image from "../../../Components/Logo/Logo.svg"
import { ReactSVG } from 'react-svg'
import { BorderStyle } from 'react-bootstrap-icons'

export default function WelcomePage() {
    return (
        <>
            <Box sx={{
                marginTop: '-80px',
                height: '45vh',
                display: 'flex',
                justifyContent: 'center',
                background: 'linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)',
            }}
            >

            </Box>

            <Paper sx={{
                height: 'fit-content',
                color: 'rgba(0, 0, 0, 0.87)',
                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minWidth: '0px',
                overflowWrap: 'break-word',
                backgroundClip: 'border-box',
                border: '0px solid rgba(0, 0, 0, 0.125)',
                borderRadius: '0.75rem',
                overflow: 'visible',
                padding: '16px',
                marginTop: '-116px',
                marginBottom: '32px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'saturate(200%) blur(30px)',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
                marginLeft: '16px',
                marginRight: '16px'
            }}>


                <Grid sx={{
                    boxSizing: 'border-box',
                    display: { xs: 'block', sm: 'block', md: 'flex', lg: 'flex', xl: 'flex' },
                    flexFlow: 'row-wrap',
                    width: '100%',
                    margin: '0px auto',
                    flexBasis: '100%',
                    WebkitBoxFlex: 0,
                    flexGrow: 0,
                    maxWidth: '100%',
                }}>
                    <Box sx={{
                        minWidth: '33.33%',
                        padding: '16px',
                        textAlign: 'center',
                        lineHeight: 1,
                        opacity: 1,
                        background: 'transparent',
                        color: 'rgb(52, 71, 103)',
                        boxShadow: 'none',
                    }}>
                        <Typography
                            sx={{
                                fontFamily: '"Roboto Slab", sans-serif',
                                fontSize: '3rem',
                                lineHeight: 1.25,
                                fontWeight: 700,
                                opacity: 1,
                                textTransform: 'none',
                                verticalAlign: 'unset',
                                color: 'rgb(26, 115, 232)',
                                letterSpacing: '-0.125px',
                                backgroundImage: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
                                display: 'inline-block',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                position: 'relative',
                                zIndex: 1,
                                margin: '0px',
                                textDecoration: 'none'
                            }}
                        >
                            70
                        </Typography>

                        <Typography sx={{
                            margin: '16px 0px 8px',
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontSize: '1.25rem',
                            lineHeight: 1.375,
                            fontWeight: 700,
                            opacity: 1,
                            textTransform: 'none',
                            verticalAlign: 'unset',
                            textDecoration: 'none',
                            color: 'rgb(52, 71, 103)',
                            letterSpacing: '-0.125px',


                        }}>
                            משרות חדשות
                        </Typography>

                        <Typography sx={{
                            margin: '0px',
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 300,
                            lineHeight: 1.6,
                            opacity: 1,
                            textTransform: 'none',
                            verticalAlign: 'unset',
                            textDecoration: 'none',
                            color: 'rgb(123, 128, 154)',
                            letterSpacing: '-0.125px',

                        }}>
                            משרות חדשות שנוספו או עודכנו, למעבר לדף המשרות
                        </Typography>
                    </Box>

                    <Divider orientation="vertical" 
                    sx={{
                        flexShrink: 0,
                        borderTop: '0px solid rgba(0, 0, 0, 0.12)',
                        borderLeft: '0px solid rgba(0, 0, 0, 0.12)',
                        borderBottom: 'none',
                        opacity: 0.25,
                        background: 'rgba(52, 71, 103, 0.2)',
                        width: '0.0625rem',
                        height: '100%',
                        margin: '0px 1rem 0px 0px',
                        borderRight: 'none',
                    }} />
 
                    <Box sx={{
                        minWidth: '33.33%',
                        padding: '16px',
                        textAlign: 'center',
                        lineHeight: 1,
                        opacity: 1,
                        background: 'transparent',
                        color: 'rgb(52, 71, 103)',
                        boxShadow: 'none',
                    }}>
                        <Typography
                            sx={{
                                fontFamily: '"Roboto Slab", sans-serif',
                                fontSize: '3rem',
                                lineHeight: 1.25,
                                fontWeight: 700,
                                opacity: 1,
                                textTransform: 'none',
                                verticalAlign: 'unset',
                                color: 'rgb(26, 115, 232)',
                                letterSpacing: '-0.125px',
                                backgroundImage: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
                                display: 'inline-block',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                position: 'relative',
                                zIndex: 1,
                                margin: '0px',
                                textDecoration: 'none'
                            }}
                        >
                            13
                        </Typography>

                        <Typography sx={{
                            margin: '16px 0px 8px',
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontSize: '1.25rem',
                            lineHeight: 1.375,
                            fontWeight: 700,
                            opacity: 1,
                            textTransform: 'none',
                            verticalAlign: 'unset',
                            textDecoration: 'none',
                            color: 'rgb(52, 71, 103)',
                            letterSpacing: '-0.125px',


                        }}>
                            דוחות חדשים
                        </Typography>

                        <Typography sx={{
                            margin: '0px',
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 300,
                            lineHeight: 1.6,
                            opacity: 1,
                            textTransform: 'none',
                            verticalAlign: 'unset',
                            textDecoration: 'none',
                            color: 'rgb(123, 128, 154)',
                            letterSpacing: '-0.125px',

                        }}>
                            Save 3-4 weeks of work when you use our pre-made pages for your website
                        </Typography>
                    </Box>

                    <Divider sx={{
                        flexShrink: 0,
                        borderTop: '0px solid rgba(0, 0, 0, 0.12)',
                        borderLeft: '0px solid rgba(0, 0, 0, 0.12)',
                        borderBottom: 'none',
                        opacity: 0.25,
                        background: 'rgba(52, 71, 103, 0.2)',
                        width: '0.0625rem',
                        height: '100%',
                        margin: '0px 1rem 0px 0px',
                        borderRight: 'none',
                    }} />


                    <Box sx={{
                        minWidth: '33.33%',
                        padding: '16px',
                        textAlign: 'center',
                        lineHeight: 1,
                        opacity: 1,
                        background: 'transparent',
                        color: 'rgb(52, 71, 103)',
                        boxShadow: 'none',
                    }}>
                        <Typography
                            sx={{
                                fontFamily: '"Roboto Slab", sans-serif',
                                fontSize: '3rem',
                                lineHeight: 1.25,
                                fontWeight: 700,
                                opacity: 1,
                                textTransform: 'none',
                                verticalAlign: 'unset',
                                color: 'rgb(26, 115, 232)',
                                letterSpacing: '-0.125px',
                                backgroundImage: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
                                display: 'inline-block',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                position: 'relative',
                                zIndex: 1,
                                margin: '0px',
                                textDecoration: 'none'
                            }}
                        >
                            22
                        </Typography>

                        <Typography sx={{
                            margin: '16px 0px 8px',
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontSize: '1.25rem',
                            lineHeight: 1.375,
                            fontWeight: 700,
                            opacity: 1,
                            textTransform: 'none',
                            verticalAlign: 'unset',
                            textDecoration: 'none',
                            color: 'rgb(52, 71, 103)',
                            letterSpacing: '-0.125px',


                        }}>
                            מועמדים חדשים
                        </Typography>

                        <Typography sx={{
                            margin: '0px',
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 300,
                            lineHeight: 1.6,
                            opacity: 1,
                            textTransform: 'none',
                            verticalAlign: 'unset',
                            textDecoration: 'none',
                            color: 'rgb(123, 128, 154)',
                            letterSpacing: '-0.125px',

                        }}>
                            Save 3-4 weeks of work when you use our pre-made pages for your website
                        </Typography>
                    </Box>
                </Grid>


            </Paper>

        </>
    )
}

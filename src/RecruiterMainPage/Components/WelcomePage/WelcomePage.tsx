import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { BoxGradientSx, MyBoxSectionSx, MyDividerSx, MyGridSx, MyPaperSx, MyTypographyInfoSx, MyTypographyMainSx, MyTypographyTitleSx } from './WelcomePageStyle'

export default function WelcomePage() {
    return (
        <>
            <Box sx={BoxGradientSx} />

            <Paper sx={MyPaperSx}>


                <Grid sx={MyGridSx}>
                    <Box sx={MyBoxSectionSx}>
                        <Typography sx={MyTypographyMainSx}>
                            70
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            משרות חדשות
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            משרות חדשות שנוספו או עודכנו, למעבר לדף המשרות
                        </Typography>
                    </Box>

                    <Divider sx={MyDividerSx} />
 
                    <Box sx={MyBoxSectionSx}>

                        <Typography sx={MyTypographyMainSx}>
                            13
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            דוחות חדשים
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            Save 3-4 weeks of work when you use our pre-made pages for your website
                        </Typography>
                    </Box>

                    <Divider sx={MyDividerSx} />


                    <Box sx={MyBoxSectionSx}>
                        <Typography sx={MyTypographyMainSx}>
                            22
                        </Typography>

                        <Typography sx={MyTypographyTitleSx}>
                            מועמדים חדשים
                        </Typography>

                        <Typography sx={MyTypographyInfoSx}>
                            Save 3-4 weeks of work when you use our pre-made pages for your website
                        </Typography>
                    </Box>
                </Grid>


            </Paper>

        </>
    )
}

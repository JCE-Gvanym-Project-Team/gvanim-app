import { Avatar, Box, Button, Container, Divider, FormControl, Grid, InputLabel, Paper, Slider, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'
import { BoxGradientSx, MyPaperSx } from './NewJobStyle'
import Assignment from '@mui/icons-material/Assignment';
import RangeSlider from './Components/ScopeSlider/ScopeSlider';


export default function NewJobPage() {

    return (
        <>
            <Box sx={BoxGradientSx}></Box>

            <Box sx={MyPaperSx}>

                <Box>
                    <Container>
                        <Box >
                            <Box className="col-md-12">
                                <Box className="section-title">

                                    <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'rgb(52, 71, 103)', textAlign: 'center' }} variant='h3'>משרה חדשה</Typography>

                                    <Typography className='mt-1' sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'rgb(123, 128, 154)', textAlign: 'center' }} variant='subtitle1'>
                                        לתשומת ליבך: פעולה זו תיצור משרה חדשה ומס' משרה חדש.</Typography>

                                    <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />

                                    <FormControl sx={{ width: '100%' }} className='mt-3'>

                                        <Box className="form-group">
                                            <Box className="row">
                                                <Box className="col-md-6 mt-1" >
                                                    <label>
                                                        <Typography sx={{ fontWeight: 600, fontSize: 13 }}>שם המשרה:</Typography>
                                                    </label>
                                                    <input placeholder="שם המשרה (title)" id="_JobName" type="text"
                                                        className="form-control" required />

                                                </Box>
                                                <Box className="col-md-6 mt-1">
                                                    <label>
                                                        <Typography sx={{ fontWeight: 600, fontSize: 13 }}>תפקיד:</Typography>
                                                    </label>
                                                    <input placeholder="תפקיד (role)" id="_role" type="text"
                                                        className="form-control" aria-describedby="emailHelp"
                                                        required />
                                                    {/* <TextField sx={MyTextFieldSx} fullWidth id="standard-basic" label="שם המשרה" variant="standard" required /> */}

                                                </Box>
                                            </Box>
                                        </Box>


                                        <Box className="form-group">
                                            <Box className="row">
                                                <Box className="col-md-6 mt-1">
                                                    <label>
                                                        <Typography sx={{ fontWeight: 600, fontSize: 13 }}>איזור:</Typography>
                                                    </label>
                                                    <input placeholder="איזור (region)" id="_region" type="text"
                                                        className="form-control" required />

                                                </Box>
                                                <Box className="col-md-6 mt-1">
                                                    <label>
                                                        <Typography sx={{ fontWeight: 600, fontSize: 13 }}>Label:</Typography>
                                                    </label>
                                                    <input placeholder="(Job_state)" id="_job_state" type="text"
                                                        className="form-control" aria-describedby="emailHelp"
                                                        required />
                                                    {/* <TextField sx={MyTextFieldSx} fullWidth id="standard-basic" label="שם המשרה" variant="standard" required /> */}

                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box className="form-group mt-1">
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>דרישות:</Typography>
                                            </label>
                                            <input placeholder="דרישות (requirements)" id="_requirements" type="text"
                                                className="form-control" required />
                                        </Box>

                                        <Box className="form-group mt-1">
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>תיאור המשרה:</Typography>
                                            </label>
                                            <TextareaAutosize placeholder="Description" id="_description"
                                                className="form-control" minRows={2}
                                                required />
                                        </Box>

                                        <Box className="form-group mt-1">
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>Label:</Typography>
                                            </label>
                                            <TextareaAutosize placeholder="Description_skills" id="_description_skills"
                                                className="form-control" minRows={2}
                                                required />
                                        </Box>


                                        <Box className="form-group mt-1">
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>מידע נוסף:</Typography>
                                            </label>
                                            <TextareaAutosize placeholder="מידע נוסף (additional_info)" id="_additional_info"
                                                className="form-control" minRows={3}
                                                required />
                                        </Box>

                                        <Box className="form-group mt-1">
                                        <label>
                                                    <Typography sx={{fontWeight: 600,fontSize:13 }}>היקף המשרה:</Typography>
                                                    </label>
                                            <RangeSlider />
                                        </Box>
                                        {/* <button type="submit" className="primary-btn submit">Submit</button> */}

                                        <Button className='mt-3 mb-3' variant='contained' sx={{ backgroundColor: 'rgb(52, 71, 103)',
                                    ":hover": {
                                        bgcolor: "rgb(52, 71, 103)",
                                      } }} fullWidth> פרסם</Button>
                                    </FormControl>
                                </Box>
                            </Box>

                        </Box>

                    </Container>
                </Box>

            </Box>


        </>
    )
}

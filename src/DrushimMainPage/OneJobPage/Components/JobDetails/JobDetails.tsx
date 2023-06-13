import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function FloatingBox(props: { job }) {
    const { job } = props;
    const [floatingTop, setFloatingTop] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(10);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            if (scrollTop >= floatingTop && scrollTop <= containerHeight) {
                setFloatingTop(scrollTop);
            }
        };



        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);

        };
    }, [floatingTop, containerHeight]);

    return (

        <Box
            sx={{
                position: "sticky",
                top: floatingTop,
                maxHeight: "416px",
                paddingLeft: "55px",
                paddingRight: "30px",
                backgroundColor: "background.jobDetails",
                boxShadow: "0px 3px 10px #00000029",
                borderRadius: "10px",
                flex: 4,
                zIndex: 5
            }
            }
        >
            <Box sx={{
                backgroundColor: "background.JobDetailsText",
                color: "primary.textBright",
                borderRadius: "0px 31px 31px 0px",
                marginBottom: "42px",
                marginTop: "35px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "-110px",
                marginRight: "100px",
                paddingLeft: "55px"
                
            }}>
                <Typography variant='h2' sx={{  
                    paddingRight: "33px",
                    textAlign: "left",
                    alignSelf: "center",
                    justifySelf: "center",
                    paddingBottom: "10px",
                    paddingTop: "9px",

                }}
                >
                    פרטי משרה:
                </Typography>
            </Box>
            {/* job location */}
            < Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "43px"
                }}
            >
                <Typography variant='h4'>
                    מיקום:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h4'
                >
                    {job?._region}
                </Typography>
            </Box >

            {/* job role */}
            < Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "43px"
                }}
            >
                <Typography variant='h4'>
                    תפקיד:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h4'
                >
                    {job?._role}
                </Typography>
            </Box >

            {/* job scope */}
            < Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "43px",
                }}
            >
                <Typography variant='h4'>
                    היקף משרה:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h4'
                >
                    {job?._scope.slice(0).reverse().map((num, index) => index !== job._scope.length - 1 ? num + "%-" : num + "%")}
                </Typography>
            </Box >

            {/* job ID */}
            < Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "43px"
                }}
            >
                <Typography variant='h4'>
                    מס' משרה:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h4'
                >
                    {job?._jobNumber}
                </Typography>
            </Box >
        </Box >

    );
};

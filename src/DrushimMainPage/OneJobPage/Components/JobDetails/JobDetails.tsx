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
                maxWidth: "16.97916vw",
                backgroundColor: "background.jobDetails",
                boxShadow: "0px 3px 10px #00000029",
                borderRadius: "10px",
                flex: 4,
                zIndex: 5
            }
            }
        >
            <Typography variant='h1' sx={{
                marginBottom: "42px",
                backgroundColor: "background.JobDetailsText",
                color: "primary.textBright",
                width: "12vw",
                marginTop: "35px"
            }}
            >
                פרטי משרה
            </Typography>
            {/* job location */}
            < Box
                sx={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "row",
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
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "row"
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
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "row"
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
                    {job?._scope.slice(0).reverse().map((num, index) => index !== job._scope.length - 1 ? num + "% - " : num + "%")}
                </Typography>
            </Box >

            {/* job ID */}
            < Box
                sx={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "row"
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

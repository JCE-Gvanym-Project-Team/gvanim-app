import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function FloatingBox(props: { job })
{
    const { job } = props;
    const [floatingTop, setFloatingTop] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(220);

    useEffect(() =>
    {
        const handleScroll = () =>
        {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            if (scrollTop >= floatingTop && scrollTop <= containerHeight)
            {
                setFloatingTop(scrollTop);
            }
        };

        

        window.addEventListener('scroll', handleScroll);

        return () =>
        {
            window.removeEventListener('scroll', handleScroll);
            
        };
    }, [floatingTop, containerHeight]);

    return (

        < Box
            sx={{
                position: "sticky",
                top: floatingTop,
                maxHeight: "416px",
                maxWidth: "16.97916vw",
                backgroundColor: "background.box",
                flex: 4
            }
            }
        >
            {/* job location */}
            < Box
                sx={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "row"
                }}
            >
                <Typography variant='h3'>
                    מיקום:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h3'
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
                <Typography variant='h3'>
                    תפקיד:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h3'
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
                <Typography variant='h3'>
                    היקף משרה:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h3'
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
                <Typography variant='h3'>
                    מס' משרה:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h3'
                >
                    {job?._jobNumber}
                </Typography>
            </Box >
        </Box >

    );
};

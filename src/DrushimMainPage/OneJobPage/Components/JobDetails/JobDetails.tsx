import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Icon, Typography } from '@mui/material';
import { ReactComponent as JobRoleSVG } from '../../Resources/JobRole.svg';
import { ReactComponent as JobLocationSVG } from '../../Resources/JobLocation.svg';
import { ReactComponent as JobScopeSVG } from '../../Resources/JobScope.svg';
import { ReactComponent as JobStartSVG } from '../../Resources/JobStart.svg';

export default function FloatingBox(props: { job })
{
    const { job } = props;
    const [floatingTop, setFloatingTop] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(10);

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

        <Box
            sx={{
                position: "sticky",
                top: floatingTop,
                maxHeight: "416px",
                backgroundColor: "background.jobDetails",
                boxShadow: "0px 3px 10px #00000029",
                borderRadius: "10px",
                flex: 35,
                zIndex: 5,
                width: "fit-content"
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
                alignItems: "start",
                justifyContent: "start",
                marginLeft: "-47px",
                paddingLeft: "47px",
                width: "fit-content"

            }}>
                <Typography variant='h2' sx={{
                    textAlign: "left",
                    paddingBottom: "10px",
                    paddingTop: "9px",
                    paddingRight: "33px",
                }}
                >
                    פרטי משרה:
                </Typography>
            </Box>

            {/* job role */}
            < Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "43px",
                    paddingLeft: "55px"
                }}
            >
                {/* Icon */}
                <Box sx={{
                    overflow: 'hidden',
                    zIndex: "-1"
                }}>
                    <Icon sx={{
                        height: 19,
                        width: 17,
                        zIndex: "-1",
                        marginRight: "25px",
                    }} component={JobRoleSVG} />
                </Box>
                <Typography variant='h4' sx={{ color: "secondary.jobDetails" }}>
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
                    paddingLeft: "55px"
                }}
            >
                {/* Icon */}
                <Box sx={{
                    overflow: 'hidden',
                    zIndex: "-1"
                }}>
                    <Icon sx={{
                        height: 19,
                        width: 17,
                        zIndex: "-1",
                        marginRight: "25px",
                    }} component={JobScopeSVG} />
                </Box>
                <Typography variant='h4' color="secondary.jobDetails">
                    היקף משרה:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h4'
                >
                    {job?._scope[0] !== job?._scope[1] ? job?._scope.slice(0).reverse().map((num, index) => (index !== job._scope.length - 1) ? num + "%-" : num + "%") : job?._scope[0] + "%"}
                </Typography>
            </Box >

            {/* job location */}
            < Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "43px",
                    paddingLeft: "55px"
                }}
            >
                {/* Icon */}
                <Box sx={{
                    overflow: 'hidden',
                    zIndex: "-1"
                }}>
                    <Icon sx={{
                        height: 19,
                        width: 17,
                        zIndex: "-1",
                        marginRight: "25px",
                    }} component={JobLocationSVG} />
                </Box>

                <Typography variant='h4' sx={{ color: "secondary.jobDetails" }}>
                    מיקום:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner",
                    }}
                    variant='h4'
                >
                    {job?._region}
                </Typography>
            </Box >

            {/* job ID */}
            < Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "43px",
                    paddingLeft: "55px"
                }}
            >
                {/* Icon */}
                <Box sx={{
                    overflow: 'hidden',
                    zIndex: "-1"
                }}>
                    <Icon sx={{
                        height: 19,
                        width: 17,
                        zIndex: "-1",
                        marginRight: "25px",
                    }} component={JobStartSVG} />
                </Box>

                <Typography variant='h4' sx={{ color: "secondary.jobDetails" }}>
                    תחילת עבודה:
                </Typography>
                <Typography
                    sx={{
                        marginLeft: "1rem",
                        backgroundColor: "background.boxInner"
                    }}
                    variant='h4'
                >
                    {/* TODO: add job start */}
                    {job?._jobNumber}
                </Typography>
            </Box >
        </Box >

    );
};

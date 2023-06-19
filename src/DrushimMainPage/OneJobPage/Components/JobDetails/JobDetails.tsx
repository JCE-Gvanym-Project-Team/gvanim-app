import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Icon, Typography } from '@mui/material';
import { ReactComponent as JobRoleSVG } from '../../Resources/JobRole.svg';
import { ReactComponent as JobLocationSVG } from '../../Resources/JobLocation.svg';
import { ReactComponent as JobScopeSVG } from '../../Resources/JobScope.svg';
import { ReactComponent as JobStartSVG } from '../../Resources/JobStart.svg';
import { ReactComponent as YellowEllipseSVG } from '../../Resources/YellowEllipse.svg'
import { ReactComponent as PinkEllipseSVG } from '../../Resources/PinkEllipse.svg'

export default function JobDetails(props: { job, screenSize })
{
    const { job, screenSize } = props;
    const [floatingTop, setFloatingTop] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(100);

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
        <Box sx={{ flex: { xs: 0, md: 45 }, marginTop: { xs: "102px", md: "0" },  }}>
            {/* Ellipses */}
            <Box sx={{
                width: '100%',
                zIndex: "4",
            }}
            >
                <Icon sx={{
                    position: "absolute",
                    // top: "543px",
                    marginLeft: { xs: "-50px", md: "200px", lg: "250px" },
                    marginTop: { xs: "300px", md: "-70px" },
                    width: { xs: "171px", md: '133px' },
                    height: { xs: "171px", md: '133px' },
                    zIndex: "4"
                }} component={YellowEllipseSVG} />
                <Icon sx={{
                    position: "absolute",
                    marginTop: { xs: "-70px", md: "200px" },
                    marginLeft: { xs: "200px", md: "-70px" },
                    width: '133px',
                    height: '133px',
                    zIndex: "4"
                }} component={PinkEllipseSVG} />
            </Box>
            <Box
                sx={{
                    position: "sticky",
                    top: floatingTop,
                    maxHeight: "fit-content",
                    paddingRight: "50px",
                    paddingBottom: "46px",
                    paddingTop: "35px",
                    backgroundColor: "background.jobDetails",
                    boxShadow: "0px 3px 10px #00000029",
                    borderRadius: "10px",
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
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent: "start",
                    marginLeft: { xs: "-26px", md: "-47px" },
                    paddingLeft: { xs: "26px", md: "47px" },
                    width: "fit-content"

                }}>
                    <Typography variant={screenSize === "xs" ? "subtitle1" : 'h2'} sx={{
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
                        marginBottom: { xs: "28px", md: "43px" },
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
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h4'} sx={{ color: "secondary.jobDetails" }}>
                        תפקיד:
                    </Typography>
                    <Typography
                        sx={{
                            marginLeft: "10px",
                            color: "secondary.descAndReqText"
                        }}
                        variant={screenSize === "xs" ? "subtitle2" : 'h4'}
                    >
                        {job?._role}
                    </Typography>
                </Box >

                {/* job scope */}
                < Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: { xs: "28px", md: "43px" },
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
                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h4'} color="secondary.jobDetails" sx={{ minWidth: "50px" }}>
                        היקף משרה:
                    </Typography>
                    <Typography
                        sx={{
                            marginLeft: "10px",
                            color: "secondary.descAndReqText"
                        }}
                        variant={screenSize === "xs" ? "subtitle2" : 'h4'}
                    >
                        {job?._scope[0] !== job?._scope[1] ? job?._scope.slice(0).reverse().map((num, index) => (index !== job._scope.length - 1) ? num + "%-" : num + "%") : job?._scope[0] + "%"}
                    </Typography>
                </Box >

                {/* job location */}
                < Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: { xs: "28px", md: "43px" },
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

                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h4'} sx={{ color: "secondary.jobDetails" }}>
                        מיקום:
                    </Typography>
                    <Typography
                        sx={{
                            marginLeft: "10px",
                            color: "secondary.descAndReqText"
                        }}
                        variant={screenSize === "xs" ? "subtitle2" : 'h4'}
                    >
                        {job?._region}
                    </Typography>
                </Box >

                {/* job Start */}
                < Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
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

                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h4'} sx={{ color: "secondary.jobDetails", minWidth: { xs: "100px", md: "126px" } }}>
                        תחילת עבודה:
                    </Typography>
                    <Typography
                        sx={{
                            marginLeft: "10px",
                            color: "secondary.descAndReqText"
                        }}
                        variant={screenSize === "xs" ? "subtitle2" : 'h4'}
                    >
                        {job?._startOn}
                    </Typography>
                </Box >
            </Box >
        </Box>
    );
};

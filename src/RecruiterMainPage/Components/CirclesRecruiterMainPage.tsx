import React from "react";
import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const CircleGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const Circle = styled(Link)(({ theme }) => ({
  width: "15rem",
  height: "15rem",
  border: `2px solid ${theme.palette.primary.dark}`,
  borderRadius: "100%",
  background: "linear-gradient(180deg, #00BFFF 0%, #00BFFF  100%)", //what is the code og linear-gradient bblue? #00BFFF
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.7rem",
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: theme.typography.h3.lineHeight,
  textShadow: `0 0 3px ${theme.palette.primary.dark}`,
  margin: "75px 50px",
  marginTop: "8.125rem",
  textDecoration: "none",
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    borderRadius: "100%",
    background: "rgba(255, 255, 255, 0.1)",
    zIndex: 1,
    opacity: 0,
    transition: "all 0.2s ease-in-out",
  },
  "&:hover::before": {
    opacity: 1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0)",
    width: "100%",
    height: "100%",
    borderRadius: "100%",
    background: "rgba(255, 255, 255, 0.1)",
    zIndex: 2,
    transition: "all 0.2s ease-in-out",
  },
  "&:hover::after": {
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 0,
  },
  [theme.breakpoints.down("sm")]: {
    width: "9rem",
    height: "9rem",
    fontSize: "0.99rem",
    margin: "25px 20px",
    marginTop: "50px",
  },
}));

// the circles that show the number of jobs and unread resumes
const Circles = ({ jobsCount, unreadResumesCount }) => {
  return (
    <CircleGroup>
      <Circle to="/manageJobs">
        <p>{jobsCount}</p>
        <span> משרות באתר</span>
      </Circle>
      <Circle to="/manageCandidates">
        <p>{unreadResumesCount}</p>
        <span> קו"ח חדשים</span>
      </Circle>
    </CircleGroup>
  );
};

export default Circles;

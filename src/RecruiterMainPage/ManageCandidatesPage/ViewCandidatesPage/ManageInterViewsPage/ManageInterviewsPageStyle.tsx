import React from 'react'
import { SxProps } from '@mui/material/styles';
import { GlobalStyle, ManageCandidatesPageGlobalStyle } from '../../../PageStyles';
import { CSSProperties } from '@mui/material/styles/createTypography';


export const textSx: SxProps = {
    color: 'black',
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
}

export const candidateNameAndButtonSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    justifySelf: 'stretch',
    flexGrow: '1'
}

export const interviewSummaryTextSx: SxProps = {
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
    fontWeight: "bold",
    fontSize: "28px",
    marginBottom: "1rem"
}

export const interviewSummaryContentSx: SxProps = {
    width: { sx: "100%", md: "100%" },
    marginBottom: "1rem"
}

export const scheduleInterviewButton: SxProps = {
    backgroundColor: ManageCandidatesPageGlobalStyle.editDetailsButtonColor,
    alignSelf: 'center',
    marginBottom: "1rem",
    width: {xs: "50vw", md: "100%"}
}

export const chooseJobAndInterviewContainerSx: SxProps = {
    display: "flex",
    flexDirection: {xs: "column", md:"row"},
    justifyContent: "center",
    width: "100%"
}

export const autoCompleteSx: SxProps = {
    width: { xs: "100vw", md: "300px" }
}

export const scheduleInterviewText: SxProps = {
    color: "grey",
    marginRight: "0.5rem"
}

export const chooseJobContainerSx: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "fit-content",
    marginRight: { sx: "0", md: "3rem" },
    marginBottom: "3rem"
}

export const appliedDateTextSx: SxProps = {
    color: "#6e6e6e"
}

export const interviewSummaryButtonsContainerSx: SxProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "1rem",
    marginBottom: "4rem"
}

export const interviewSummaryRedButtonsContainerSx: SxProps = {
    width: { sx: "100%", md: "90%" },
    display: "flex",
    justifyContent: "end"
}

export const scheduleInterviewContainer: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}

export const jobTextSx: SxProps = {
    color: 'black',
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
    marginTop: '1rem'

}

export const candidateNameSx: SxProps = {
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
    textDecoration: "bold",
    marginLeft: '1rem',
    fontWeight: "bold",
    color: "#fff"

}

export const titleSx: SxProps = {
    color: GlobalStyle.NavbarBackgroundColor,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,

}

export const errorTextSx: SxProps = {
    color: "red",
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily
}

export const ContainerGradientSx: SxProps = {
    marginTop: "1rem",
    marginLeft: { xs: '0', md: "3rem" },
    marginRight: { xs: '0', md: "3rem" },
    paddingBottom: '32px',
    paddingLeft: { xs: '0', md: "3rem" },
    paddingRight: { xs: '0', md: "3rem" },
    paddingTop: "-300px",
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
}

export const mainStackSx: SxProps = {
    marginTop: '1rem',
    justifyContent: 'space-between',

}
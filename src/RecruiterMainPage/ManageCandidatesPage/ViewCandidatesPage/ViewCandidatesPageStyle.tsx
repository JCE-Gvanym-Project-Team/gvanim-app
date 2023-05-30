import React from 'react'
import { SxProps } from '@mui/material/styles';
import { GlobalStyle, ManageCandidatesPageGlobalStyle } from '../../PageStyles';

export const editButtonSx: SxProps = {
    backgroundColor: ManageCandidatesPageGlobalStyle.editDetailsButtonColor,
    alignSelf: 'end',
}

export const notesButtonSx: SxProps = {
    backgroundColor: ManageCandidatesPageGlobalStyle.notesButtonColor,
    alignSelf: 'end',
}

export const changeJobButtonSx: SxProps = {
    backgroundColor: ManageCandidatesPageGlobalStyle.changeJobButtonColor,
    alignSelf: 'end',
}

export const recommendationsButtonSx: SxProps = {
    backgroundColor: ManageCandidatesPageGlobalStyle.recommendationsButtonColor,
    alignSelf: 'end',
}

export const interviewsButtonSx: SxProps = {
    backgroundColor: ManageCandidatesPageGlobalStyle.interviewsButtonColor,
    alignSelf: 'end',
}

export const textSx: SxProps = {
    color: 'black',
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
}

export const candidateNameAndEditButtonContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    justifySelf: 'stretch',
    flexGrow: '1'
}

export const jobTextSx: SxProps = {
    color: 'black',
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
    marginTop: '1rem'
    
}

export const candidateNameSx: SxProps = {
    color: 'black',
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
    textDecoration: "bold",
    marginLeft: '1rem',

}

export const titleSx: SxProps = {
    color: GlobalStyle.NavbarBackgroundColor,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,

}

export const BoxGradientSx: SxProps = {
    marginTop: '-80px',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(to left, #7795f8, #7795f8,#555abf)',
}

export const ContainerGradientSx: SxProps = {
    marginTop: "1rem",
    marginLeft: '3rem',
    marginRight: '3rem',
    paddingBottom: '32px',
    paddingLeft: "3rem",
    paddingRight: "3rem",
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
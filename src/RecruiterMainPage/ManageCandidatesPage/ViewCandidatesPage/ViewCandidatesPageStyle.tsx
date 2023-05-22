import React from 'react'
import { SxProps } from '@mui/material/styles';
import { GlobalStyle, ManageCandidatesPageGlobalStyle } from '../../PageStyles';

export const editButtonSx: SxProps = {
    backgroundColor: 'green',
    alignSelf: 'end',
    
}

export const textSx: SxProps = {
    color: 'black',
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
    
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
    position: "absolute",
    top: '0',
    left: '0',
    width: "100%",
    height: ManageCandidatesPageGlobalStyle.backgroundHeight,
    background: ManageCandidatesPageGlobalStyle.backgroundGradient,
    zIndex: '-1'
}

export const ContainerGradientSx: SxProps = {
    marginTop: ManageCandidatesPageGlobalStyle.marginFromNavbar,
    marginBottom: '32px',
    marginLeft: '3rem',
    marginRight: '3rem',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

}

export const mainStackSx: SxProps = {
    marginTop: ManageCandidatesPageGlobalStyle.marginFromNavbar,
    justifyContent: 'space-between',
    
}
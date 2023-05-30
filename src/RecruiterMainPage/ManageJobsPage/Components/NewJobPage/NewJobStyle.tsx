import { SxProps } from "@mui/material";

export const MyTextFieldSx = {
    boxShadow: '0px 2px 24px #DAECFF',
    
    "& .MuiInputBase-input": {
        fontSize: '0.875rem',
    },
}

export const BoxGradientSx: SxProps = {
    marginTop: '-80px',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(to left, #7795f8, #7795f8,#555abf)',
}

export const MyTitleBoxSx: SxProps = {
    height: 'fit-content',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '0px',
    overflowWrap: 'break-word',
    backgroundClip: 'border-box',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '0.75rem',
    overflow: 'visible',
    padding: '16px',
    marginTop: '-132px',
    marginBottom: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
}
export const MyPaperSx: SxProps = {
    height: 'fit-content',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginLeft: '3rem',
    marginRight: '3rem',
    minWidth: '0px',
    overflowWrap: 'break-word',
    backgroundClip: 'border-box',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '0.75rem',
    overflow: 'visible',
    padding: '16px',
    marginTop: '-11rem',
    marginBottom: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
}
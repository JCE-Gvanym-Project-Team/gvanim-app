import { SxProps } from "@mui/material";

export const MyTextFieldSx1: SxProps = {
    "& .MuiOutlinedInput-root": {
        
        "&:hover fieldset": {
            color: '#212529',
            border: '1px solid #ced4da',
            outline: 0,


        },
        "&.Mui fieldset": {
            color: '#212529',
            border: '1px solid #ced4da',
            outline: 0,


        },
        "&.Mui-focused fieldset": {
            border: '1px solid #86b7fe',
            color: '#212529',
            outline: 0,
            boxShadow: '0 0 0 0.25rem rgba(13,110,253,.25)'
        },

    },

}
export const MyTextFieldSx: SxProps = {
    "& .MuiOutlinedInput-root": {
        
        "&:hover fieldset": {
            color: '#212529',
            border: '1px solid #ced4da',
            outline: 0,


        },
        "&.Mui fieldset": {
            color: '#212529',
            border: '1px solid #ced4da',
            outline: 0,


        },
        "&.Mui-focused fieldset": {
            border: '1px solid #86b7fe',
            color: '#212529',
            outline: 0,
            boxShadow: '0 0 0 0.25rem rgba(13,110,253,.25)'
        },

    },

}

export const BoxGradientSx: SxProps = {
    marginTop: '-80px',
    height: '45vh',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)',
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
import { SxProps } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createTypography";

export const MyTextFieldSx = {
    boxShadow: '0px 2px 24px #DAECFF',

    "& .MuiInputBase-input": {
        fontSize: '0.875rem',
    },
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

export const BoxGradientSx: SxProps = {
    minHeight: '400px',
    width: "100%",
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(to left, #7795f8, #7795f8,#555abf)',
}

export const MyPaperSx: SxProps = {
    width: { sm: "100%", md: "70%" },
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
    marginTop: "-10rem",
    marginBottom: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
}

export const MyTextFieldStyle: CSSProperties = {
    maxWidth: "max-content",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "0.875rem",
    fontWeight: "400",
    lineHeight: "1.5",
    padding: "12px",
    borderRadius: "4px",
    color: "#24292f",
    border: "1px solid #d0d7de",
    boxShadow: "0px 2px 24px #DAECFF",

    "&:hover": {
        borderColor: "#3399FF"
    },

    "&:focus": {
        borderColor: "#3399FF",
        boxShadow: "0 0 0 3px #b6daff"
    },

    "&:focus-visible": {
        outline: 0
    }
}
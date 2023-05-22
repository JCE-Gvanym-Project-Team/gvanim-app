import { SxProps } from "@mui/material";


export const BoxGradientSx: SxProps = {
    marginTop: '-80px',
    height: '45vh',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)'
}


export const MyPaperSx: SxProps = {
    height: 'fit-content',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minWidth: '0px',
    overflowWrap: 'break-word',
    backgroundClip: 'border-box',
    border: '0px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '0.75rem',
    overflow: 'visible',
    padding: '16px',
    marginTop: '-116px',
    marginBottom: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
    marginLeft: '16px',
    marginRight: '16px'
}

export const MyGridSx: SxProps = {
    boxSizing: 'border-box',
    display: { xs: 'block', sm: 'block', md: 'flex', lg: 'flex', xl: 'flex' },
    flexFlow: 'row-wrap',
    width: '100%',
    margin: '0px auto',
    flexBasis: '100%',
    WebkitBoxFlex: 0,
    flexGrow: 0,
    maxWidth: '100%'
}

export const MyBoxSectionSx: SxProps = {
    minWidth: '33.33%',
    padding: '16px',
    textAlign: 'center',
    lineHeight: 1,
    opacity: 1,
    background: 'transparent',
    color: 'rgb(52, 71, 103)',
    boxShadow: 'none'
}

export const MyTypographyMainSx: SxProps = {
    fontFamily: '"Roboto Slab", sans-serif',
    fontSize: '3rem',
    lineHeight: 1.25,
    fontWeight: 700,
    opacity: 1,
    textTransform: 'none',
    verticalAlign: 'unset',
    color: 'rgb(26, 115, 232)',
    letterSpacing: '-0.125px',
    backgroundImage: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
    display: 'inline-block',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    zIndex: 1,
    margin: '0px',
    textDecoration: 'none'
}

export const MyTypographyTitleSx: SxProps = {
    margin: '16px 0px 8px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '1.25rem',
    lineHeight: 1.375,
    fontWeight: 700,
    opacity: 1,
    textTransform: 'none',
    verticalAlign: 'unset',
    textDecoration: 'none',
    color: 'rgb(52, 71, 103)',
    letterSpacing: '-0.125px'
}
export const MyTypographyInfoSx: SxProps = {
    margin: '0px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '1rem',
    fontWeight: 300,
    lineHeight: 1.6,
    opacity: 1,
    textTransform: 'none',
    verticalAlign: 'unset',
    textDecoration: 'none',
    color: 'rgb(123, 128, 154)',
    letterSpacing: '-0.125px'
}

export const MyDividerSx: SxProps = {
    flexShrink: 0,
    borderTop: '0px solid rgba(0, 0, 0, 0.12)',
    borderLeft: '0px solid rgba(0, 0, 0, 0.12)',
    borderBottom: 'none',
    opacity: 0.25,
    background: 'rgba(52, 71, 103, 0.2)',
    width: '0.0625rem',
    height: '100%',
    margin: '0px 1rem 0px 0px',
    borderRight: 'none'
}

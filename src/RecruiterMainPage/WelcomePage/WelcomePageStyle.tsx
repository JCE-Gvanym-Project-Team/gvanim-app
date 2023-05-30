import { SxProps } from "@mui/material";


export const BoxGradientSx: SxProps = {
    marginTop: '-80px',
    height: '65vh',
    display: 'flex',
    justifyContent: 'center',
    clipPath: 'polygon(0px 0px, 100% 0%, 100% 84%, 0% 100%)',
    background: 'linear-gradient(to left, #7795f8, #7795f8,#555abf)',
    // background: 'linear-gradient(150deg, #7795f8 15%, #6772e5 70%, #555abf 94%)',
    // background: 'radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)'
    // background: 'linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)'
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
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '0.75rem',
    overflow: 'visible',
    padding: '16px',
    marginTop: '-164px',
    marginBottom: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
    marginLeft: '32px',
    marginRight: '32px'
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

export const MyGridItemSx: SxProps = {
    minWidth: '33.333%',
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
    backgroundImage: 'linear-gradient(to left, #555abf, #7795f8,#555abf)',
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

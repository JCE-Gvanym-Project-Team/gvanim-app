import { SxProps } from "@mui/material";

export const ListItemTypographySx: SxProps = {
    paddingRight: '16px', 
    paddingLeft: '16px',
    fontSize: 'large',
    color: 'rgb(62, 80, 96)',
    fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"'
}

export const MyPaperSx: SxProps = {
    height: 'fit-content',
    maxHeight: 380, 
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
    overflow: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',

}

import { SxProps } from "@mui/material";


export const MyPaperSx: SxProps = {
    borderStyle: 'solid',
    position: 'relative',
    height: 'fit-content',	
    display: 'flex',
    marginTop: '-10rem',
	marginBottom: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'saturate(200%) blur(30px)',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '0.75rem',
    overflow: 'visible',

}

export const StackNavigationOptionsSx: SxProps = {
    display: { xs: 'none', sm: 'none', md: 'flex', justifyContent: 'center', width: '100%' } 
}
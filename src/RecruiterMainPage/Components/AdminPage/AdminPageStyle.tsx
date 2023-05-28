import { SxProps } from "@mui/material";

export const BoxGradientSx: SxProps = {
    marginTop: '-80px',
    height: '45vh',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)',
}


export const MyPaperSx: SxProps = {
    borderStyle: 'solid',
    position: 'relative',
    height: 'fit-content',	
    flexGrow: 1,
    display: 'flex',
    marginLeft: '32px',
    marginRight: '32px',
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
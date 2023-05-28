import { SxProps } from "@mui/material";

export const AppBarSx: SxProps = {
    borderColor: 'gray',
    background: 'rgb(52, 71, 103)',
    margin: '16px 24px',
    width: 'calc(100% - 48px)',
    borderRadius: '0.75rem',
    paddingTop: '0px',
    paddingBottom: '0px',
    boxShadow: 5
}

export const BoxDrawerSx: SxProps = {
    textAlign: 'center'
}

export const BoxDrawerAvatarSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 3
}

export const TypographyDrawerSx: SxProps = {
    marginLeft: 2
}

export const DividerDrawerSx: SxProps = {
    marginTop: 1
}

export const ListItemButtonDrawerSx: SxProps = {
    textAlign: 'center',
}

export const OpenDrawerIconSx: SxProps = {
    mr: 2, display: { md: 'none' } 
}

export const NavBarIconColorSx: SxProps = {
    color: '#fff'
}

export const WelcomeUserBoxSx: SxProps = {
    display: { xs: 'none', sm: 'none', md: 'flex' }
}

export const BoxNavigationOptionsSx: SxProps = {
    display: { xs: 'none', sm: 'none', md: 'flex', justifyContent: 'center', width: '100%' } 
}

export const LogoutButtonBoxSx: SxProps = {
    display: { xs: 'none', sm: 'none', md: 'flex', justifyContent: 'center', width: 'fit-content' }
}
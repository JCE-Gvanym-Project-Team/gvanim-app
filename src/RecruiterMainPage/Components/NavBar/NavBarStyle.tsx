import { SxProps } from "@mui/material";

// ###############
export const NavBarSx: SxProps = {
    paddingX: '1rem',
    paddingY: '0.5rem',
    color: '#344767',
    borderRadius: '0.75rem',
    ":hover": { color: 'rgba(52, 71, 103, .7)' },
    ":disabled": { color: 'rgba(52, 71, 103, .3)' },
    ":active": { color: 'rgba(52, 71, 103, .9)' },
    position: 'absolute',
    zIndex: 3,
    top: 0,
    boxShadow: ' 0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)',
    display: 'flex',
    alignItems: 'center',
    left: 0,
    right: 0,
    marginLeft: '32px',
    marginRight: '32px',
    marginTop: '1rem',
    marginBottom: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    justifyContent: 'space-between',
    padding: 'var(paddingY) var(paddingX)',
    backdropFilter: 'saturate(200%) blur(30px)',
    backgroundColor: 'hsla(0,0%,100%,.8)'
}

// ###############

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
import * as React from 'react';
import Menu, { MenuActions } from '@mui/base/Menu';
import MenuItem, { menuItemClasses } from '@mui/base/MenuItem';
import { buttonClasses } from '@mui/base/Button';
import Button from '@mui/material/Button';
import Popper from '@mui/base/Popper';
import { styled } from '@mui/system';
import { ListActionTypes } from '@mui/base/useList';
import { Divider, IconButton } from '@mui/material';
import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MyLogoutDialog from '../LogoutDialog';
import ClickAwayListener from '@mui/base/ClickAwayListener';

export default function UserDropMenu(props: {handlelogout: any}) {
    const { handlelogout } = props;

    const [buttonElement, setButtonElement] = React.useState<HTMLButtonElement | null>(
        null,
    );
    const [isOpen, setOpen] = React.useState(false);
    const menuActions = React.useRef<MenuActions>(null);
    const preventReopen = React.useRef(false);
    const navigate = useNavigate();

    const updateAnchor = React.useCallback((node: HTMLButtonElement | null) => {
        setButtonElement(node);
    }, []);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (preventReopen.current) {
            event.preventDefault();
            preventReopen.current = false;
            return;
        }

        setOpen((open) => !open);
    };

    const handleClickAway = () => {
        setOpen(false);
      };

    const handleButtonMouseDown = () => {
        if (isOpen) {
            // Prevents the menu from reopening right after closing
            // when clicking the button.
            preventReopen.current = true;
        }
    };

    const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
            if (event.key === 'ArrowUp') {
                // Focus the last item when pressing ArrowUp.
                menuActions.current?.dispatch({
                    type: ListActionTypes.keyDown,
                    key: event.key,
                    event,
                });
            }
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
        <div>
            <IconButton
                color="inherit"
                aria-label="welcome user"
                edge="start"
                type="button"
                onClick={handleButtonClick}
                onKeyDown={handleButtonKeyDown}
                onMouseDown={handleButtonMouseDown}
                ref={updateAnchor}
                aria-controls={isOpen ? 'simple-menu' : undefined}
                aria-expanded={isOpen || undefined}
                aria-haspopup="menu"

            >
                <AccountCircle />

            </IconButton>
            <Menu
                actions={menuActions}
                open={isOpen}
                onOpenChange={(open) => {
                    setOpen(open);
                }}
                anchorEl={buttonElement}
                slots={{ root: StyledPopper, listbox: StyledListbox }}
                slotProps={{ listbox: { id: 'simple-menu' } }}
            >
  
                <Button size="large" startIcon={<Settings />} sx={{ width: '100%', color: 'rgb(52, 71, 103)'}} onClick={() => {navigate("/settings"); setOpen(false);}}>
                    הגדרות 
                </Button>
                <Divider />
                <MyLogoutDialog handlelogout={handlelogout} isMobile={false} />

                
       
            </Menu>
        </div>
        </ClickAwayListener>
    );
}

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 16px 24px;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const StyledMenuItem = styled(MenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const TriggerButton = styled(Button)(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 8px 14px;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${buttonClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;
import * as React from "react";
import Menu, { MenuActions } from "@mui/base/Menu";
import MenuItem, { menuItemClasses } from "@mui/base/MenuItem";
import Popper from "@mui/base/Popper";
import { styled } from "@mui/system";
import { ListActionTypes } from "@mui/base/useList";
import { Box, IconButton, ListItemIcon, Typography } from "@mui/material";
import { Assignment, Edit, Label, MoreVert, Print } from "@mui/icons-material";
import {
  MenuItemIconSx,
  MenuItemTypographySx,
  MoreVertSx,
  blue,
  grey,
} from "./DropMenuStyle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function MenuSection({ children, label }: MenuSectionProps) {
  return (
    <MenuSectionRoot>
      <MenuSectionLabel>{label}</MenuSectionLabel>
      {children}
    </MenuSectionRoot>
  );
}

export default function DropMenu(props: { CandidateId: any }) {
  const navigate = useNavigate();
  const { CandidateId } = props;
  const [buttonElement, setButtonElement] =
    React.useState<HTMLButtonElement | null>(null);
  const [isOpen, setOpen] = React.useState(false);
  const menuActions = React.useRef<MenuActions>(null);
  const preventReopen = React.useRef(false);

  const updateAnchor = React.useCallback((node: HTMLButtonElement | null) => {
    setButtonElement(node);
  }, []);

  const handleEditClick = () => {
    setOpen(false);
    buttonElement?.focus();
    navigate("/management/editCandidate", { state: CandidateId });
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (preventReopen.current) {
      event.preventDefault();
      preventReopen.current = false;
      return;
    }

    setOpen((open) => !open);
  };

  const handleButtonMouseDown = () => {
    if (isOpen) {
      // Prevents the menu from reopening right after closing
      // when clicking the button.
      preventReopen.current = true;
    }
  };

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      if (event.key === "ArrowUp") {
        // Focus the last item when pressing ArrowUp.
        menuActions.current?.dispatch({
          type: ListActionTypes.keyDown,
          key: event.key,
          event,
        });
      }
    }
  };

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
      setOpen(false);
      buttonElement?.focus();
    };
  };

  return (
    <Box>
      <IconButton
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        onMouseDown={handleButtonMouseDown}
        ref={updateAnchor}
        aria-controls={isOpen ? "wrapped-menu" : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
      >
        <MoreVert sx={MoreVertSx} />
      </IconButton>

      <Menu
        actions={menuActions}
        open={isOpen}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        anchorEl={buttonElement}
        slots={{ root: StyledPopper, listbox: StyledListbox }}
        slotProps={{ listbox: { id: "simple-menu" } }}
      >
        <Typography
          variant="caption"
          sx={{ fontSize: 10, fontWeight: 600, padding: 1 }}
        >
          אפשרויות
        </Typography>
        <StyledMenuItem
          onClick={() => navigate(`/career/jobs/${CandidateId._jobNumber}`)}
        >
          <ListItemIcon>
            <Assignment sx={MenuItemIconSx} />
            <Typography sx={MenuItemTypographySx}>לדף המשרה</Typography>
          </ListItemIcon>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <Edit sx={MenuItemIconSx} />
            <Typography sx={MenuItemTypographySx}>ערוך מועמד</Typography>
          </ListItemIcon>
        </StyledMenuItem>

        {/* </MenuSection> */}
      </Menu>
    </Box>
  );
}

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 2px 16px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
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
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;

interface MenuSectionProps {
  children: React.ReactNode;
  label: string;
}

const MenuSectionRoot = styled("li")`
  list-style: none;

  & > ul {
    padding-left: 1em;
  }
`;

const MenuSectionLabel = styled("span")`
  display: block;
  padding: 10px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;

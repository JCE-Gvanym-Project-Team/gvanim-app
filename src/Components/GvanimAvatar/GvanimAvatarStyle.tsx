import { SxProps } from "@mui/material";

export const MyBadgeSx: SxProps = {
    "& .MuiBadge-badge": {
      backgroundColor: 'rgb(52, 71, 103)',
    }
  }

export const AvatarSx: SxProps = {
    border: '1px solid #dee2e6', width: 70, height: 70,

    '& .MuiAvatar-img': {
        objectFit: 'contain',
    }
}
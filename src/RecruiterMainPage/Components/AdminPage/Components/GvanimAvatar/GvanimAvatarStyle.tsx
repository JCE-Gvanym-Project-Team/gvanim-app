import { SxProps } from "@mui/material";

export const MyBadgeSx: SxProps = {
    "& .MuiBadge-badge": {
      backgroundColor: 'rgb(52, 71, 103)',
    }
  }

export const AvatarSx: SxProps = {
    border: '2px solid #dee2e6', width: 100, height: 100,
    left: '50%',transform: 'translate(-50%,-54%)', position: 'absolute',transition: 'all .15s ease',
    backgroundColor: '#e6e9f0',

    '& .MuiAvatar-img': {
        objectFit: 'contain',
    }
    ,
    // '&:hover': {
    //   transform: 'translate(-50%,-57%)',
    //   background: '#e6e9f0'
    // }
}
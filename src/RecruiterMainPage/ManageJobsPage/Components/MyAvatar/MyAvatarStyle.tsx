import { SxProps } from "@mui/material";

export const AvatarSx: SxProps = {
    border: '1px solid #dee2e6', width: 90, height: 90,

    '& .MuiAvatar-img': {
        objectFit: 'contain',
    }
}
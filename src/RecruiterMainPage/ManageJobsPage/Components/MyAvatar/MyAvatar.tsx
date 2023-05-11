import * as React from 'react';
import Badge from '@mui/material/Badge';
import { Avatar } from '@mui/material';
import SvgLogo from "../../../../Components/Logo/Logo.svg"

export default function MyAvatar() {
    return (
            <Badge color="info" badgeContent="42" anchorOrigin={{ vertical: 'top', horizontal: 'left', }} overlap="circular">
                <Avatar variant='circular' src={SvgLogo} sx={{ 
                    border: '1px solid #dee2e6', width: 90, height: 90,
                    
                    '& .MuiAvatar-img': {
                        objectFit: 'contain',
                    }
                    }} />
            </Badge>
    );
}
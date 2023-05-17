import Badge from '@mui/material/Badge';
import { Avatar } from '@mui/material';
import SvgLogo from "../../../../Components/Logo/Logo.svg"
import { AvatarSx } from './MyAvatarStyle';

export default function MyAvatar() {
    return (
            <Badge color="info" badgeContent="42" anchorOrigin={{ vertical: 'top', horizontal: 'left', }} overlap="circular">
                <Avatar variant='circular' src={SvgLogo} sx={ AvatarSx } />
            </Badge>
    );
}
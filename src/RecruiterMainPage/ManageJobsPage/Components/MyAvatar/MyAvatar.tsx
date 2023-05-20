import Badge from '@mui/material/Badge';
import { Avatar } from '@mui/material';
import SvgLogo from "../../../../Components/Logo/Logo.svg"
import { AvatarSx, MyBadgeSx } from './MyAvatarStyle';

export default function MyAvatar(props: {dataSize: any}) {
    const { dataSize } = props;

    return (
            <Badge color="info" badgeContent={dataSize} max={100000} anchorOrigin={{ vertical: 'top', horizontal: 'left', }} overlap="circular">
                <Avatar variant='circular' src={SvgLogo} sx={ AvatarSx } />
            </Badge>
    );
}
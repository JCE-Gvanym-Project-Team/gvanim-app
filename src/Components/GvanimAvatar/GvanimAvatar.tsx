import { Avatar } from '@mui/material';
import SvgLogo from "../Logo/Logo.svg"
import { AvatarSx } from './GvanimAvatarStyle';

export default function GvanimAvatar() {

    return (
        <Avatar src={SvgLogo} sx={AvatarSx} />
    );
}
import { makeStyles } from '@mui/styles'
import colors from '../../indexStyle'

const searchStyles = makeStyles(theme => ({
    root: {
        "& label": {
            transformOrigin: "top right",
            right: 0,
            left: "auto"
        }
    },
    searchBar: {

    },

}));


export default searchStyles;
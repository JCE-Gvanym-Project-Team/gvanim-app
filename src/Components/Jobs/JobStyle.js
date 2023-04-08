import { makeStyles } from '@mui/styles'
import colors from '../../indexStyle'

const jobTwoStyles = makeStyles(theme => ({
    // card and card containers
    cardContainer: {
        display: 'flex',
        alignItems: 'stretch',
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: "30px",
    },
    card: {
        transition: 'all 0.2s ease-in-out',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        borderTopWidth: '3px',
        borderTopStyle: 'solid',
        borderTopColor: '#153C7C',

        '&:hover': {
            backgroundColor: colors.colorHover
        }
    },
    cardContent: {
        flexGrow: 1
    },

    // Job Description
    jobDescription: {
        flexGrow: 1,
        fontVariant: 'h2'
    },
    jobDescriptionLink: {
        color: colors.colorText,
        textDecoration: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            color: colors.colorBlue
        }
    },

    // Job location
    jobLocationContainer: {
        alignItems: 'flex-start'
    },
    jobLocation: {
        color: colors.colorBlue,
        flexGrow: 1,
        flexShrink: 1,
        overflow: 'hidden'
    },
    locationIcon: {
        flexShrink: '0',
        color: "#5AC3F2"
    },

    // Job Scope
    jobScope: {

    },

    // Button and job ID
    buttonDiv: {
        display: 'flex',
        borderTop: '1px solid grey'
    },
    viewButton: {
        flex: 1,
        '&:hover': {
            color: colors.colorOrange,
        }
    },
    jobID: {
        flex: 4,
        textAlign: 'left',
        paddingLeft: '5%'
    }
}));


export default jobTwoStyles;
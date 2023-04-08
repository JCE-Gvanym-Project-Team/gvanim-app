import { makeStyles } from '@mui/styles'
import colors from '../../indexStyle'

const jobStyles = makeStyles(theme => ({

    // section location text
    sectionContainer: {
        marginTop: '70px'
    },
    sectionLocation: {
        textDecoration: 'none',
        color: colors.colorOrange
    },

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
        border: '1px solid grey',
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
        fontFamily: colors.fontFamily,
        fontWeight: 'bold',
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
        fontWeight: 'bold',
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
        color: 'black'
    },

    // Button and job ID
    buttonDiv: {
        display: 'flex',
        borderTop: '1px solid grey'
    },
    viewButton: {
        fontWeight: 'bold',
        flex: 1,
        '&:hover': {
            color: colors.colorOrange,
        }
    },
    jobID: {
        color: 'black',
        flex: 4,
        textAlign: 'left',
        paddingLeft: '5%'
    }
}));


export default jobStyles;
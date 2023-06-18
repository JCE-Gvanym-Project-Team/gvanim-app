import { SxProps } from "@mui/material"

export const BoxGradientSx: SxProps = {
    minHeight: '250px',
    width: "100%",
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(to left, #7795f8, #7795f8,#555abf)',
}

export const GlobalStyle = {
    NavbarBackgroundColor: 'rgb(52, 71, 103)'
}

export const ManageJobsPageGlobalStyle = {
    PublishJobButton: 'rgb(52, 71, 103)'
}

export const ManageCandidatesPageGlobalStyle = {
    // View Candidate
    textFontFamily: "'Noto Sans Hebrew', sans-serif",
    marginFromNavbar: '20rem',
    backgroundGradient: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)',
    backgroundHeight: "45vh",

    dialogTitleSize: "24px",
    editDetailsButtonColor: "#2a3eb1",
    changeJobButtonColor: "#3d5afe",
    notesButtonColor: "#637bfe",
    recommendationsButtonColor: "#1769aa",
    interviewsButtonColor: "#4dabf5"
}


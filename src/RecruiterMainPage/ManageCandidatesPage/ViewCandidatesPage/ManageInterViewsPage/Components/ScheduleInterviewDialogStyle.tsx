import { CSSProperties } from "@mui/material/styles/createTypography";
import { SxProps } from "@mui/system";
import { ManageCandidatesPageGlobalStyle } from "../../../../PageStyles";


export const dialogSx: SxProps = {
    
}

export const dialogContentSx: SxProps = {
    width: { xs: "100%", md: "500px" },
    display: "flex",
    // flexDirection: { xs: "column", md: "row" },
    flexDirection: "column",
    justifyContent:"space-evenly",
    minHeight: "100%",
}

export const currentStatusTextSx: SxProps = {
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
    fontWeight: "bold",
    marginBottom: "1rem"
}

export const submitButtonSx: SxProps = {
    backgroundColor: "green"
}

export const dialogContentStyle: CSSProperties = {
    paddingTop: "1rem"
}

export const dialogTitleSx: SxProps = {
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
    textAlign: "center",
    fontSize: ManageCandidatesPageGlobalStyle.dialogTitleSize,
    flex: 10
}

export const dialogTopAreaSx: SxProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "-1rem"
}

export const dialogActionsSx: SxProps = {
    justifyContent: "start",
    marginLeft: "1rem",
    alignItems: "center"
}

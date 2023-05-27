import { CSSProperties } from "@mui/material/styles/createTypography";
import { SxProps } from "@mui/system";
import { ManageCandidatesPageGlobalStyle } from "../../../../PageStyles";


export const dialogSx: SxProps = {
    
}

export const dialogContentSx: SxProps = {
    width: { xs: "100%", md: "100%" },
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    minHeight: "100%"
}

export const dialogContentStyle: CSSProperties = {
    paddingTop: "1rem",
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
    alignItems: "center"
}

export const dialogActionsSx: SxProps = {
    justifyContent: "start",
    marginLeft: "3rem"
}

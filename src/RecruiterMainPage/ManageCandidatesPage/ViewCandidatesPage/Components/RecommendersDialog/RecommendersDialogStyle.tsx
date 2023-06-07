import { CSSProperties } from "@mui/material/styles/createTypography";
import { SxProps } from "@mui/system";
import { ManageCandidatesPageGlobalStyle, GlobalStyle } from "../../../../PageStyles";



export const dialogSx: SxProps = {
}

export const dialogContentSx: SxProps = {
    width: {xs: "100%", md:"500px"},
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    minHeight: "100%"
}

export const dialogContentStyle: CSSProperties = {
    paddingTop: "1rem",
    borderBottom: "1px solid",
    borderColor: GlobalStyle.NavbarBackgroundColor
}

export const dialogTitleSx: SxProps = {
    fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
    textAlign: "center",
    fontSize: ManageCandidatesPageGlobalStyle.dialogTitleSize,
    flex: 10
}

export const dialogTopAreaSx: SxProps = {
    marginTop:"-1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
}

export const dialogActionsSx: SxProps = {
    justifyContent: "start",
    marginLeft: "3rem"
}

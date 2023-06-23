import { createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

const MAX_FONT_SIZE = 40;
const MIN_FONT_SIZE = 12;

// colors based on mode
export const colorTokens = (mode) =>
{
    if (mode === "light")    
    {
        return {
            primary: {
                main: "#000000",
                textBright: "#FFFFFF",
                faded: "#FEFEFE",
                jobTitle: "#053B7A",
                descAndReqTitle: "#5BA1AA",
                addRecommenderButton: "#91A749"
            },

            secondary: {
                main: "#03368a",
                half: "#184fa8",
                dark: "#041a3d",
                descAndReqText: "#767676",
                jobDetails: "#AC2F69",
                labelText: "#053B7A",
                addRecommendersTextHover: "#7BC3CC",
                addRecommenderButtonHover: "#BFD37E"

            },
            background: {
                globalBackground: "#FFFFFF",
                jobDetailsBackground: "#FFFFFF",
                main: "#ffffff",
                default: "#ffffff",
                box: "#ffffff",
                boxInner: "#ffffff",
                jobDetails: "#FFFFFF",
                JobDetailsText: "#053B7A",
                jobTitleSeparator: "#2E3552",
                candidateDetailsTextField: "#F0F0F0",
                cvButton: "#41C2F0",
                cvButtonHover: "#77CFEF",
                submitButtonHover: "#2768B4",
                recommendersBox: "rgba(91, 161, 170, 0.14)",
                footer: "#002652",
                successHover: "#009900"
            },
            error: {
                main: "#FF0000"
            },
            success: {
                main: "#00AA00"
            }
        }

    } else if (mode === "bright-contrast")
    {
        return {
            primary: {
                main: "#000000",
                textBright: "#000000",
                faded: "#333333",
                jobTitle: "#010c18",
                descAndReqTitle: "#122022",
                addRecommenderButton: "#1d210f"
            },

            secondary: {
                main: "#010b1c",
                half: "#051022",
                dark: "#01050c",
                descAndReqText: "#181818",
                jobDetails: "#220915",
                labelText: "#010c18",
                addRecommendersTextHover: "#122c2f",
                addRecommenderButtonHover: "#2a3211"

            },
            background: {
                globalBackground: "#FFFFFF",
                jobDetailsBackground: "#FFFFFF",
                main: "#ffffff",
                default: "#ffffff",
                box: "#ffffff",
                boxInner: "#ffffff",
                jobDetails: "#FFFFFF",
                JobDetailsText: "#b5d6fc",
                jobTitleSeparator: "#ced2e4",
                candidateDetailsTextField: "#fcfcfc",
                cvButton: "#d9f3fc",
                cvButtonHover: "#e4f5fc",
                submitButtonHover: "#cfe0f5",
                recommendersBox: "rgba(91, 161, 170, 0.14)",
                footer: "#a9d1ff",
                successHover: "#009900"
            },
            error: {
                main: "#FF0000"
            },
            success: {
                main: "#00FF00"
            }
        }
    } else if (mode === "dark-contrast")
    {
        return {
            primary: {
                main: "#FFFFFF",
                textBright: "#FFFFFF",
                faded: "#ffffff",
                jobTitle: "#6cadf9",
                descAndReqTitle: "#bdd9dd",
                addRecommenderButton: "#d4deb4"
            },

            secondary: {
                main: "#6ea4fc",
                half: "#90b4ef",
                dark: "#5894f4",
                descAndReqText: "#c8c8c8",
                jobDetails: "#e6a4c2",
                labelText: "#6cadf9",
                addRecommendersTextHover: "#cae7eb",
                addRecommenderButtonHover: "#e5edcb"

            },
            background: {
                globalBackground: "#000000",
                jobDetailsBackground: "#000000",
                main: "#000000",
                default: "#000000",
                box: "#000000",
                boxInner: "#000000",
                jobDetails: "#000000",
                JobDetailsText: "#010c18",
                jobTitleSeparator: "#090b10",
                candidateDetailsTextField: "#303030",
                cvButton: "#042b39",
                cvButtonHover: "#083140",
                submitButtonHover: "#081524",
                recommendersBox: "rgba(91, 161, 170, 0.14)",
                footer: "#000810",
                successHover: "#009900"
            },
            error: {
                main: "#FF0000"
            },
            success: {
                main: "#00FF00"
            }
        }
    } else 
    {
        // black and white
        return {
            primary: {
                main: colorToGrayscale("#000000"),
                textBright: colorToGrayscale("#FFFFFF"),
                faded: colorToGrayscale("#FEFEFE"),
                jobTitle: colorToGrayscale("#053B7A"),
                descAndReqTitle: colorToGrayscale("#5BA1AA"),
                addRecommenderButton: colorToGrayscale("#91A749")
            },

            secondary: {
                main: colorToGrayscale("#03368a"),
                half: colorToGrayscale("#184fa8"),
                dark: colorToGrayscale("#041a3d"),
                descAndReqText: colorToGrayscale("#767676"),
                jobDetails: colorToGrayscale("#AC2F69"),
                labelText: colorToGrayscale("#053B7A"),
                addRecommendersTextHover: colorToGrayscale("#7BC3CC"),
                addRecommenderButtonHover: colorToGrayscale("#BFD37E")

            },
            background: {
                globalBackground: colorToGrayscale("#FFFFFF"),
                jobDetailsBackground: colorToGrayscale("#FFFFFF"),
                main: colorToGrayscale("#ffffff"),
                default: colorToGrayscale("#ffffff"),
                box: colorToGrayscale("#ffffff"),
                boxInner: colorToGrayscale("#ffffff"),
                jobDetails: colorToGrayscale("#FFFFFF"),
                JobDetailsText: colorToGrayscale("#053B7A"),
                jobTitleSeparator: colorToGrayscale("#2E3552"),
                candidateDetailsTextField: colorToGrayscale("#F0F0F0"),
                cvButton: colorToGrayscale("#41C2F0"),
                cvButtonHover: colorToGrayscale("#77CFEF"),
                submitButtonHover: colorToGrayscale("#2768B4"),
                recommendersBox: colorToGrayscale("rgba(91, 161, 170, 0.14)"),
                footer: colorToGrayscale("#002652"),
                successHover: colorToGrayscale("#009900")
            },
            error: {
                main: colorToGrayscale("#FF0000")
            },
            success: {
                main: colorToGrayscale("#00FF00")
            }
        }
    }
}

export const themeSettings = (mode, actualMode, fontSize, fontFamily) =>
{
    const colors = colorTokens(actualMode);
    return {
        palette: {
            mode: mode,
            primary: {
                main: colors.primary.main!,
                textBright: colors.primary.textBright!,
                faded: colors.primary.faded!,
                jobTitle: colors.primary.jobTitle!,
                descAndReqTitle: colors.primary.descAndReqTitle!,
                addRecommenderButton: colors.primary.addRecommenderButton!

            },
            secondary: {
                main: colors.secondary?.main!,
                half: colors.secondary?.half!,
                dark: colors.secondary?.dark!,
                descAndReqText: colors.secondary?.descAndReqText!,
                jobDetails: colors.secondary?.jobDetails!,
                labelText: colors.secondary?.labelText!,
                addRecommendersTextHover: colors.secondary?.addRecommendersTextHover!,
                addRecommenderButtonHover: colors.secondary?.addRecommenderButtonHover

            },
            background: {
                main: colors.background?.globalBackground,
                default: colors.background?.globalBackground,
                box: colors.background?.globalBackground,
                boxInner: colors.background?.globalBackground,
                jobDetails: colors.background?.jobDetails,
                JobDetailsText: colors.background?.JobDetailsText,
                jobTitleSeparator: colors.background?.jobTitleSeparator,
                candidateDetailsTextField: colors.background?.candidateDetailsTextField,
                cvButton: colors.background?.cvButton,
                cvButtonHover: colors.background?.cvButtonHover,
                submitButtonHover: colors.background?.submitButtonHover,
                recommendersBox: colors.background?.recommendersBox,
                footer: colors.background?.footer,
                successHover: colors.background?.successHover
            },
            error: {
                main: colors.error?.main!
            },
            success: {
                main: colors.success?.main!
            }
        },
        typography: {
            fontFamily: fontFamily,
            fontWeight: "Regular",
            fontSize: fontSize,
            h1: {
                fontWeight: "Medium",
                fontFamily: fontFamily,
                fontSize: fontSize + 30
            },
            h2: {
                fontWeight: "Medium",
                fontFamily: fontFamily,
                fontSize: fontSize + 10
            },
            h3: {
                fontFamily: fontFamily,
                fontSize: fontSize + 5
            },
            h4: {
                fontFamily: fontFamily,
                fontSize: fontSize + 2
            },
            h5: {
                fontFamily: fontFamily,
                fontSize: fontSize - 4
            },
            h6: {
                fontFamily: fontFamily,
                fontWeight: "Medium",
                fontSize: fontSize + 6
            },
            subtitle1: {
                fontWeight: "Medium",
                fontFamily: fontFamily,
                fontSize: fontSize
            },
            subtitle2: {
                fontFamily: fontFamily,
                fontSize: fontSize - 2
            }
        }
    }
}

// context for color mode

export const ColorModeContext = createContext({
    toggleColorMode: (mode) => { },
});

export const FontContext = createContext({
    increaseFontSize: (increaseBy) => { },
    decreaseFontSize: (decreaseBy) => { },
    changeFontSize: (fontSize) => { },
    changeFontFamily: (fontFamily) => { },
});

export const useMode = () =>
{
    // default is light
    const [mode, setMode] = useState("light");
    const [fontSize, setFontSize] = useState(20);
    const [fontFamily, setFontFamily] = useState("Rubik");

    const [actualMode, setActualMode] = useState("light");

    const colorMode = useMemo(() =>
    ({
        toggleColorMode: (mode) =>
        {
            setActualMode(mode)
        }
    }), [actualMode]);


    const fontMode = useMemo(() =>
    ({
        increaseFontSize: (increaseBy) =>
        {
            setFontSize(fontSize + increaseBy > MAX_FONT_SIZE ? fontSize : fontSize + increaseBy);
        },

        decreaseFontSize: (decreaseBy) =>
        {
            setFontSize(fontSize - decreaseBy < MIN_FONT_SIZE ? fontSize : fontSize - decreaseBy);
        },

        changeFontFamily: (fontFamily) =>
        {
            setFontFamily(fontFamily);
        },

        changeFontSize: (fontSize) =>
        {
            setFontSize(fontSize);
        }
    }), [fontSize, fontFamily]);

    const theme = useMemo(() => createTheme(themeSettings(mode, actualMode, fontSize, fontFamily)), [mode, actualMode, fontSize, fontFamily]);

    const result: any[] = []
    result.push(theme);
    result.push(colorMode);
    result.push(fontMode)

    return result;
}

// helper function for black and white theme
function colorToGrayscale(color)
{
    color = color.replace('#', '');
    const red = parseInt(color.substring(0, 2), 16);
    const green = parseInt(color.substring(2, 4), 16);
    const blue = parseInt(color.substring(4, 6), 16);

    // calculate grayscale values
    const grayscaleR = Math.round(0.299 * red + 0.587 * green + 0.114 * blue);
    const grayscaleG = grayscaleR;
    const grayscaleB = grayscaleR;

    // convert grayscale values to hexa
    const grayscaleHexR = grayscaleR.toString(16).padStart(2, '0');
    const grayscaleHexG = grayscaleG.toString(16).padStart(2, '0');
    const grayscaleHexB = grayscaleB.toString(16).padStart(2, '0');

    // form hashtag for the new color
    const grayscaleHashtag = `#${grayscaleHexR}${grayscaleHexG}${grayscaleHexB}`;

    return grayscaleHashtag;
}

// helper function for bright contrast 
function getContrastingColor(hexColor)
{
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    const contrastingColor = brightness >= 128 ? "#000000" : "#FFFFFF";

    return contrastingColor;
}

function getDarkContrastingColor(hexColor)
{
    // Convert hexadecimal color to RGB
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Determine contrasting color
    const darkContrast = brightness >= 128 ? brightness - 100 : brightness + 100;
    const contrastingColor = `#${Math.round(darkContrast).toString(16).padStart(2, "0").repeat(3)}`;

    return contrastingColor;
}
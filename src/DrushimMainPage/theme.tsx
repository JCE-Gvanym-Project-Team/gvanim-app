import { createContext, useState, useMemo } from "react"
import { createTheme } from "@mui/material/styles"
import { color } from "highcharts";

const MAX_FONT_SIZE = 40;
const MIN_FONT_SIZE = 12;

// colors based on mode
export const colorTokens = (mode) =>
{
    if (mode === "light")    
    {
        return {
            globalBackground: "#FFFFFF",
            jobDetailsBackground: "#FFFFFF",
        }

    } else if (mode === "bright-contrast")
    {
        return {
            grey: {
                100: getContrastingColor("#fcfcfc"),
                200: getContrastingColor("#e0e0e0"),
                300: getContrastingColor("#c2c2c2"),
                400: getContrastingColor("#a3a3a3"),
                500: getContrastingColor("#858585"),
                600: getContrastingColor("#666666"),
                700: getContrastingColor("#525252"),
                800: getContrastingColor("#3d3d3d"),
                900: getContrastingColor("#292929"),
                1000: getContrastingColor("#141414")
            },
            primary: {
                100: getContrastingColor("#ffffff"),
                200: getContrastingColor("#d0d1d5"),
                300: getContrastingColor("#a1a4ab"),
                400: getContrastingColor("#727681"),
                500: getContrastingColor("#434957"),
                600: getContrastingColor("#141b2d"),
                700: getContrastingColor("#101624"),
                800: getContrastingColor("#0c101b"),
                900: getContrastingColor("#080b12"),
                1000: "#040509",
                1100: getContrastingColor("#000000")
            },
            greens: {
                100: getContrastingColor("#dbf5ee"),
                200: getContrastingColor("#b7ebde"),
                300: getContrastingColor("#94e2cd"),
                400: getContrastingColor("#70d8bd"),
                500: getContrastingColor("#4cceac"),
                600: getContrastingColor("#3da58a"),
                700: getContrastingColor("#2e7c67"),
                800: getContrastingColor("#1e5245"),
                900: getContrastingColor("#0f2922")
            },
            reds: {
                100: getContrastingColor("#f8dcdb"),
                200: getContrastingColor("#f1b9b7"),
                300: getContrastingColor("#e99592"),
                400: getContrastingColor("#e2726e"),
                500: getContrastingColor("#db4f4a"),
                600: getContrastingColor("#af3f3b"),
                700: getContrastingColor("#832f2c"),
                800: getContrastingColor("#58201e"),
                900: getContrastingColor("#2c100f")
            },
            blues: {
                100: getContrastingColor("#e1e2fe"),
                200: getContrastingColor("#c3c6fd"),
                300: getContrastingColor("#a4a9fc"),
                400: getContrastingColor("#868dfb"),
                500: getContrastingColor("#6870fa"),
                600: getContrastingColor("#535ac8"),
                700: getContrastingColor("#3e4396"),
                800: getContrastingColor("#2a2d64"),
                900: getContrastingColor("#151632")
            }
        }
    } else if (mode === "dark-contrast")
    {
        return {
            grey: {
                100: getDarkContrastingColor("#fcfcfc"),
                200: getDarkContrastingColor("#e0e0e0"),
                300: getDarkContrastingColor("#c2c2c2"),
                400: getDarkContrastingColor("#a3a3a3"),
                500: getDarkContrastingColor("#858585"),
                600: getDarkContrastingColor("#666666"),
                700: getDarkContrastingColor("#525252"),
                800: getDarkContrastingColor("#3d3d3d"),
                900: getDarkContrastingColor("#292929"),
                1000: getDarkContrastingColor("#141414")
            },
            primary: {
                100: getDarkContrastingColor("#ffffff"),
                200: getDarkContrastingColor("#d0d1d5"),
                300: getDarkContrastingColor("#a1a4ab"),
                400: getDarkContrastingColor("#727681"),
                500: getDarkContrastingColor("#434957"),
                600: getDarkContrastingColor("#141b2d"),
                700: getDarkContrastingColor("#101624"),
                800: getDarkContrastingColor("#0c101b"),
                900: getDarkContrastingColor("#080b12"),
                1000: getDarkContrastingColor("#040509"),
                1100: "#000000"
            },
            greens: {
                100: getDarkContrastingColor("#dbf5ee"),
                200: getDarkContrastingColor("#b7ebde"),
                300: getDarkContrastingColor("#94e2cd"),
                400: getDarkContrastingColor("#70d8bd"),
                500: getDarkContrastingColor("#4cceac"),
                600: getDarkContrastingColor("#3da58a"),
                700: getDarkContrastingColor("#2e7c67"),
                800: getDarkContrastingColor("#1e5245"),
                900: getDarkContrastingColor("#0f2922")
            },
            reds: {
                100: getDarkContrastingColor("#f8dcdb"),
                200: getDarkContrastingColor("#f1b9b7"),
                300: getDarkContrastingColor("#e99592"),
                400: getDarkContrastingColor("#e2726e"),
                500: getDarkContrastingColor("#db4f4a"),
                600: getDarkContrastingColor("#af3f3b"),
                700: getDarkContrastingColor("#832f2c"),
                800: getDarkContrastingColor("#58201e"),
                900: getDarkContrastingColor("#2c100f")
            },
            blues: {
                100: getDarkContrastingColor("#e1e2fe"),
                200: getDarkContrastingColor("#c3c6fd"),
                300: getDarkContrastingColor("#a4a9fc"),
                400: getDarkContrastingColor("#868dfb"),
                500: getDarkContrastingColor("#6870fa"),
                600: getDarkContrastingColor("#535ac8"),
                700: getDarkContrastingColor("#3e4396"),
                800: getDarkContrastingColor("#2a2d64"),
                900: getDarkContrastingColor("#151632")
            }
        }
    } else 
    {
        return {
            grey: {
                100: colorToGrayscale("#141414"),
                200: colorToGrayscale("#292929"),
                300: colorToGrayscale("#3d3d3d"),
                400: colorToGrayscale("#525252"),
                500: colorToGrayscale("#666666"),
                600: colorToGrayscale("#858585"),
                700: colorToGrayscale("#a3a3a3"),
                800: colorToGrayscale("#c2c2c2"),
                900: colorToGrayscale("#e0e0e0"),
                1000: colorToGrayscale("#fcfcfc")
            },
            primary: {
                100: colorToGrayscale("#000000"),
                200: colorToGrayscale("#040509"),
                300: colorToGrayscale("#080b12"),
                400: colorToGrayscale("#0c101b"),
                500: colorToGrayscale("#101624"),
                600: colorToGrayscale("#141b2d"),
                700: colorToGrayscale("#434957"),
                800: colorToGrayscale("#727681"),
                900: colorToGrayscale("#a1a4ab"),
                1000: colorToGrayscale("#d0d1d5"),
                1100: colorToGrayscale("#ffffff")
            },
            greens: {
                100: colorToGrayscale("#0f2922"),
                200: colorToGrayscale("#1e5245"),
                300: colorToGrayscale("#2e7c67"),
                400: colorToGrayscale("#3da58a"),
                500: colorToGrayscale("#4cceac"),
                600: colorToGrayscale("#70d8bd"),
                700: colorToGrayscale("#94e2cd"),
                800: colorToGrayscale("#b7ebde"),
                900: colorToGrayscale("#dbf5ee"),
            },
            reds: {
                100: colorToGrayscale("#2c100f"),
                200: colorToGrayscale("#58201e"),
                300: colorToGrayscale("#832f2c"),
                400: colorToGrayscale("#af3f3b"),
                500: colorToGrayscale("#db4f4a"),
                600: colorToGrayscale("#e2726e"),
                700: colorToGrayscale("#e99592"),
                800: colorToGrayscale("#f1b9b7"),
                900: colorToGrayscale("#f8dcdb"),
            },
            blues: {
                100: colorToGrayscale("#151632"),
                200: colorToGrayscale("#2a2d64"),
                300: colorToGrayscale("#3e4396"),
                400: colorToGrayscale("#535ac8"),
                500: colorToGrayscale("#6870fa"),
                600: colorToGrayscale("#868dfb"),
                700: colorToGrayscale("#a4a9fc"),
                800: colorToGrayscale("#c3c6fd"),
                900: colorToGrayscale("#e1e2fe"),
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
            neutral: {
                main: "#000000",
                dark: "#000000",
                light: "#000000"
            },
            background: {
                main: colors.globalBackground,
                default: colors.globalBackground,
                box: colors.globalBackground,
                boxInner: colors.globalBackground,
                jobDetails: "#FFFFFF",
                JobDetailsText: "#053B7A",
                jobTitleSeparator: "#2E3552",
                candidateDetailsTextField: "#F0F0F0",
                cvButton: "#41C2F0",
                cvButtonHover: "#77CFEF",
                submitButtonHover: "#2768B4",
                recommendersBox: "rgba(91, 161, 170, 0.14)"
            },
            error: {
                main: "#FF0000"
            },
            success: {
                main: "#00FF00"
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
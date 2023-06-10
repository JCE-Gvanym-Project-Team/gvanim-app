import { createContext, useState, useMemo } from "react"
import { createTheme } from "@mui/material/styles"

// colors based on mode
export const colorTokens = (mode) =>
{
    if (mode === "dark")
    {
        return {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
                1000: "#fcfcfc"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#434957",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509",
                1000: "#000000"
            },
            greens: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            reds: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f"
            },
            blues: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632"
            }
        }
    } else
    {
        return {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
                1000: "#fcfcfc"
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#101624",
                500: "#141b2d",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
            greens: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            reds: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blues: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            }
        }
    }
}

export const themeSettings = (mode) =>
{
    const colors = colorTokens(mode);

    if (mode === "dark")
    {
        return {
            palette: {
                mode: mode,
                primary: {
                    main: colors.primary[100],
                    faded: colors.primary[900]
                },
                secondary: {
                    main: colors.blues[500]
                },
                neutral: {
                    main: colors.grey[500],
                    dark: colors.grey[700],
                    light: colors.grey[100]
                },
                background: {
                    default: colors.primary[500],
                    box: colors.grey[800],
                    boxInner: colors.grey[700]
                },
                error: {
                    main: colors.reds[100]
                }
            },
            typography: {
                fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                fontSize: 20,
                h1: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 40
                },
                h2: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 32
                },
                h3: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 24
                },
                h4: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 20
                },
                h5: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 16
                },
                h6: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 14
                },

            }
        }
    } else if (mode === "light")
    {
        return {
            palette: {
                mode: mode,
                primary: {
                    main: colors.primary[100],
                    faded: colors.primary[900]
                },
                secondary: {
                    main: colors.blues[500]
                },
                neutral: {
                    main: colors.grey[500],
                    dark: colors.grey[700],
                    light: colors.grey[100]
                },
                background: {
                    main: colors.grey[1000],
                    box: colors.grey[800],
                    boxInner: colors.grey[700],
                }
            },
            typography: {
                fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                fontSize: 20,
                h1: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 40
                },
                h2: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 32
                },
                h3: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 24
                },
                h4: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 20
                },
                h5: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 16
                },
                h6: {
                    fontFamily: ["'Noto Sans Hebrew'", "sans-serif"].join(","),
                    fontSize: 14
                },

            }
        }

    } else if (mode === "bright contrast")
    {
        // TODO: fill this with colors after website is built
        // according to what colors look good
        return {
            palette: mode,
        }
    } else if (mode === "dark contrast")
    {
        // TODO: fill this with colors after website is built
        // according to what colors look good
        return {
            palette: mode,
        }
    } else if (mode === "white and dark")
    {
        // TODO: fill this with colors after website is built
        // according to what colors look good
        return {
            palette: mode,
        }
    }
}

// context for color mode

export const ColorModeContext = createContext({
    toggleColorMode: (mode) => { }
});

export const useMode = () =>
{
    // default is light
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(() =>
    ({
        toggleColorMode: (mode) =>
        {
            setMode(mode)
        }
    }), []);

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    const result: any[] = []
    result.push(theme);
    result.push(colorMode);

    return result;
}

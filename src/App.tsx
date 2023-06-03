import { createTheme, ThemeProvider } from '@mui/material/styles';
import Auth from './RecruiterMainPage/Components/Auth/Auth';
import { main } from './Firebase/FirebaseFunctions/test';

// RTL - Right to Left imports
import { BrowserRouter } from 'react-router-dom';
import { ColorModeContext, useMode } from './DrushimMainPage/theme';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import { CssBaseline } from '@mui/material';

main();
const recruitersPageTheme = createTheme({
	direction: 'rtl',
});

function App()
{
	const temp = useMode();
	const drushimPageTheme = temp[0];
	const colorMode = temp[1];
	return (
		<>
			{/* Recruiters page */}
			<ThemeProvider theme={recruitersPageTheme}>
				<BrowserRouter>
					<Auth />
				</BrowserRouter>
			</ThemeProvider>

			{/* Drushim Page */}
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={drushimPageTheme}>
					<BrowserRouter>
						<CssBaseline />
						<DrushimMainPage />
					</BrowserRouter>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	);
}



export default App;
function createCache(arg0: { key: string; stylisPlugins: any[]; })
{
	throw new Error('Function not implemented.');
}


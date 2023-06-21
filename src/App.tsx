import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, Route, Routes } from 'react-router-dom';
import DrushimMainPage from './DrushimMainPage/DrushimMainPage';
import { ColorModeContext, FontContext, useMode } from './DrushimMainPage/theme';
import Auth from './RecruiterMainPage/Components/Auth/Auth';
import PasswordRecover from './RecruiterMainPage/RecoveryPasswordPage/RecoveryPasswordPage'

const recruitersPageTheme = createTheme({
	direction: 'rtl',
});

function App() {

	// for drushim page
	const [drushimPageTheme, colorMode, fontMode] = useMode();

	return (
		<>
			<Routes>
				{/* Recruiters page */}
				<Route path='/management/*' element={
					<ThemeProvider theme={recruitersPageTheme}>
						<Auth />
					</ThemeProvider>
				}
				/>

				{/* Drushim Page */}
				<Route path='/career/*' element={
					<FontContext.Provider value={fontMode} >
						<ColorModeContext.Provider value={colorMode} >
							<ThemeProvider theme={drushimPageTheme}>
								<DrushimMainPage />
							</ThemeProvider>
						</ColorModeContext.Provider >
					</FontContext.Provider>
				}
				/>

				{/* Redirects */}
				<Route path='/' element={
					<Navigate to='/career/jobs' />
				} />
				<Route path='/career' element={
					<Navigate to='/career/jobs' />
				} />


			</Routes>
		</>
	);
}



export default App;


import Auth from './RecruiterMainPage/Components/Auth/Auth';
import { main } from './Firebase/FirebaseFunctions/Authentication';
main();
function App()
{
	return (
		<>
		<Auth />	
		</>
	);
}



export default App;

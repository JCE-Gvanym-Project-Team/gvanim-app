import { AccountTree, PeopleAltOutlined } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';

import { Tooltip } from '@mui/material';
import MyLoading from '../../../../../Components/MyLoading/MyLoading';
import { getConnectedUser, isAdmin } from '../../../../../Firebase/FirebaseFunctions/Authentication';
import RessetPassword from '../TabsPanel/Components/ResetPassword/ResetPassword';
import ManageFields from './Components/ManageFields/ManageFields';
import Temp from './Components/ManageRecruiters/Components/RecruitersList/Temp';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			style={{ width: '100%', display: value === index ? 'block' : 'none' }}
		>
			{value === index && <Box style={{ width: '100%' }}>{children}</Box>}
		</div>
	);
};

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function TabsPane() {
	const [loading, setLoading] = React.useState(true);
	const [value, setValue] = React.useState(0);
	const [isAdminUser, setIsAdminUser] = React.useState(false);
	const [userEmail, setUserEmail] = React.useState('');

	// React.useEffect(() => {
	// const currentUser = getConnectedUser()
	// .then((userCredential) => {
	// if (userCredential?.email != null)
	// setUserEmail(userCredential?.email);
	// console.log(userEmail);
	// if (process.env.REACT_APP_ADMIN_MAIL === userEmail)
	// setIsAdminUser(true);
	// })
	// .catch((error) => {
	// console.log(error);
	// });
	// }, []);

	React.useEffect(() => {
		const loadUserasync = async () => {
			const currentUser = getConnectedUser()
				.then(async (userCredential) => {
					if (userCredential?.email != null)
						setUserEmail(userCredential?.email);

					if (await isAdmin(userCredential?.uid!)) {
						setIsAdminUser(true);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		loadUserasync();
	}, [userEmail]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	React.useEffect(() => {
		setLoading(false);
	}, []);


	// console.log(userEmail);
	// console.log(isAdminUser);

	return (
		<>
			{loading ? (
				<MyLoading loading={loading} setLoading={setLoading} />
			) : (
				<Box sx={{ width: '100%' }}>
					<Tabs
						id="mobileTabs"
						value={value}
						onChange={handleChange}
						centered
						sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' }, borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
					>

						<Tooltip title={'איפוס סיסמא'}>
							<Tab disableRipple icon={<LockOutlinedIcon />} {...a11yProps(0)} />
						</Tooltip>
						{isAdminUser && (
							<Box>
								<Tooltip title={'ניהול מגייסים'}>
									<Tab disableRipple icon={<PeopleAltOutlined />} {...a11yProps(1)} />
								</Tooltip>


							</Box>
						)}
						<Tooltip title={'אשכולות ותפקידים'}>
							<Tab disableRipple icon={<AccountTree />} {...a11yProps(2)} />
						</Tooltip>

					</Tabs>

					<Tabs
						id="desktopTabs"
						value={value}
						onChange={handleChange}
						centered
						sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }, borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
					>
						<Tab disableRipple label="איפוס סיסמא" {...a11yProps(0)} />

						{isAdminUser && (
							<Tab disableRipple label="ניהול מגייסים" value={1} {...a11yProps(1)} />

						)}
						
						<Tab disableRipple label="אשכולות ותפקידים" value={2} {...a11yProps(2)} />
					</Tabs>

					<TabPanel value={value} index={0}>
						<RessetPassword />
					</TabPanel>

					<TabPanel value={value} index={1}>
						{/* <ManageRecruiters /> */}
						<Temp />
					</TabPanel>

					<TabPanel value={value} index={2}>
						<ManageFields />
					</TabPanel>
				</Box>
			)}
		</>
	);
}

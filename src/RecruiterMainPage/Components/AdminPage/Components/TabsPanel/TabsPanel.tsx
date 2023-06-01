import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AccountTree, Home, Link, ManageAccounts, Password, PeopleAltOutlined, Summarize } from '@mui/icons-material';
import { Button, Divider, Stack, Tooltip } from '@mui/material';
import AccountSettings from './Components/AccountSettings/AccountSettings';
import PasswordSettings from './Components/PasswordSettings/PasswordSettings';
import RecruiterList from '../RecruitersList/RecruiterList';

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    return (
        <Box sx={{ width: '100%' }}>


            <Tabs id="mobileTabs" value={value} onChange={handleChange} centered sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' }, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Tooltip title={'הגדרות משתמש'}>
                    <Tab disableRipple icon={<ManageAccounts />} {...a11yProps(0)} />
                </Tooltip>

                <Tooltip title={'ניהול מגייסים'}>
                    <Tab disableRipple icon={<PeopleAltOutlined />} {...a11yProps(1)} />
                </Tooltip>

                <Tooltip title={'ניהול אשכולות'}>
                    <Tab disableRipple icon={<AccountTree />} {...a11yProps(2)} />
                </Tooltip>

                <Tooltip title={'ניהול שדות'}>
                    <Tab disableRipple icon={<Summarize />} {...a11yProps(3)} />
                </Tooltip>
            </Tabs>

            <Tabs id="desktopTabs" value={value} onChange={handleChange} centered sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }, paddingBottom: 0, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>

                <Tab disableRipple label="הגדרות משתמש" {...a11yProps(0)} />

                <Tab disableRipple label="ניהול מגייסים" {...a11yProps(1)} />

                <Tab disableRipple label="ניהול אשכולות" {...a11yProps(2)} />

                <Tab disableRipple label="ניהול שדות" {...a11yProps(3)} />

            </Tabs>

            <TabPanel value={value} index={0}>

                <Stack p={2} direction='column' spacing={2}>
                    <Box>
                        <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'>  פרטים אישיים  </Typography>
                        <AccountSettings />
                    </Box>

                    <Divider />

                    <Box>
                        <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'>  סיסמה  </Typography>
                        <PasswordSettings />
                    </Box>
                </Stack>

            </TabPanel>

            <TabPanel value={value} index={1}>

                <Stack p={2} direction='row' justifyContent='space-between'>
                    <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'> ניהול מגייסים</Typography>
                    <Button variant='contained'>הוסף מגייס</Button>
                </Stack>
                <RecruiterList />
            </TabPanel>

            <TabPanel value={value} index={2}>
            <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'> ניהול אשכולות </Typography>
            </TabPanel>

            <TabPanel value={value} index={3}>
            <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'> ניהול שדות </Typography>
            </TabPanel>
        </Box>
    );
}
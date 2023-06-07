import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AccountTree, Edit, ManageAccounts, PeopleAltOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import ManageFields from './Components/ManageFields/ManageFields';
import ManageAccount from './Components/ManageAccount/ManageAccount';
import ManageRecruiters from './Components/ManageRecruiters/ManageRecruiters';
import EnhancedTable from './Components/TableTest';
import MyLoading from '../../../../../Components/MyLoading/MyLoading';

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
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    React.useEffect(() => {
        setLoading(false);
    }, []);


    return (<>{loading ? (<MyLoading loading={loading} setLoading={setLoading} />) : (
        <Box sx={{ width: '100%' }}>
            <Tabs id="mobileTabs" value={value} onChange={handleChange} centered sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' } }}>
                <Tooltip title={'הגדרות משתמש'}>
                    <Tab disableRipple icon={<ManageAccounts />} {...a11yProps(0)} />
                </Tooltip>

                <Tooltip title={'ניהול מגייסים'}>
                    <Tab disableRipple icon={<PeopleAltOutlined />} {...a11yProps(1)} />
                </Tooltip>

                <Tooltip title={'אשכולות ותפקידים'}>
                    <Tab disableRipple icon={<AccountTree />} {...a11yProps(2)} />
                </Tooltip>
            </Tabs>

            <Tabs id="desktopTabs" value={value} onChange={handleChange} centered sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }, paddingBottom: 0 }}>

                <Tab disableRipple label="הגדרות משתמש" {...a11yProps(0)} />

                <Tab disableRipple label="ניהול מגייסים" {...a11yProps(1)} />

                <Tab disableRipple label="אשכולות ותפקידים" {...a11yProps(2)} />

            </Tabs>

            <TabPanel value={value} index={0}>

                <ManageAccount />

            </TabPanel>


            <TabPanel value={value} index={1}>

                {/* <ManageRecruiters /> */}
                <EnhancedTable />

            </TabPanel>


            <TabPanel value={value} index={2}>


                <ManageFields />


            </TabPanel>

        </Box>

    )} </>);
}


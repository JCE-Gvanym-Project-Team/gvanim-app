import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Paper, Stack } from '@mui/material';
import { BoxGradientSx, MyPaperSx } from './AdminPageStyle';
import Avatar from '@mui/material/Avatar';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function AdminPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={BoxGradientSx} />

            <Paper
                sx={MyPaperSx}
            >

                <Stack direction='column'>
                    <Stack direction='column' sx={{
                        width: '150px', height: 'fit-content',
                        borderRight: '1px solid rgba(0, 0, 0, 0.125)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.125)'
                    }}>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', paddingRight: 2, paddingLeft: 2, paddingTop: 2

                        }}>
                            <Avatar sx={{ width: 56, height: 56 }} />
                        </Box>

                        <Box sx={{
                            display: 'flex', justifyContent: 'center', padding: 1
                        }}>
                            <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='overline'>User Account</Typography>
                        </Box>
                    </Stack>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="הגדרות חשבון" {...a11yProps(0)} />
                        <Tab label="סיסמה" {...a11yProps(1)} />
                        <Tab label="אשכולות ומגייסים" {...a11yProps(2)} />
                        <Tab label="עדכון שדות" {...a11yProps(3)} />
                        <Tab label="Item Five" {...a11yProps(4)} />
                        <Tab label="Item Six" {...a11yProps(5)} />
                        <Tab label="Item Seven" {...a11yProps(6)} />
                    </Tabs>
                </Stack>
                <TabPanel value={value} index={0}>
                    הגדרות חשבון
                </TabPanel>
                <TabPanel value={value} index={1}>
                    סיסמה
                </TabPanel>
                <TabPanel value={value} index={2}>
                    ניהול אשכולות ומגייסים
                </TabPanel>
                <TabPanel value={value} index={3}>
                    הוספה / הסרה של שדות
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                    Item Seven
                </TabPanel>
            </Paper>
        </>

    );
}
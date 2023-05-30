import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Avatar, Button, Stack } from '@mui/material';
import AccountSettings from './Components/AccountSettings/AccountSettings';
import PasswordSettings from './Components/PasswordSettings/PasswordSettings';
import { ManageAccounts, Password, PeopleAltOutlined, Settings, Summarize } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import RecruiterList from '../RecruitersList/RecruiterList';
import SectorChip from '../SectorChip/SectorChip';

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
      {value === index && <Box p={3} style={{ width: '100%' }}>{children}</Box>}
    </div>
  );
};

const MyTabsPanel: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex',width: '100%' }}>
      <Stack direction='column'
              display={{xs:'none', sm: 'none', md: 'none', lg: 'flex'}}
      >
        <Stack direction='column' sx={{
          width: '150px', height: 'fit-content',
          borderRight: '1px solid rgba(0, 0, 0, 0.125)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
        }}
        >
          <Box sx={{
            display: 'flex', justifyContent: 'center', paddingRight: 4, paddingLeft: 4, paddingTop: 2

          }}>
            <Avatar sx={{width: 48, height: 48}} />
          </Box>

          <Box sx={{
            display: 'flex', justifyContent: 'center', padding: 1
          }}>
            <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif" }} variant='overline'>User Account</Typography>
          </Box>
        </Stack>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
        >
          <Tab icon={<ManageAccounts />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)'}} label="הגדרות משתמש" />

          <Tab icon={<Password />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)' }} label="סיסמה" />

          <Tab icon={<PeopleAltOutlined />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)' }} label="ניהול אשכולות" />

          <Tab icon={<PeopleAltOutlined />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)' }} label="ניהול מגייסים" />

          <Tab icon={<Summarize />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)' }} label="עדכון שדות" />

        </Tabs>
      </Stack>
        
      <Stack className='forMobile' direction='column'
              display={{xs:'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none'}}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
        >

          <Tooltip title={'הגדרות משתמש'}>
          <Tab icon={<ManageAccounts />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)'}} />
          </Tooltip>

                
          <Tooltip title={'סיסמה'}>
          <Tab icon={<Password />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)' }} />
          </Tooltip>
          
          <Tooltip title={'ניהול אשכולות ומגייסים'}>
          <Tab icon={<PeopleAltOutlined />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)' }} />
          </Tooltip>

           
          <Tooltip title={'ניהול אשכולות ומגייסים'}>
          <Tab icon={<PeopleAltOutlined />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)' }} />
          </Tooltip>

          <Tooltip title={'ניהול שדות'}>
          <Tab icon={<Summarize />} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)', borderRight: '1px solid rgba(0, 0, 0, 0.125)' }} />
          </Tooltip>
        </Tabs>
      </Stack>
  
      <TabPanel value={value} index={0}>
        <Typography component="div" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'>  הגדרות משתמש  </Typography>
          <AccountSettings />

      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'>  סיסמה  </Typography>
        <PasswordSettings />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'> ניהול אשכולות</Typography>
      </TabPanel>

      <TabPanel value={value} index={3}>

     <Stack direction='row' justifyContent='space-between'>
     <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'> ניהול מגייסים</Typography>
     <Button variant='contained'>הוסף מגייס</Button>
     </Stack>
        <RecruiterList />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <Typography component="span" sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }} variant='h6'>הוספה / הסרה של שדות</Typography>
       
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>

    </Box>
  );
};

export default MyTabsPanel;

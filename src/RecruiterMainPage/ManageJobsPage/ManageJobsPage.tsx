import { useState, useEffect } from "react";
import { dataref } from "../../FirebaseConfig/firebase";
import "./ManageJobsPage.css";
import MyTable from "./Components/MyTable/MyTable";
import { Box, Container } from "@mui/material";
import MyAvatar from "./Components/MyAvatar/MyAvatar";
import MyBar from "./Components/MyBar/MyBar";
import React from "react";



const ManageJobPageBody = () => {
    const [TableWidth, setTableWidth] = React.useState('lg');

 return (
    <Box className="ManageJobPage-Body" sx={{ width: "100%" }}>
    <Container sx={{ display: 'flex', justifyContent: 'center' }}
        style={{ left: 'auto', right: 'auto', padding: 0, marginTop: '30px', }} maxWidth="sm">
        <MyAvatar />
    </Container>
    <Container
        style={{
            left: 'auto', right: 'auto', padding: 0, marginTop: '20px', width: 'fit-content',
        }} maxWidth="sm">

        <MyBar TableWidth={TableWidth} setTableWidth={setTableWidth} />
    </Container>
    <MyTable TableWidth={TableWidth} />
</Box>
 );
};

const TableContainer = () => {
    const [data, setData] = useState({});
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        dataref.ref().child('jobs').on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            }
            else {
                setData({});
            }
        });

        return () => {
            setData({});
        };
    }, []);


    return (

        <>

            {/* <Container className="mt-5">
                <div className="d-flex flex-row bd-highlight" style={{ marginLeft: '10px' }}>
                    <div className="d-flex justify-content-start">
                        <AddOrUpdateJobPopup action={"משרה חדשה"} id="" data={{}} />
                    </div>
                </div>

                <div style={{ display: 'flex', margin: '5px' }}> */}
            {/* ####################################### SEARCH BAR ################################################################ */}
            {/* <Form.Group className="d-flex flex-column bd-highlight mb-3" style={{ flex: '1', margin: '5px' }}>
                        <div className="d-flex align-items-end" style={{ height: '100%' }}>
                            <InputGroup size="sm">
                                <Form.Control
                                    onChange={(e) => { setSearch(e.target.value) }}
                                    dir="rtl"
                                    placeholder="חיפוש"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-primary">
                                    <Search />
                                </Button>
                            </InputGroup>
                        </div>
                    </Form.Group> */}

            {/* ####################################### END SEARCH BAR ############################################################ */}

            {/* ####################################### FILTER ############################################################ */}
            {/* <Form.Group className="d-flex flex-column bd-highlight mb-3" dir="rtl" style={{ flex: '1', margin: '5px' }}>
                        <div className="d-flex align-items-end" style={{ height: '100%' }}>
                            <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold' }}>סנן לפי:</Form.Label>
                        </div>

                        <div className="d-flex align-items-end" style={{ height: '100%' }}>
                            <Form.Select
                                size="sm"
                                defaultChecked={true}
                                defaultValue={'ללא'}
                                onChange={(e) => { setFilter(e.target.value) }}
                            >
                                <option>ללא</option>
                                <option>מס' משרה</option>
                                <option>איזור</option>
                                <option>תפקיד</option>
                                <option>אחוז משרה</option>
                            </Form.Select>
                        </div>

                    </Form.Group> */}

            {/* ####################################### END FILTER ######################################################### */}

            {/* ####################################### SORT ############################################################ */}
            {/* <Form.Group className="d-flex flex-column bd-highlight mb-3" dir="rtl" style={{ flex: '1', margin: '5px' }}>
                        <div className="d-flex align-items-end" style={{ height: '100%' }}>
                            <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold' }}>מיין לפי:</Form.Label>
                        </div>

                        <div className="d-flex align-items-end" style={{ height: '100%' }}>
                            <Form.Select
                                size="sm"
                                style={{ width: '100%' }}
                                defaultChecked={true}
                                defaultValue={'ללא'}
                                onChange={(e) => { setSortOrder(e.target.value) }}
                            >
                                <option>ללא</option>
                                <option>מס' משרה</option>
                                <option>איזור</option>
                                <option>תפקיד</option>
                                <option>אחוז משרה</option>
                            </Form.Select>
                        </div>
                    </Form.Group> */}
            {/* ####################################### END SORT ######################################################### */}
            {/* 
                </div>
                
                <table dir='rtl' style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th><LayoutTextSidebar /> מס' משרה</th>
                            <th><GeoFill /> איזור</th>
                            <th><Hammer /> תפקיד</th>
                            <th><Percent /> אחוז משרה</th>
                            <th><PeopleFill /> מועמדים שניגשו</th>
                        </tr>
                    </thead>
                    <tbody>


                        {Object.keys(data).filter((item_key) => {

                            return search.toLowerCase() === '' ? item_key :
                                filter.toLowerCase() === 'תפקיד' ?
                                    data[item_key].Job_Name.toLowerCase().includes(search) :
                                    filter.toLowerCase() === 'איזור' ?
                                        data[item_key].Job_Location.toLowerCase().includes(search) :
                                        filter.toLowerCase() === 'אחוז משרה' ?
                                            data[item_key].Job_Percentage.toLowerCase().includes(search) :
                                            (data[item_key].Job_Name.toLowerCase().includes(search) || data[item_key].Job_Location.toLowerCase().includes(search) || data[item_key].Job_Percentage.toLowerCase().includes(search));

                        }).sort((a, b) => {
                            if (sortOrder.toLowerCase() === 'אחוז משרה') {
                                return data[a].Job_Percentage > data[b].Job_Percentage ? 1 : -1
                            }
                            else if (sortOrder.toLowerCase() === 'איזור') {
                                return data[a].Job_Location > data[b].Job_Location ? 1 : -1
                            }
                            else if (sortOrder.toLowerCase() === 'תפקיד') {
                                return data[a].Job_Name > data[b].Job_Name ? 1 : -1
                            }
                            else return 0;
                        }).map((item_key, index) => {

                            return (
                                <JobRow key={item_key} data={data} index={index} item_key={item_key}></JobRow>
                            );
                        })}

                    </tbody>
                </table>

            </Container> */}
        </>
    );
};

export default ManageJobPageBody;

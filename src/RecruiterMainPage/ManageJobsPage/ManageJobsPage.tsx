import { useState, useEffect } from "react";
import { dataref } from "../../FirebaseConfig/firebase";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { GeoFill, LayoutTextSidebar, PeopleFill, Percent, Hammer } from "react-bootstrap-icons";
import "./ManageJobsPage.css";
import JobRow from "./Components/JobRow/JobRow";
import { Search } from "react-bootstrap-icons";
import AddOrUpdateJobPopup from "./Components/AddOrUpdateJobPopup/AddOrUpdateJobPopup";

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

      <Container className="mt-5">

        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>

            <AddOrUpdateJobPopup action="משרה חדשה" id="" data={{}} />
          </div>
          {/* ####################################### SEARCH BAR ################################################################ */}
          <Form.Group style={{ flex: '1', margin: '5px' }}>
            <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold', visibility: 'hidden' }}>מיין לפי:</Form.Label>
            <InputGroup className="mb-3" size="sm">
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
          </Form.Group>
          {/* ####################################### END SEARCH BAR ############################################################ */}

          {/* ####################################### FILTER ############################################################ */}
          <Form.Group className="mb-3" dir="rtl" style={{ flex: '1', margin: '5px' }}>
            <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold' }}>סנן לפי:</Form.Label>

            <Form.Select
              size="sm"
              style={{ width: '100%' }}
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
          </Form.Group>
          {/* ####################################### END FILTER ######################################################### */}

          {/* ####################################### SORT ############################################################ */}
          <Form.Group className="mb-3" dir="rtl" style={{ flex: '1', margin: '5px' }}>
            <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold' }}>מיין לפי:</Form.Label>

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
          </Form.Group>
          {/* ####################################### END SORT ######################################################### */}

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
                    filter.toLowerCase() === "אחוז משרה" ?
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

      </Container>


    </>
  );
};

export default TableContainer;

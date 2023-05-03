import { type } from '@testing-library/user-event/dist/type'
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { GeoFill, LayoutTextSidebar, PencilSquare, Percent } from 'react-bootstrap-icons';
import { Component } from 'react';
import { Search } from "react-bootstrap-icons";


interface Props {}

interface State {}


const HistoryTable = () => {
    const [search, setSearch] = useState('');

    return (
     <div>
      {/* button */}
      <button style={{}} id="createReport" >צור דו"ח חדש<LayoutTextSidebar /></button>
      {/* ######### sort ############### */}
      <Form.Group className="d-flex flex-column bd-highlight mb-3" dir="rtl" style={{ flex: '1', margin: '5px'}}>
            <div className="d-flex align-items-end" style={{ height: '100%' }}>
                <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold' }}>מיין לפי:</Form.Label>
            </div>
            <div className="d-flex align-items-end" style={{ height: '100%' }}>
                <Form.Select
                    size="sm"
                    style={{ width: '100%' }}
                    defaultChecked={true}
                    defaultValue={'ללא'}
                    // onChange={(e) => { setSortOrder(e.target.value) }}
                     >
                    <option>ללא</option>
                    <option>מס' משרה</option>
                    <option>איזור</option>
                    <option>תפקיד</option>
                    <option>אחוז משרה</option>
                </Form.Select>
            </div>
        </Form.Group>
        {/* ########### end sort ########### */}
         
         {/* ############## search bar ############ */}
         <Form.Group className="d-flex flex-column bd-highlight mb-3" style={{ flex: '1', margin: '5px'}}>
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
          </Form.Group>


      <table id="historyReports">
        <thead>
          <tr>
            <th>שם</th>
            <th>תאריך שנוצר</th>
            <th>הופק ע"י</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>מועמדים שניגשו בחודש האחרון</td>
            <td>30/12/23</td>
            <td>רונית</td>
          </tr>
          <tr>
            <td>משרות שנדחו כתוצאה מפערים כספיים לשנת 2023</td>
            <td>10/10/23</td>
            <td>אנה</td>
          </tr>
          <tr>
            <td>משרות בצפון ב10 ימים האחרונים</td>
            <td>09/03/23</td>
            <td>יוסף</td>
          </tr>       
        </tbody>
      </table>
      </div>
    );
  }


export default HistoryTable;
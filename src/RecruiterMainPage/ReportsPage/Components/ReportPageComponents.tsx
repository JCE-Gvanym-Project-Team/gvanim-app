import { type } from '@testing-library/user-event/dist/type'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GeoFill, LayoutTextSidebar, PencilSquare, Percent } from 'react-bootstrap-icons';
import { Component } from 'react';

interface Props {}

interface State {}





// const buttonToCreateNewReport = () => {
  // const popup = document.createElement("div");
  // popup.className = "popup";
//  const createReportButton = document.createElement("button");
//  createReportButton.textContent = "יצירת דוח חדש";
// 
//  createReportButton.addEventListener("click", () => {
  //  });
// 
//  popup.appendChild(createReportButton);
// 
//  document.body.appendChild(popup);
// }
// 

const HistoryTable = () => {
    return (
      
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
    );
  }


export default HistoryTable;
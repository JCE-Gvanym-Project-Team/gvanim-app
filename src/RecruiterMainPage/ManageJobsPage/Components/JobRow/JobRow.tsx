import { ButtonGroup } from 'react-bootstrap';
import "./JobRow.css";
import DeletePopup from '../DeletePopup/DeletePopup';
import AddOrUpdateJobPopup from '../AddOrUpdateJobPopup/AddOrUpdateJobPopup';
import React from "react";

type Props = {
    item_key: string,
    data: {},
    index: number
}

const JobRow = ({ data, item_key, index }: Props) => {
    return (
        <tr>
            <td>
                <div style={{ width: '100%', textAlign: 'start' }}>

                    <ButtonGroup className="mb-2" size='lg'>
                        <a href='#' className='me-1' style={{ color: 'black' }}><DeletePopup id={item_key} /></a>
                        <a href='#' className='me-1' style={{ color: 'black' }}><AddOrUpdateJobPopup action='ערוך משרה' id={item_key} data={data} /></a>
                    </ButtonGroup>
                </div>
            </td>
            <td>{index}</td>
            <td>{data[item_key].Job_Location}</td>
            <td>{data[item_key].Job_Name}</td>
            <td>{data[item_key].Job_Percentage}</td>
            <td>ההמשך יבוא</td>
        </tr>
    );
}

export default JobRow;
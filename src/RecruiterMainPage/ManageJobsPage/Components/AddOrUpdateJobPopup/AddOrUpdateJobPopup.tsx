import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { dataref } from '../../../../FirebaseConfig/firebase';
import "./AddOrUpdateJobPopup.css";
import { GeoFill, LayoutTextSidebar, PencilSquare, Percent } from 'react-bootstrap-icons';


type CardProps = {
  action: string,
  id: string,
  data: {}
}


const ModalItem = ({ action, id, data }: CardProps): React.ReactElement => {

  const [show, setShow] = useState(false);
  const [Job_Name, setJobName] = useState('');
  const [Job_Description, setJobDescription] = useState('');
  const [Job_Location, setJobLocation] = useState('');
  const [Job_Percentage, setJobPercentage] = useState('');

  var newJob = false;

  if (action === 'משרה חדשה') {
    newJob = true;
  }

  const handleClose = () => { setShow(false); }

  const handleShow = () => {
    // if i want to edit job
    if(newJob !== true && data !== null) {

    setJobName(data[id].Job_Name);
    setJobDescription(data[id].Job_Description);
    setJobLocation(data[id].Job_Location);
    setJobPercentage(data[id].Job_Percentage);
    }

    else {
      // if i want to create a new job

      setJobName('');
    setJobDescription('');
    setJobLocation('');
    setJobPercentage('');
    }
    
    setShow(true);
  }
  

  const handleAdd = () => {
    if (newJob == true) {
      // ################ INSERT data ###########
      dataref.ref("jobs").push().set({

        Job_Name: Job_Name,
        Job_Description: Job_Description,
        Job_Location: Job_Location,
        Job_Percentage: Job_Percentage

      }).catch(alert);

      // ################ END INSERT data ###########
    }
    else {
      // ################ UPDATE data ###########
      dataref.ref().child(`jobs/${id}`).update({

        Job_Name: Job_Name,
        Job_Description: Job_Description,
        Job_Location: Job_Location,
        Job_Percentage: Job_Percentage

      }).catch(alert);
      // ################ END UPDATE data ###########
    }
    setShow(false);

  }

  return (
    <>
      {newJob
        ? <Button variant='outline-secondary' size='lg' onClick={handleShow} style={{}}>משרה חדשה <LayoutTextSidebar /></Button>
        : <PencilSquare className="edit" style={{ fontSize: 'medium' }} onClick={handleShow} />
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto">{action}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" dir="rtl">
              <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold' }}>שם המשרה:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={Job_Name} onChange={(e) => { setJobName(e.target.value) }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              dir="rtl"
            >
              <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold' }}>תיאור המשרה:</Form.Label>
              <Form.Control as="textarea" rows={3} value={Job_Description} onChange={(e) => { setJobDescription(e.target.value) }} />
            </Form.Group>
          </Form>

          
          <div className='parent' dir="rtl">

            <div className='child1'>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold' }}><GeoFill/> איזור:</Form.Label>

              <Form.Control size="sm" type="text" style={{width: '100%'}} placeholder='נתניה'
              value={Job_Location} onChange={(e) => { setJobLocation(e.target.value) }}
              />
            </Form.Group>
            </div>

            <div className='child2'>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: 'smaller', fontWeight: 'bold' }}><Percent/> אחוז משרה:</Form.Label>
         
                <Form.Select size="sm" style={{ width: '100%' }}
                value={Job_Percentage} onChange={(e) => { setJobPercentage(e.target.value) }}
                >
                    <option>5%</option>   <option>10%</option>   <option>15%</option>  <option>20%</option>  <option>25%</option>
                    <option>30%</option>  <option>35%</option>   <option>40%</option>  <option>45%</option>  <option>50%</option>
                    <option>55%</option>  <option>60%</option>   <option>65%</option>  <option>70%</option>  <option>75%</option>
                    <option>80%</option>  <option>85%</option>   <option>90%</option>  <option>95%</option>  <option>100%</option>
                </Form.Select>
            </Form.Group>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <div style={{ width: '100%' }}>
            <Button variant="primary" onClick={handleAdd}>
              {newJob ? 'פרסם' : 'שמור שינויים'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalItem;
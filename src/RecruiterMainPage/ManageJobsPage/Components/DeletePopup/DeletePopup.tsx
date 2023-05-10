import React, { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { dataref } from '../../../../Firebase/FirebaseConfig/firebase';


type CardProps = {
    id: string
}

const DeleteItem = (id: any): React.ReactElement => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const remove = ({ id }: CardProps) => {
         dataref.ref().child(`jobs/${id}`).remove();
        setShow(false);
    }

    return (
        <>
            <Trash className="trash" style={{ fontSize: 'medium' }} onClick={handleShow}></Trash>


            <Modal show={show} onHide={handleClose} dir="rtl">
                <Modal.Header style={{borderBottom: 'none'}} closeButton>
                </Modal.Header>
                <Modal.Body>האם אתה בטוח שברצונך להסיר את המשרה הזו?</Modal.Body>
                <Modal.Footer style={{borderTop: 'none'}}>

                <Button variant="secondary" onClick={ handleClose }>
                       ביטול
                    </Button>

                    <Button variant="danger" onClick={() => { remove(id) }}>
                       הסר
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteItem;
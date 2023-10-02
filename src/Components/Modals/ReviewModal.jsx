import { Form, Modal, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { postReview } from '../../Store/reviewSlice';
import { getLocalById } from '../../Store/localSlice';
import { getArtistById } from '../../Store/artistSlice';



function ReviewModal({ author, dest, role }) {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [rev, setRev] = useState('');
    const [rate, setRate] = useState(null)
    const [alert, setAlert] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sendReview = ({ author, dest, role }) => {
        if (rate && rev) {
            let postPayload = {
                rate: rate,
                comment: rev,
            }
            if (role === 'Artist') {
                postPayload.authorArtist = author
            } else if (role === 'Local') {
                postPayload.authorLocal = author
            }
            console.log(postPayload);
            let allData = {
                postPayload: postPayload,
                dest: dest,
            }
          
            if (allData) { 
                dispatch(postReview(allData))
                    .then(()=>handleClose())
                    .then(()=> dispatch(getLocalById(dest)))
                    .then(()=> dispatch(getArtistById(dest)))
                    .then(()=> setAlert(false))
                    .then(()=> {setRev(''); setRate(null)} )
            }
        } else setAlert(true)       
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Lascia una recensione
            </Button>

            <Modal centered size="lg" show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Lascia qui la tua recensione</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex flex-column gap-3'>
                    <MDBTextArea type='text' label='Recensione' onChange={(e) => setRev(e.target.value)} />
                    <Form.Select aria-label="Default select" value={rate} onChange={(e) => setRate(e.target.value)}>
                        <option>Valutazione</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>
                    {alert && (
                        <Alert variant='danger'>Completa tutti i campi prima di inviare</Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => sendReview({ author, dest, role })}>
                        Invia
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default ReviewModal;
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSession } from '../../Middlewares/ProtectedRoutes';
import { useDispatch } from 'react-redux';
import { candidateToEvent, getEventById } from '../../Store/eventSlice';
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

function CandidateModal(eventId) {
    const [show, setShow] = useState(false);
    const [cachet, setCachet] = useState('')
    const [note, setNote] = useState('')

    const session = useSession()
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sendCandidate = () => {
        const data = {
            eventId: eventId.eventId,
            artistId: session.id,
            postPayload: {
                cachet: cachet,
                note: note
            }
        }
        console.log(data)
        dispatch(candidateToEvent(data)).then(()=>handleClose())
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Candidati
            </Button>

            <Modal centered size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Candidati all'evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MDBTextArea wrapperClass='mb-4' label='Note' id='form1' type='text' onChange={(e) => setNote(e.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Cachet' id='form1' type='text' onChange={(e) => setCachet(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={()=>sendCandidate()}>
                        Candidati
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CandidateModal;
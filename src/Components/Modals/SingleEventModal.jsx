import { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useSession } from '../../Middlewares/ProtectedRoutes';
import CandidateModal from './CandidateModal';
import { removeCandidature } from '../../Store/eventSlice';
import { useDispatch } from 'react-redux';
import { MDBTextArea, MDBInput } from 'mdb-react-ui-kit';
import { candidateToEvent } from '../../Store/eventSlice';
import { getArtistById } from '../../Store/artistSlice';
import { refresh } from '../../Store/eventSlice';


function SingleEvent(event) {
    event = event.event
    const [show, setShow] = useState(false);
    const [isCandidate, setIsCandidate] = useState(false)
    const [candidatureId, setCandidatureId] = useState('')
    const [cachet, setCachet] = useState('')
    const [note, setNote] = useState('')
    const [alert, setAlert] = useState(false)
    const session = useSession()
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (event && event.candidates) {
            const candidate = event.candidates.find(candidate => candidate.artist === session.id);
            if (candidate) {
                setIsCandidate(true);
                setCandidatureId(candidate._id);
            } else {
                setIsCandidate(false);
                setCandidatureId(null);
            }
        } else {
            setIsCandidate(false);
            setCandidatureId(null);
        }
    }, [event, session.id]);

    const sendRemove = () => {
        const allData = {
            candidature: candidatureId,
            event: event._id
        }

        dispatch(removeCandidature(allData)).then(() => handleClose()).then(()=> dispatch(refresh()))
    }

    const sendCandidate = () => {
        if (note && cachet) {
            const data = {
                eventId: event._id,
                artistId: session.id,
                postPayload: {
                    cachet: cachet,
                    note: note
                }
            }
            console.log(data)
            setAlert(false)
            dispatch(candidateToEvent(data)).then(() => handleClose()).then(()=> dispatch(refresh()))
        } else setAlert(true)
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Dettagli
            </Button>

            <Modal centered size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{event.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body className='d-flex gap-3 flex-wrap'>
                    <img style={{ maxWidth: '300px', borderRadius: '35px' }} src={event.location.proPic} alt="" />
                    <div>
                        <p onClick={() => console.log(session.id, isCandidate, event)}>Nome Locale: {event.location.name}</p>
                        <p>Nome Evento: {event.name}</p>
                        <p>Data: {event.date}</p>
                        <p>Durata: {event.duration}</p>
                        <p>Benefits: {event.benefits}</p>
                        <p>Rimborsi: {event.refund}</p>
                        <p>Descrizione: {event.description }</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className='flex-column'>
                    
                        <MDBTextArea wrapperClass='mb-4' label='Note' id='form1' type='text' onChange={(e) => setNote(e.target.value)} />
                        <MDBInput wrapperClass='mb-4' label='Cachet' id='form1' type='text' onChange={(e) => setCachet(e.target.value)} />
                        {alert && (<Alert variant='danger'>Tutti i campi devono essere compilati!</Alert>)}
                    
                    <div className='d-flex gap-3'>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {!isCandidate ? <Button onClick={() => sendCandidate()} variant='primary'>Candidati</Button> : <Button onClick={() => sendRemove()} variant='danger'>Annulla la candidatura</Button>}
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SingleEvent;
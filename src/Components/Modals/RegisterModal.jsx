import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import popUp from '../../assets/popup.png'
import popUp1 from '../../assets/popup1.png'

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                onClick={handleShow}
                className='my-4'
                style={{ width: '250px', height: '60px', fontSize: '1.5rem' }}
            >
                REGISTRATI
            </Button>
            <Modal centered size="lg" show={show} onHide={handleClose}>
                <Modal.Header className='d-flex justify-content-center' closeButton>
                    <Modal.Title>CHI SEI?</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center gap-5'>
                    <div className='d-flex flex-column align-items-center'>
                        <img style={{ width: '130px' }} src={popUp} alt="" />
                        <Button
                            as={Link} to={'/artistRegistration'}
                            onClick={handleShow}
                            className='my-4'
                            style={{ width: '250px', height: '60px', fontSize: '1.5rem' }}
                        >
                            ARTISTA
                        </Button>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <img style={{ width: '130px' }} src={popUp1} alt="" />
                        <Button
                            as={Link} to={'/localRegistration'}
                            onClick={handleShow}
                            className='my-4'
                            style={{ width: '250px', height: '60px', fontSize: '1.5rem' }}
                        >
                            LOCALE
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;
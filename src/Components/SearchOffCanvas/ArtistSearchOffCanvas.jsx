import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MDBBtn, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { getAllLocal, getLocal } from '../../Store/localSlice';
import { MDBRange, MDBRadio } from 'mdb-react-ui-kit';
import { useSession } from '../../Middlewares/ProtectedRoutes';

function Example() {
    const session = useSession();
    const dispatch = useDispatch();

    const [band, setBand] = useState(false);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [backline, setBackline] = useState('');
    const [distance, setDistance] = useState(100000);
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createUrl = () => {
        const url = `name=${name}&favouriteGenre=${genre}&backline=${backline}&distance=${distance}&lat=${session.lat}&lon=${session.lon}&region=${region}&city=${city}&localType=${type}`
        dispatch(getLocal(url))
        console.log(url)
    }

    const resetfilter = () => {
        setName('')
        setGenre('')
        setBackline('')
        setDistance(1000000)
        setRegion('')
        setCity('')
        setType('')
        dispatch(getAllLocal())
    }
    return (
        <>

            <MDBIcon className='mt-3 ms-2 mb-2 me-2' size='lg' fas icon="search" onClick={handleShow} />

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cerca tra tutti i locali</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>*puoi utilizzare uno o più campi di filtraggio</div> <br />
                    <div>
                        <MDBInput onChange={(e) => setName(e.target.value)} value={name} wrapperClass='mb-4' label='Name' id='form1' type='text' />
                        <MDBInput onChange={(e) => setType(e.target.value)} value={type} label='Local Type' id='form1' type='text' />
                        <span style={{ fontSize: '0.6rem' }}> <em>Es. pizzeria, pub, bar ecc</em> </span>
                        <MDBInput onChange={(e) => setGenre(e.target.value)} value={genre} wrapperClass='mb-4 mt-3' label='Genre' id='form1' type='text' />
                        <MDBInput onChange={(e) => setBackline(e.target.value)} value={backline} wrapperClass='mb-4' label='Backline' id='form1' type='text' />
                        <MDBRange
                            min='1'
                            max='300'
                            step='5'
                            id='customRange3'
                            label='Set distance'
                            /* defaultValue={300} */
                            onChange={(e) => setDistance(e.target.value)}
                        />
                    </div>
                    <div>
                        <MDBInput onChange={(e) => setRegion(e.target.value)} wrapperClass='mb-4' label='Region' id='form1' type='text' />
                        <MDBInput onChange={(e) => setCity(e.target.value)} wrapperClass='mb-4' label='City' id='form1' type='text' />

                    </div>
                    <div className='d-flex gap-3'>
                        <MDBBtn color='success' onClick={() => createUrl()}>Search</MDBBtn>
                        <MDBBtn color='primary' onClick={() => resetfilter()}>Elimina Filtri</MDBBtn>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Example;
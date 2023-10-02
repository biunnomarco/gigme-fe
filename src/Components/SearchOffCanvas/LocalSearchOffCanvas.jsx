import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MDBBtn, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { getAllArtist, getArtist } from '../../Store/artistSlice';
import { MDBRange, MDBRadio } from 'mdb-react-ui-kit';

function Example() {

    const dispatch = useDispatch()

    const [band, setBand] = useState(false);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [instrument, setInstrument] = useState('');
    const [distance, setDistance] = useState(1000000);
    const [members, setMembers] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createUrl = () => {
        const url = `name=${name}&genre=${genre}&instruments=${instrument}&distance=${distance}&lat=45.5489856&lon=9.1608651&members=${members}&region=${region}&city=${city}`
        dispatch(getArtist(url))
    }
    const resetfilter = () => {
        setName('')
        setGenre('')
        setInstrument('')
        setDistance(1000000)
        setRegion('')
        setCity('')
        setMembers('')
        dispatch(getAllArtist())
    }
    return (
        <>

            <MDBIcon className='mt-3 ms-2 mb-2 me-2' size='lg' fas icon="search" onClick={handleShow} />

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>LocalSearchOffCanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h3>Filter</h3>
                    <div>
                        <MDBRadio wrapperClass='mb-4' onClick={() => { setBand(false); setMembers('') }} name='typeRadio' id='inlineRadio1' value='option1' label='All' inline />
                        <MDBRadio wrapperClass='mb-4' onClick={() => { setBand(false); setMembers(1) }} name='typeRadio' id='inlineRadio1' value='option1' label='Solo' inline />
                        <MDBRadio wrapperClass='mb-4' onClick={() => setBand(true)} name='typeRadio' id='inlineRadio2' value='option2' label='Band' inline />
                        {band === true && (
                            <div>
                                <div>How many members?</div>
                                <MDBRadio wrapperClass='mb-4' onClick={() => { setMembers('') }} name='members' id='inlineRadio2' value='option2' label='Any' inline />
                                <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('2')} name='members' id='inlineRadio2' value='option2' label='2' inline />
                                <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('3')} name='members' id='inlineRadio2' value='option2' label='3' inline />
                                <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('4')} name='members' id='inlineRadio2' value='option2' label='4' inline />
                                <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('5')} name='members' id='inlineRadio2' value='option2' label='5' inline />
                                <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('6+')} name='members' id='inlineRadio2' value='option2' label='6+' inline />
                            </div>
                        )}
                    </div>
                    <div>
                        <MDBInput onChange={(e) => setName(e.target.value)} value={name} wrapperClass='mb-4' label='Name' id='form1' type='text' />
                        <MDBInput onChange={(e) => setGenre(e.target.value)} value={genre} wrapperClass='mb-4' label='Genre' id='form1' type='text' />
                        <MDBInput onChange={(e) => setInstrument(e.target.value)} value={instrument} wrapperClass='mb-4' label='Instruments' id='form1' type='text' />
                        <MDBRange
                            min='1'
                            max='300'
                            step='5'
                            id='customRange3'
                            label='Set distance'
                            defaultValue={distance}
                            onChange={(e) => setDistance(e.target.value)}
                        />
                    </div>
                    <div>
                        <MDBInput onChange={(e) => setRegion(e.target.value)} value={region} wrapperClass='mb-4' label='Region' id='form1' type='text' />
                        <MDBInput onChange={(e) => setCity(e.target.value)} value={city} wrapperClass='mb-4' label='City' id='form1' type='text' />

                    </div>
                    <div className="d-flex gap-3">
                        <MDBBtn color='success' onClick={() => createUrl()}>Search</MDBBtn>
                        <MDBBtn color='primary' onClick={() => resetfilter()}>Elimina Filtri</MDBBtn>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Example;
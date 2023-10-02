import React, { useState } from 'react';
import { MDBRadio, MDBTextArea } from 'mdb-react-ui-kit';
import { FindCoordinates } from '../../Hooks/FindCoordinates';
import { nanoid } from 'nanoid';
import JoditEditor from 'jodit-react';
import { useDispatch } from 'react-redux';
import { postArtist } from '../../Store/artistSlice';
import {
    MDBFile,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon,
}
    from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function App() {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [members, setMembers] = useState('1');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [band, setBand] = useState(false);
    const [proPic, setProPic] = useState(null);
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [alert, setAlert] = useState(false)
    const [next, setNext] = useState(false)
    const [pictures, usePictures] = useState([]);

    //!SET GENRE
    const [genre, setGenre] = useState([]);
    const handleAddGenre = () => {
        const gen = [...genre, '']
        setGenre(gen)
    }
    const handleChangeGenre = (e, i) => {
        const inputdata = genre
        inputdata[i] = e.target.value;
        setGenre(inputdata)
    }
    const handleRemoveGenre = (i) => {
        const delGen = [...genre]
        delGen.splice(i, 1)
        setGenre(delGen)
    }
    //!SET INSTRUMENT
    const [instrument, setInstrument] = useState([]);
    const handleAddInstrument = () => {
        const inst = [...instrument, '']
        setInstrument(inst)
    }
    const handleChangeInstrument = (e, i) => {
        const inputdata = instrument
        inputdata[i] = e.target.value;
        setInstrument(inputdata)
    }
    const handleRemoveInstrument = (i) => {
        const delInst = [...instrument]
        delInst.splice(i, 1)
        setInstrument(delInst)
    }

    //! GO TO NEXT PAGE
    const goToNext = () => {
        if (!email || !password || !secondPassword || !members || !name || !region || !city || !address) {
            setAlert(true)
        } else {
            setAlert(false)
            setNext(true)
        }
    }
    //! PREVIOUS PAGE
    const goToPrev = () => {
        setNext(false)
        setAlert(false)
    }
    //!SEND REGISTRATION FORM
    const sendRegister = async () => {
        if (!email || !password || !secondPassword || !members || !name || !genre || !region || !city || !address || !instrument || !description || !proPic) {
            setAlert(true)
        } else if (secondPassword === password) {
            const coordinates = await FindCoordinates(`${region} ${city} ${address}`)

            const registerForm = {
                email: email,
                password: password,
                members: members,
                name: name,
                genre: genre,
                region: region,
                city: city,
                address: address,
                instruments: instrument,
                lat: coordinates.lat,
                lon: coordinates.lon,
                description: description,
                proPic: proPic,
                instagram: instagram,
                facebook: facebook,
            }

            console.log(registerForm)
            dispatch(postArtist(registerForm)).then(() => navigate('/validationWait'))

        } else console.log("psw diverse")
    }



    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

            <MDBRow>

                <MDBCol md='6' lg={7} style={{ height: '80vh' }} className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 75%)' }}>
                        Benvenuto su Gig-Me! <br />
                        <span style={{ color: 'hsl(218, 81%, 85%)' }}>Registrati ora come musicista</span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                       Gig-me è un servizio gratuito che ti permette di entrare in contatto con decine di locali che stanno aspettando solo te!
                       Registrati ed avrai la possibilità di candidarti a tantissimi eventi scegliendo tra quelli più affini a te, oppure cerca e contatta un locale filtrando in base ai tuoi generi musicali! 
                    </p>

                </MDBCol>

                <MDBCol md='6' lg={5} className='d-flex align-items-center' >
                    <MDBCard style={{width: '80%'}} className='my-2  bg-glass'>
                        {/* PAGINA 1 */}
                        {!next && (
                            <MDBCardBody className='p-3 text-center'>

                                <div style={{ fontSize: '28px' }} className="fw-bold">  Register Now</div>

                                <MDBRow>
                                    <MDBCol col='12'>
                                        <MDBRadio wrapperClass='mb-4' onClick={() => { setBand(false); setMembers(1) }} name='typeRadio' id='inlineRadio1' value='option1' label='Solo' inline />
                                        <MDBRadio wrapperClass='mb-4' onClick={() => setBand(true)} name='typeRadio' id='inlineRadio2' value='option2' label='Band' inline />
                                        <span style={{ fontSize: '20px' }}>*</span>
                                    </MDBCol>
                                    {band === true && (
                                        <div>
                                            <div>How many members?</div>
                                            <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('2')} name='members' id='inlineRadio2' value='option2' label='2' inline />
                                            <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('3')} name='members' id='inlineRadio2' value='option2' label='3' inline />
                                            <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('4')} name='members' id='inlineRadio2' value='option2' label='4' inline />
                                            <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('5')} name='members' id='inlineRadio2' value='option2' label='5' inline />
                                            <MDBRadio wrapperClass='mb-4' onClick={() => setMembers('6+')} name='members' id='inlineRadio2' value='option2' label='6+' inline />
                                        </div>
                                    )}
                                </MDBRow>

                                <MDBCol col='12' >
                                    <MDBInput
                                        wrapperClass='mb-4' label='Email *' id='form1' type='text' defaultValue={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </MDBCol>
                                <MDBRow>
                                    <MDBCol col='12' md={6}>
                                        <MDBInput
                                            wrapperClass='mb-4' label='Password *' id='form1' type='password' defaultValue={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </MDBCol>

                                    <MDBCol col='12' md={6}>
                                        <MDBInput
                                            wrapperClass='mb-4' label='Repeat Password *' id='form1' type='password' defaultValue={secondPassword}
                                            onChange={(e) => setSecondPassword(e.target.value)}
                                        />
                                    </MDBCol>
                                </MDBRow>



                                <MDBInput
                                    wrapperClass='mb-4' label='Name *' id='form1' type='text' placeholder='Insert your name, artist name or band name'
                                    onChange={(e) => setName(e.target.value)} defaultValue={name}
                                />
                                <MDBFile className='mb-4' label='Immagine del profilo *' onChange={(e) => setProPic(e.target.files[0])} id='customFile' />

                                <MDBRow>
                                    <MDBCol col='12' md={6}>
                                        <MDBInput
                                            wrapperClass='mb-4' label='Region *' id='form1' type='text'
                                            onChange={(e) => setRegion(e.target.value)} defaultValue={region}
                                        />
                                    </MDBCol>

                                    <MDBCol col='12' md={6}>
                                        <MDBInput
                                            wrapperClass='mb-4' label='City *' id='form1' type='text'
                                            onChange={(e) => setCity(e.target.value)} defaultValue={city}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBCol col='12'>
                                    <MDBInput
                                        wrapperClass='mb-4' label='Address *' id='form1' type='text'
                                        onChange={(e) => setAddress(e.target.value)} defaultValue={address}
                                    />
                                </MDBCol>

                                <MDBBtn onClick={() => goToNext()}>Next</MDBBtn>
                                {alert && (
                                    <Alert className='my-3' key={nanoid()} variant='danger'>Tutti i campi contrassegnati dall'asterisco sono obbligatori</Alert>
                                )}
                            </MDBCardBody>

                        )}
                        {/* PAGINA 2 */}
                        {next && (
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol col='12' className='d-flex align-items-center justify-content-start my-4 gap-3' style={{ textAlign: 'start !important' }}>
                                        <div className='text-start'>
                                            <div>Che genere di musica suoni? *</div>
                                            <div style={{ fontSize: '0.8em' }}> <em>Puoi aggiungerne un numero qualsiasi</em></div>
                                        </div>
                                        <MDBBtn color='success' size='sm' onClick={() => handleAddGenre()}>+</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    {genre.map((data, i) => {
                                        return (
                                            <MDBCol col='12' md={6} lg={4} style={{ position: 'relative' }}>
                                                <MDBInput wrapperClass='mb-4' label='Genre' id='form1' type='text' onChange={(e) => handleChangeGenre(e, i)} />
                                                <MDBBtn color='danger' className='mt-1' size='sm' style={{ position: 'absolute', top: '0', right: '0' }} onClick={() => handleRemoveGenre(i)}>x</MDBBtn>
                                            </MDBCol>
                                        )
                                    })}
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol col='12' className='d-flex align-items-center justify-content-start mb-4 gap-3' style={{ textAlign: 'start !important' }}>
                                        <div className='text-start'>
                                            <div>Che strumenti sai suonare? *</div>
                                            <div style={{ fontSize: '0.8em' }}> <em>Puoi aggiungerne un numero qualsiasi</em></div>
                                        </div>
                                        <MDBBtn color='success' size='sm' onClick={() => handleAddInstrument()}>+</MDBBtn>
                                    </MDBCol>

                                </MDBRow>
                                <MDBRow>
                                    {instrument.map((data, i) => {
                                        return (
                                            <MDBCol col='12' md={6} lg={4} style={{ position: 'relative' }}>
                                                <MDBInput wrapperClass='mb-4' label='Instrument' id='form1' type='text' onChange={(e) => handleChangeInstrument(e, i)} />
                                                <MDBBtn color='danger' className='mt-1' size='sm' style={{ position: 'absolute', top: '0', right: '-5px' }} onClick={() => handleRemoveInstrument(i)}>x</MDBBtn>
                                            </MDBCol>
                                        )
                                    })}
                                </MDBRow>
                                <div className='text-start my-4' style={{ width: '100%' }}>
                                    <div>Social Networks</div>
                                    <div className='d-flex align-items-center gap-2 my-1'>
                                        <MDBIcon size='lg' color='secondary' fab icon='instagram' />
                                        <MDBInput
                                            onChange={(e) => setInstagram(e.target.value)}
                                            label='Instagram link' id='form1' type='text' />
                                    </div>
                                    <div className='d-flex align-items-center gap-2 my-1'>
                                        <MDBIcon size='lg' color='secondary' fab icon='facebook' />
                                        <MDBInput
                                            onChange={(e) => setFacebook(e.target.value)}
                                            label='Facebook link' id='form1' type='text' />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <h4>Aggiungi una descrizione! *</h4>
                                    {/* <JoditEditor
                                        tabIndex={4}
                                        onBlur={newDescription => setDescription(newDescription)}
                                        onChange={newDescription => { }}
                                    /> */}
                                    <MDBTextArea label='Descrizione' type='text' onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className='d-flex justify-content-around'>
                                    <MDBBtn onClick={() => goToPrev()}> Previous </MDBBtn>
                                    <MDBBtn onClick={() => sendRegister()} size='md'>sign up</MDBBtn>
                                </div>
                                {alert && (
                                    <Alert className='my-3' key={nanoid()} variant='danger'>Tutti i campi contrassegnati dall'asterisco sono obbligatori</Alert>
                                )}
                            </MDBCardBody>
                        )}


                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default App;
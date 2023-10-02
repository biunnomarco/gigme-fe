import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSession } from '../../Middlewares/ProtectedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenres } from '../../Store/artistSlice';
import { json } from 'react-router-dom';
import { MDBInput, MDBCol, MDBRadio, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import '../../ColorsCss.css'
import { postEvent, refresh } from '../../Store/eventSlice';

function NewEventModal({ toggleEvent }) {

  const dispatch = useDispatch()
  const session = useSession()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('');
  const [requiredArtist, setRequiredArtist] = useState('');
  const [refund, setRefund] = useState('');
  const [benefits, setBenefits] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');

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


  const saveEvent = () => {
    const postPayload = {
      name: name,
      requiredArtist: requiredArtist,
      genres: genre,
      refund: refund,
      benefits: benefits,
      description: description,
      location: session.id,
      duration: duration,
      date: date,
    }
    console.log(postPayload)
    dispatch(postEvent(postPayload)).then(()=>dispatch(refresh())).then(()=>toggleEvent())
  }

  return (
    <div
      className="modal show"
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <Modal.Dialog style={{ color: 'black' }} centered size="lg" backdrop="static">
        <Modal.Header>
          <Modal.Title>CREA UN NUOVO EVENTO</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MDBInput
            wrapperClass='mb-4' label='Nome evento' id='form1' type='text'
            onChange={(e) => setName(e.target.value)}
          />

          <MDBCol col='12'>
            <div className='pe-2'>Che musicista stai cercando?</div>
            <MDBRadio wrapperClass='mb-4' onChange={() => setRequiredArtist('All')} name='typeRadio' id='inlineRadio1' value='option1' label='Tutti' inline />
            <MDBRadio wrapperClass='mb-4' onChange={() => setRequiredArtist('Solo')} name='typeRadio' id='inlineRadio1' value='option1' label='Solo' inline />
            <MDBRadio wrapperClass='mb-4' onChange={() => setRequiredArtist('Band')} name='typeRadio' id='inlineRadio2' value='option2' label='Band' inline />
          </MDBCol>

          <MDBRow className='d-flex align-items-center justify-content-start mb-4' style={{ textAlign: 'start !important' }}>
            <MDBCol col='12'>
              <span>Che genere musicale sarà l'evento?</span> <Button className='pinkBtn' size='sm' onClick={() => handleAddGenre()}>Add a Genre</Button>
            </MDBCol>
            <span style={{ fontSize: '0.8em' }}> <em> You can add any number of genres</em></span>
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

          <MDBInput
            wrapperClass='mb-4' label='Sono previsti rimborsi spese?' id='form1' type='text'
            onChange={(e) => setRefund(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4' label='Benefits musicisti, es. consumazione, cena ecc.' id='form1' type='text'
            onChange={(e) => setBenefits(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4' label='Durata evento' id='form1' type='text'
            onChange={(e) => setDuration(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4' label='Data' id='form1' type='date'
            onChange={(e) => setDate(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4' label='Descrizione evento' id='form1' type='text'
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => toggleEvent()} variant="secondary">Close</Button>
          <Button onClick={() => saveEvent()} variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default NewEventModal;
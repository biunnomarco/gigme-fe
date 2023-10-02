import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getEventById } from '../../Store/eventSlice'
import { Container, Alert } from 'react-bootstrap'
import '../../ColorsCss.css'

const SingleEventLocalPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const event = useSelector(state => state.events.eventById)

    useEffect(() => {
        dispatch(getEventById(id))
    }, [])

    return (
        <>
            {event && (
                <Container className='row py-5' fluid style={{ minHeight: '40vh' }}>
                    <h1 className='text-center mb-5'>{event.name}</h1>
                    <div className='col-12 col-md-5 px-5'>
                        <h3>Dettagli evento</h3> <br />
                        <p> Artista richiesto: <b>{event.requiredArtist}</b></p>
                        <p> Data: <b>{event.date}</b></p>
                        <p> Rimborsi: <b>{event.refund}</b></p>
                        <p> Benefits: <b>{event.benefits}</b></p>
                        <p> Durata: <b>{event.duration}</b></p>
                        <p> Descrizione: <b>{event.description}</b></p>
                        {event.genres && (
                        <>
                            <p>Genere:
                                {event.genres.map((genre, i) => {
                                    const genToUp = genre.charAt(0).toUpperCase() + genre.slice(1);
                                    return (
                                        <>
                                            {i + 1 !== event.genres.length && (
                                                <span><b>{genToUp}, </b></span>
                                            )}
                                            {i + 1 === event.genres.length && (
                                                <span><b>{genToUp}</b></span>
                                            )}

                                        </>
                                    )
                                })}</p>
                        </>
                    )}
                    </div>
                    <div className='col-12 col-md-7 d-flex flex-column gap-4'>
                        <h3>Candidati:</h3>
                        {event.candidates && event.candidates.length > 0 && (
                            event.candidates.map((candidate) => {
                                return (
                                    <>
                                        <div
                                            style={{ 
                                                width: '90%',
                                                borderRadius: '25px',
                                                boxShadow: '2px 2px grey'
                                            }}
                                            className='p-3 d-flex gap-4 lightBlueBg'
                                        >
                                            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src={candidate.artist.proPic} alt="" />
                                            <div style={{fontSize: '1.3rem'}}>
                                                <Link to={`/singleArtistPage/${candidate.artist._id}`}><h3>{candidate.artist.name}</h3></Link>
                                                <p>Note: {candidate.note}</p>
                                                <p>Cachet richiesto: {candidate.cachet}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        )}
                        {event.candidates && event.candidates.length === 0 && (<Alert variant='danger'> Ancora nessun candidato</Alert>)}
                    </div>
                </Container>
            )}
        </>
    )
}

export default SingleEventLocalPage
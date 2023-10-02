import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { allArtistCandidatures } from '../../Store/eventSlice'
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useSession } from '../../Middlewares/ProtectedRoutes'
import CandidatureCard from '../../Components/CandidatureBanner/CandidatureCard'
import { getArtistById } from '../../Store/artistSlice'

const ArtistDashboard = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const artist = useSelector(state => state.artists.artistById)
    const candidatures = useSelector(state => state.events.candidatures)
    const session = useSession()

    useEffect(() => {
        dispatch(getArtistById(id))
        dispatch(allArtistCandidatures(id))
    }, [])

    const [fillActive, setFillActive] = useState('tab1');

    const handleFillClick = (value) => {
        if (value === fillActive) {
            return;
        }

        setFillActive(value);
    };

    return (
        <Container fluid className='py-5 m-3 d-flex row'>
                <h1 className='text-center mb-4'>{artist.name}</h1>
            <Row>
                <div className='col-12 col-lg-7 d-flex flex-column'>
                    <img className='m-auto' style={{ width: '60%', borderRadius: '30px' }} src={artist.proPic} alt="" />
                </div>
                <div className='col-12 col-lg-5 py-5 d-flex flex-column justify-content-center' style={{ fontSize: '1.5rem' }}>
                    <h1 className='mb-4'>I tuoi dati personali</h1>
                    <p><b>Email</b>: {artist.email}</p>
                    <p><b>Indirizzo: </b>{artist.region}, {artist.city}, {artist.address}</p>
                    {artist.genre && (
                        <>
                            <p><b>I tuoi generi: </b>
                                {artist.genre.map((genre, i) => {
                                    const genToUp = genre.charAt(0).toUpperCase() + genre.slice(1);
                                    return (
                                        <>
                                            {i + 1 !== artist.genre.length && (
                                                <span>{genToUp}, </span>
                                            )}
                                            {i + 1 === artist.genre.length && (
                                                <span>{genToUp}</span>
                                            )}

                                        </>
                                    )
                                })}</p>
                        </>
                    )}
                    {artist.instruments && (
                        <>
                            <p><b>I tuoi strumenti: </b>

                                {artist.instruments.map((instrument, i) => {
                                    const insToUp = instrument.charAt(0).toUpperCase() + instrument.slice(1);
                                    return (
                                        <>
                                            {i + 1 !== artist.instruments.length && (
                                                <span>{insToUp}, </span>
                                            )}
                                            {i + 1 === artist.instruments.length && (
                                                <span>{insToUp}</span>
                                            )}

                                        </>
                                    )
                                })}</p>
                        </>
                    )}
                    <p><b>Descrizione</b>: {artist.description}</p>
                    {artist.instagram && (<a href={artist.instagram}><MDBIcon fab icon="instagram" /></a>)}
              {artist.facebook && (<a href={artist.facebook}><MDBIcon fab icon="facebook" /></a>)}
                </div>
            </Row>

            <MDBTabs fill className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'}>
                        <span style={{ fontSize: '1.3rem' }}>Candidature</span>
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
                        <span style={{ fontSize: '1.3rem' }}>Recensioni</span>
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>


            <MDBTabsContent>
                <MDBTabsPane show={fillActive === 'tab1'}>
                    <Container className='pt-3'>
                        <Row className='d-flex justify-content-center'>
                            {candidatures && (candidatures.map((candidature) => {
                                return (
                                    <>
                                        <Col className='d-flex justify-content-center'>
                                            <CandidatureCard event={candidature} />
                                        </Col>
                                    </>
                                )
                            }))}
                            {candidatures && candidatures.length < 1 && (
                                <Alert className='text-center' variant='danger'>Non hai ancora nessuna candidatura</Alert>
                            )}
                        </Row>
                    </Container>
                </MDBTabsPane>
                <MDBTabsPane show={fillActive === 'tab2'}>
                    <Container className='my-4'>
                        {artist.reviews && (
                            artist.reviews.map((review) => {
                                console.log(review)
                                return (

                                    <div style={{borderBottom: 'solid 1px', borderColor: 'grey'}} className='d-flex align-items-center offset-md-1 mb-4 pb-2'>
                                        <img
                                            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                                            src={review.authorLocal.proPic}
                                            className='mx-2' alt="" />
                                        <div>
                                            <Link to={`/singleLocalPage/${review.authorLocal._id}`}><h4><b>{review.authorLocal.name}</b></h4></Link>
                                            <div><i>"{review.comment}"</i></div>
                                            <div><b>{review.rate}/5</b></div>
                                        </div>
                                        <hr />
                                    </div>


                                )
                            })
                        )}
                        {artist.reviews && artist.reviews.length < 1 && (
                            <Alert className='text-center' variant='danger'>Non hai ancora nessuna recensione</Alert>

                        )}
                    </Container>

                </MDBTabsPane>
            </MDBTabsContent>



        </Container>
    )
}

export default ArtistDashboard
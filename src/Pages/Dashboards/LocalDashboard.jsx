import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useSession } from '../../Middlewares/ProtectedRoutes'
import { getLocalById } from '../../Store/localSlice';
import SingleEventLocalCard from '../SinglePages/SingleEventLocalCard';

const LocalDashboard = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const session = useSession()
    const local = useSelector(state => state.locals.loggedLocal)

    useEffect(() => {
        dispatch(getLocalById(id))
    }, [])

    const [fillActive, setFillActive] = useState('tab1');

    const handleFillClick = (value) => {
        if (value === fillActive) {
            return;
        }

        setFillActive(value);
    };

    return (
        <>
            {local && (
                <Container fluid className='py-5 m-3 d-flex row'>
                    <Row>
                        <h1 className='mx-5'>{local.name}</h1>
                        <div className='col-12 col-lg-7 d-flex flex-column'>
                            <img className='m-auto' style={{ width: '90%', borderRadius: '30px' }} src={local.proPic} alt="" />
                        </div>
                        <div className='col-12 col-lg-5 py-5' style={{ fontSize: '1.5rem' }}>
                            <h1 className='mb-4'>I tuoi dati personali</h1>
                            <p><b>Email</b>: {local.email}</p>
                            <p><b>Indirizzo: </b>{local.region} {local.city} {local.address}</p>
                            {local.favouriteGenre && (
                                <>
                                    <p><b>I tuoi generi: </b>
                                        {local.favouriteGenre.map((genre, i) => {
                                            const genToUp = genre.charAt(0).toUpperCase() + genre.slice(1);
                                            return (
                                                <>
                                                    {i + 1 !== local.favouriteGenre.length && (
                                                        <span>{genToUp}, </span>
                                                    )}
                                                    {i + 1 === local.favouriteGenre.length && (
                                                        <span>{genToUp}</span>
                                                    )}

                                                </>
                                            )
                                        })}</p>
                                </>
                            )}
                            {local.backline && (
                                <>
                                    <p><b>I tuoi strumenti: </b>

                                        {local.backline.map((instrument, i) => {
                                            const insToUp = instrument.charAt(0).toUpperCase() + instrument.slice(1);
                                            return (
                                                <>
                                                    {i + 1 !== local.backline.length && (
                                                        <span>{insToUp}, </span>
                                                    )}
                                                    {i + 1 === local.backline.length && (
                                                        <span>{insToUp}</span>
                                                    )}

                                                </>
                                            )
                                        })}</p>
                                </>
                            )}
                            <p><b>Descrizione</b>: {local.description}</p>
                            {local.instagram && (<a href={`https://` + local.instagram}><MDBIcon fab icon="instagram" /></a>)}
                            {local.facebook && (<a href={`https://` + local.facebook}><MDBIcon fab icon="facebook" /></a>)}
                        </div>
                    </Row>

                    <MDBTabs fill className='mb-3'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'}>
                                <span style={{ fontSize: '1.3rem' }}>I tuoi Eventi</span>
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
                                <Row>
                                    {local.events && (
                                        local.events.map((event) => {
                                            return (
                                                <>
                                                    <Col>
                                                        <SingleEventLocalCard event={event} />
                                                    </Col>
                                                </>
                                            )
                                        })
                                    )}
                                </Row>
                            </Container>
                        </MDBTabsPane>
                        <MDBTabsPane show={fillActive === 'tab2'}>
                            <Container className='my-4'>
                                {local.reviews && (
                                    local.reviews.map((review) => {

                                        return (

                                            <div style={{ borderBottom: 'solid 1px', borderColor: 'grey' }} className='d-flex align-items-center offset-md-1 mb-4 pb-2'>
                                                <img
                                                    style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                                                    src={review.authorArtist.proPic}
                                                    className='mx-2' alt="" />
                                                <div>
                                                    <Link to={`/singleArtistPage/${review.authorArtist._id}`}><h4><b>{review.authorArtist.name}</b></h4></Link>
                                                    <div><i>"{review.comment}"</i></div>
                                                    <div><b>{review.rate}/5</b></div>
                                                </div>
                                                <hr />
                                            </div>


                                        )
                                    })
                                )}

                            </Container>

                        </MDBTabsPane>
                    </MDBTabsContent>



                </Container>
            )}
        </>

    )
}

export default LocalDashboard
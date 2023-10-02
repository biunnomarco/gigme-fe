import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLocalById } from '../../Store/localSlice'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBIcon
} from 'mdb-react-ui-kit';
import SingleEventCard from './SingleEventCard'
import { Link } from 'react-router-dom'
import ReviewModal from '../../Components/Modals/ReviewModal'
import { useSession } from '../../Middlewares/ProtectedRoutes'

const SingleLocalPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const local = useSelector(state => state.locals.loggedLocal)
  const session = useSession()

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
      {local && local.name && (
        <Container fluid className='py-5 m-3 d-flex row'>
          <Row>
            <h1 className='text-center mb-5'>{local.name}</h1>
            <div className='col-12 col-lg-7 d-flex flex-column'>
              <img className='m-auto' style={{ width: '70%', borderRadius: '30px' }} src={local.proPic} alt="" />
            </div>
            <div className='col-12 col-lg-5 py-5' style={{ fontSize: '1.5rem' }}>
              <h1 className='mb-4'>Info</h1>
              <p><b>Email</b>: {local.email}</p>
              <p><b>Indirizzo: </b>{local.region}, {local.city}, {local.address}</p>
              {local.favouriteGenre && (
                <>
                  <p><b>Generi preferiti: </b>
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
                  <p><b>Backline: </b>

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
                <span style={{ fontSize: '1.3rem' }}>Eventi</span>
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
                  {local.events && (local.events.map((event) => {
                    return (
                      <>
                        <Col>
                          <SingleEventCard event={event} />
                        </Col>
                      </>
                    )
                  }))}
                  {local.events.length === 0 && (
                    <Alert
                      className='my-4'
                      style={{ width: '70%', margin: 'auto', textAlign: 'center' }}
                      variant='danger'>Questo locale non ha ancora pubblicato nessun evento
                    </Alert>)}
                </Row>
              </Container>
            </MDBTabsPane>
            <MDBTabsPane show={fillActive === 'tab2'}>
              <Container className='my-4'>
                <div className='text-center my-3'><ReviewModal role={session.role} author={session.id} dest={id} /></div>
                <div className='d-flex flex-column-reverse'>
                  {local.reviews && (
                    local.reviews.map((review) => {
                      console.log(review)
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
                </div>

              </Container>
            </MDBTabsPane>
          </MDBTabsContent>

        </Container>
      )}
    </>

  )
}

export default SingleLocalPage
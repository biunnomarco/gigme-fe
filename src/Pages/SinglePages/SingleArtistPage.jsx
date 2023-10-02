import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getArtistById } from '../../Store/artistSlice'
import { useSession } from '../../Middlewares/ProtectedRoutes'
import { Alert, Container, Row } from 'react-bootstrap'
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBIcon
} from 'mdb-react-ui-kit';
import ReviewModal from '../../Components/Modals/ReviewModal';
import { Link } from 'react-router-dom'

const SingleArtistPage = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const artist = useSelector(state => state.artists.artistById)
  const session = useSession()

  const [fillActive, setFillActive] = useState('tab1');

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };


  useEffect(() => {
    dispatch(getArtistById(id))
  }, [])

  return (
    <div>
      {artist && (
        <Container fluid className='py-5 m-3 d-flex row' >
          <Row className='mb-4'>
            <h1 className='text-center mb-5'>{artist.name}</h1>
            <div className='col-12 col-lg-7 d-flex flex-column justify-content-center'>
              <img className='m-auto' style={{ width: '65%', borderRadius: '30px' }} src={artist.proPic} alt="" />
            </div>
            <div className='col-12 col-lg-5 py-5 d-flex flex-column justify-content-center' style={{ fontSize: '1.5rem' }}>
              <h1 className='mb-4'>Info</h1>
              <p><b>Email</b>: {artist.email}</p>
              <p><b>Indirizzo: </b>{artist.region}, {artist.city}, {artist.address}</p>
              {artist.genre && (
                <>
                  <p><b>Generi preferiti: </b>
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
                  <p><b>Backline: </b>

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
              <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
                <span style={{ fontSize: '1.3rem' }}>Recensioni</span>
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>


          <MDBTabsContent>
            <MDBTabsPane show={fillActive === 'tab1'}>
              <Container className='my-4'>
              <div className='text-center my-3'><ReviewModal role={session.role} author={session.id} dest={id} /></div>
                <Row className='flex-column-reverse'>
                  {artist.reviews && artist.reviews.length < 1 && (
                    <Alert className='text-center' variant='danger'>Ancora nessuna recensione per questo artista</Alert>
                  )}
                  {artist.reviews && artist.reviews.length > 0 && (
                    artist.reviews.map((review)=> {
                      return (
                        <div style={{ borderBottom: 'solid 1px', borderColor: 'grey', width: '90%' }} className='d-flex align-items-center offset-md-1 mb-4 pb-2'>
                          <img
                            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                            src={review.authorLocal.proPic}
                            className='mx-2' alt="" />
                          <div>
                            <Link to={`/singleArtistPage/${review.authorLocal._id}`}><h4><b>{review.authorLocal.name}</b></h4></Link>
                            <div><i>"{review.comment}"</i></div>
                            <div><b>{review.rate}/5</b></div>
                          </div>
                          
                        </div>
                      )
                    })
                  )}
                </Row>
              </Container>
            </MDBTabsPane>
          </MDBTabsContent>

        </Container>
      )}
    </div>
  )
}

export default SingleArtistPage
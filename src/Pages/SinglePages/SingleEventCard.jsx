import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useSession } from '../../Middlewares/ProtectedRoutes';
import { Link } from 'react-router-dom';
import './SingleArtist.css'

const SingleEventCard = (event) => {
    const session = useSession()

    const [isCandidate, setIsCandidate] = useState(false)
    event = event.event
    
    useEffect(() => {
        if (event.candidates) {
            event.candidates.map((candidate) => {
                if (candidate.artist === session.id) { setIsCandidate(true) }
            })
        }
    })


    return (
        <Card style={{ width: '15rem'}}>
            <Card.Img variant="top" src={event.location.proPic} />
            <Card.Body>
                <Card.Title> <b>{event.location.name}</b> </Card.Title>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text className='ellipsis'>{event.description}</Card.Text>
            </Card.Body>
            <Card.Footer className='mb-4'>
                <Row>
                    <Col><em>For: <b>{event.requiredArtist}</b></em></Col>
                    <Col><em><MDBIcon far icon="clock" /> {event.duration}</em></Col>
                </Row>
                <div className='d-flex justify-content-around align-items-center'>
                    <Button className='mt-1' as={Link} to={`/eventPage/${event._id}`} variant="primary">Dettagli</Button>
                    {isCandidate && (<>
                        <MDBIcon color='danger' fas icon="heart" />
                    </>)}
                </div>
            </Card.Footer>

        </Card>
    )
}

export default SingleEventCard
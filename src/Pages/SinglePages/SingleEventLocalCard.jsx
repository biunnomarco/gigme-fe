import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useSession } from '../../Middlewares/ProtectedRoutes';
import { Link } from 'react-router-dom';
import './SingleArtist.css'


const SingleEventLocalCard = (event) => {
    const session = useSession()

    event = event.event
    


    return (
        <Card style={{ width: '15rem'}}>
            <Card.Body>
                <Card.Title> <b>{event.name}</b> </Card.Title>
                <Card.Text className='ellipsis'>{event.description}</Card.Text>
            </Card.Body>
            <Card.Footer className='mb-4'>
                <Row>
                    <Col><em>For: <b>{event.requiredArtist}</b></em></Col>
                    <Col><em><MDBIcon far icon="clock" /> {event.duration}</em></Col>
                </Row>
                <div className='d-flex justify-content-around align-items-center'>
                    <Button className='mt-1' as={Link} to={`/eventPage/${event._id}`} variant="primary">Dettagli</Button>
                    {event.candidates && (<div className='d-flex gap-2 align-items-center'><MDBIcon fas icon="user-friends" /><span>{event.candidates.length}</span></div>)}
                </div>
            </Card.Footer>

        </Card>
    )
}

export default SingleEventLocalCard
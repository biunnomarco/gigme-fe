import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { MDBIcon } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'

const CandidatureCard = (event) => {
    event = event.event
  return (
    <Card style={{ width: '18rem'}}>
    <Card.Img variant="top" src={event.local.proPic} />
    <Card.Body>
        <Card.Title> <b>{event.local.name}</b> </Card.Title>
        <Card.Title>{event.event.name}</Card.Title>
        <Card.Text className='ellipsis'>{event.event.description}</Card.Text>
    </Card.Body>
    <Card.Footer className='mb-4'>
        <Row>
            <Col><em>For: <b>{event.event.requiredArtist}</b></em></Col>
            <Col><em><MDBIcon far icon="clock" /> {event.event.duration}</em></Col>
        </Row>
        <div className='d-flex justify-content-around align-items-center'>
            <Button className='mt-1' as={Link} to={`/eventPage/${event.event._id}`} variant="primary">Dettagli</Button>
        </div>
    </Card.Footer>

</Card>
  )
}

export default CandidatureCard
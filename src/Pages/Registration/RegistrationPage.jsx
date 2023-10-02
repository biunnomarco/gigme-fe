import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import jam from '../../assets/jamsession.png'
import { MDBBtn } from 'mdb-react-ui-kit'
import RegisterModal from '../../Components/Modals/RegisterModal'

const RegistrationPage = () => {
    return (
        <Container style={{minHeight: '800px'}} className='row m-0 flex-wrap' fluid>
           

            <div className='col-lg-5 d-flex flex-column justify-content-center align-items-center my-4 ps-5' >
                <h1 className="my-4 display-4 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 85%)', textAlign: 'center' }}>
                    <span>Sei un <span style={{ color: 'hsl(218, 81%, 60%)' }}>musicista</span> e cerchi un posto dove esibirti? <br /></span>
                </h1>
                <br />
                <h1 className="my-3 display-4 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 85%)', textAlign: 'center' }}>
                    <span className='text-end' style={{ color: 'hsl(218, 81%, 85%)' }}>
                        Gestisci un <span style={{ color: 'hsl(218, 81%, 60%)' }}>locale</span> e hai bisogno di musicisti per le tue serate? </span>
                </h1>
                <br />
                
                <RegisterModal />
            </div>
            <div className='col-lg-7 d-flex justify-content-center pe-4'
                style={{ backgroundImage: `url(${jam})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', minHeight: '400px' }}>
            </div>
        </Container>
    )
}

export default RegistrationPage
import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { MDBRadio } from 'mdb-react-ui-kit';

const ArtistRegistrationForm = () => {

    const [type, setType] = useState('')
    const [members, setMembers] = useState(1)


    return (
        <Container className='d-flex flex-column align-items-center mt-5 bg-warning'>
            <div>ArtistRegistrationForm</div>
            <div>
                <MDBRadio onClick={() => setType('single')} name='typeRadio' id='inlineRadio1' value='option1' label='Sono un artista' inline />
                <MDBRadio onClick={() => setType('band')} name='typeRadio' id='inlineRadio2' value='option2' label='Siamo un gruppo' inline />
            </div>
            {(type === "band" &&
                <>
                    <MDBRadio onClick={() => setMembers(1)} name='members' id='inlineRadio2' value='option2' label='1' />
                    <MDBRadio onClick={() => setMembers(2)} name='members' id='inlineRadio2' value='option2' label='2' />
                    <MDBRadio onClick={() => setMembers(3)} name='members' id='inlineRadio2' value='option2' label='3' />
                    <MDBRadio onClick={() => setMembers(4)} name='members' id='inlineRadio2' value='option2' label='4' />
                    <MDBRadio onClick={() => setMembers(5)} name='members' id='inlineRadio2' value='option2' label='5' />
                </>
            )}
            <Form>

            </Form>
        </Container>
    )
}

export default ArtistRegistrationForm
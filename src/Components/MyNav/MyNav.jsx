import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import ArtistSearchOffCanvas from '../SearchOffCanvas/ArtistSearchOffCanvas'
import LocalSearchOffCanvas from '../SearchOffCanvas/LocalSearchOffCanvas'
import { useSession } from '../../Middlewares/ProtectedRoutes';
import logo from '../../assets/logo2.png'
import '../../ColorsCss.css'

const MyNav = () => {

  const session = useSession()
  const [role, setRole] = useState(null)

  useEffect(() => {
    if (session) {
      if (session.role === 'Artist') setRole('artist')
      if (session.role === 'Local') setRole('local')
    }
  })

  function logOut() {
    localStorage.removeItem('userLoggedIn')
    window.location.reload();
  }

  return (
    <Navbar style={{ backgroundColor: 'white' }} sticky='top'>
      <Container fluid>


        <Navbar.Brand as={Link} to={'/redirect'} href="#home"><img className='ps-4' style={{ width: '80px' }} src={logo} alt="" /> <h2 className='pt-2 text-darkblue'> <b>ig me</b> </h2> </Navbar.Brand>

        <Form className="d-flex  d-flex align-items-center">
          {session && (session.role === 'Artist' ? <ArtistSearchOffCanvas /> : <LocalSearchOffCanvas />)}
          {!localStorage.getItem('userLoggedIn') ?
            <Link to={`/login`}><Button size='sm' variant='primary' role="button">Log In</Button></Link> :
            <>
              <NavDropdown
                drop='start'
                title={<img style={{ width: '50px', height: '50px', borderRadius: '50px', border: 'solid 3px green' }} src={session.proPic } />}
                id="navbarScrollingDropdown"
                className='mx-2'>
                <NavDropdown.Item as={Link} to={`/${role}Dashboard/${session.id}`}>Your Dashboard</NavDropdown.Item>
                <NavDropdown.Item onClick={() => logOut()}>Log Out</NavDropdown.Item>
              </NavDropdown>


            </>
          }

        </Form>

      </Container>
    </Navbar>
  )
}

export default MyNav




import React, { useEffect, useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { Link, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../Store/loginSlice';
import { useNavigate } from 'react-router-dom';
import useSession from '../Middlewares/ProtectedRoutes'
import logo from '../assets/logo2.png'
import logInPic from '../assets/login.png'
import { Alert } from 'react-bootstrap';

const Login = () => {

  const dispatch = useDispatch()
  const session = useSession()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useSelector(state => state.login.res)


  useEffect(() => {
    if (login) {
      if (login.statusCode && login.statusCode === 404) { }
      else if (login.statusCode && login.statusCode === 400) { }
      else if (login.statusCode && login.statusCode === 200) navigate('/redirect')
    }
  }, [login])


  const sendLogin = () => {
    const loginPayload = {
      email: email,
      password: password,
    }


    dispatch(logIn(loginPayload))
    console.log(loginPayload)
  }

  return (
    <div className='d-flex align-items-center bg-primary'>
      <MDBContainer className="my-5">

        <MDBCard>
          <MDBRow className='g-0' >

            <MDBCol className='d-flex align-items-center justify-content-center ' md='6'>
              <MDBCardImage style={{ objectFit: 'cover' }} src={logInPic} alt="login form" className='rounded-start w-100' />
            </MDBCol>

            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column' >

                <div className='d-flex flex-row mt-2 justify-content-center'>
                  {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/> */}
                  {/* <span className="h1 fw-bold mb-0">GIG ME</span> */}
                  <img style={{ width: '100px' }} src={logo} alt="" />
                </div>

                <h4 className="fw-normal my-4 pb-3 text-center" style={{ letterSpacing: '1px', color: 'orange' }}>bentornato!!</h4>

                <MDBInput
                  wrapperClass='mb-4' label='Email address' type='email' size="lg"
                  onChange={(e) => { setEmail(e.target.value); }}
                />
                <MDBInput
                  wrapperClass='mb-4' label='Password' type='password' size="lg"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBBtn
                  className="mb-4 px-5" color='primary' size='lg'
                  onClick={() => sendLogin()}
                >
                  Login </MDBBtn>
                {login && login.statusCode === 404 && (
                  <Alert variant='danger'>E-mail o password errate</Alert>
                )}
                {login && login.statusCode === 400 && (
                  <Alert variant='danger'>E-mail o password errate</Alert>
                )}
                <a className="small text-muted" href="#!">Forgot password?</a>
                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to={'/'} href="#!" style={{ color: '#393f81' }}>Register here</Link></p>

                <div className='d-flex flex-row justify-content-start'>
                  <a href="#!" className="small text-muted me-1">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </div>

              </MDBCardBody>
            </MDBCol>

          </MDBRow>
        </MDBCard>

      </MDBContainer>
    </div>
  )
}

export default Login
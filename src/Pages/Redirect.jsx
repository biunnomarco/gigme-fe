import React, { useEffect } from 'react'
import { useSession } from '../Middlewares/ProtectedRoutes'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
    const session = useSession()
    const navigate = useNavigate()

    useEffect(()=> {
        /* window.location.reload() */
        if (session) {
            if (session.role==='Artist') navigate('/artistHomepage')
            if (session.role==='Local') navigate('/localHomepage')
        } else navigate('/login')
    }, [])
  return (
    <>
    <div>Redirect</div>
    
    </>
  )
}

export default Redirect
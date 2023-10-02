import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ValidationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    console.log(id);
/* 
    async function validator() {
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/artist/${id}/validate`, {
            method: 'PATCH',
            headers: {}
        })
    } */
    async function validator() {
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/local/${id}/validate`, {
            method: 'PATCH',
            headers: {}
        })
    }
    useEffect(() => {
        validator()
    }, [])

    setTimeout(()=> {
        navigate('/redirect')
    }, 5000)

    return (
        <>
            <div className='my-5 text-center'>
                La tua mail è stata confermata, verrai reindirizzato a breve
            </div>
        </>
    )
}

export default ValidationPage
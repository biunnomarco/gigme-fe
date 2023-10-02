import React from 'react'
import '../CandidatureBanner/CandidatureBanner.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CandidatureBanner = ({ candidature }) => {
  const date = new Date(candidature.event.date)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return (
    <div className='box px-2'>
      <div className='ms-1'>
        <b>{day + "/" + month}</b>
      </div>
      <div>
        <b>{candidature.event.name}</b>
      </div>
      <Button as={Link} to={`/eventPage/${candidature.event._id}`}>Vai</Button>
    </div>
  )
}

export default CandidatureBanner
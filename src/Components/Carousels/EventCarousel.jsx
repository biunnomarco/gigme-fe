import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Carousel.css'
import UseWindowSize from '../../Hooks/UseWindowSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import '../../ColorsCss.css'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { MDBIcon } from 'mdb-react-ui-kit';
import { useSession } from '../../Middlewares/ProtectedRoutes';
import SingleEventModal from '../Modals/SingleEventModal'

function EventCarousel(events) {
    const session = useSession()
    let slidePerItem = 3
    const { width, heigth } = UseWindowSize()
    const [isCandidate, setIsCandidate] = useState(false)
    const [candidatureId, setCandidatureId] = useState('')
    console.log(width)
    events = events.events

    useEffect(() => {
        if (events && events.candidates) {
            const candidate = events.candidates.find(candidate => candidate.artist === session.id);
            if (candidate) {
                setIsCandidate(true);
                setCandidatureId(candidate._id);
                
            } else {
                setIsCandidate(false);
                setCandidatureId(null);
            }
        } else {
            setIsCandidate(false);
            setCandidatureId(null);
        }
    }, [events, session.id]);

    useEffect(() => {
        if (width <= 947) slidePerItem = 1

    }, [width])
    return (

        <div style={{width: '100%'}} className='container'>
            <h1 className='heading text-darkblue'>Galleria Eventi</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={slidePerItem}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className='swiper_container'
            >
                {events && events.map((event) => {

                    return (
                        <SwiperSlide className='flex-column justify-content-start'>
                            <h5 className='text-center'>{event.name}</h5>
                            <b style={{ minWidth: '300px', height: '300px', position: 'relative' }} className=' hover-overlay'>
                                <img style={{ minWidth: '300px', height: '300px' }} src={event.location.proPic} alt="" className='img-fluid' />
                                <div className='mask overlay img-fluid pt-3' style={{ position: 'absolute', backgroundColor: 'rgba(220, 220, 220, 0.9)', minWidth: '300px', height: '300px', borderRadius: '25px' }}>
                                    <div className='text-center text-darkblue' >
                                        <p style={{ fontSize: '1.4rem' }}>{event.name}</p>
                                        <p style={{ fontSize: '1.3rem' }}>{event.location.name}</p>
                                        <p className='ellipsis'>{event.description}</p>
                                        <p className='d-flex gap-3 justify-content-center'>
                                            <em>For: <b>{event.requiredArtist}</b></em>
                                            <em><MDBIcon far icon="clock" /> {event.duration}</em>
                                        </p>
                                        {/* <Button className='mt-1' as={Link} to={`/eventPage/${event._id}`} variant="primary">Dettagli</Button> */}
                                        <SingleEventModal event={event} />
                                    </div>
                                </div>
                            </b>
                            
                        </SwiperSlide>
                    )
                })}

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <MDBIcon fas icon="angle-left" />
                    </div>

                    <div className="swiper-button-next slider-arrow">
                        <MDBIcon fas icon="angle-right" />
                    </div>

                </div>
            </Swiper>
        </div>

    );
}

export default EventCarousel;
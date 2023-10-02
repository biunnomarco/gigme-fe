import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './SingleArtist.css'

function SingleLocalCard(local) {
    local = local.local

    return (
        <Card style={{
            backgroundColor: '',
            color: '',
            width: '20rem',
            height: '33rem',
            boxShadow: '10px 8px 42px -5px rgba(87,57,57,0.75)',
            WebkitBoxShadow: '10px 8px 42px -5px rgba(87,57,57,0.75)',
            MozBoxShadow: '10px 8px 42px -5px rgba(87,57,57,0.75)'
        }}
            className='singleArtistCard'
        >
            <Card.Img style={{ width: '100%', height: '40%', objectFit: 'cover' }} variant="top" src={local.proPic} />
            <Card.Body>
                <Card.Title style={{ fontSize: '1.5rem' }}> <b>{local.name}</b> </Card.Title>
                <Card.Text>

                    {local.localType.length > 0 && (
                        <>

                            {local.localType.map((genre, i) => {
                                const genToUp = genre.charAt(0).toUpperCase() + genre.slice(1);
                                return (
                                    <>
                                        {i + 1 !== local.localType.length && (
                                            <span>{genToUp}, </span>
                                        )}
                                        {i + 1 === local.localType.length && (
                                            <span>{genToUp}</span>
                                        )}

                                    </>
                                )
                            })}
                        </>
                    )}
                    <br />
                    {local.favouriteGenre.length > 0 && (
                        <>
                            <span><b>Genre: </b></span>
                            {local.favouriteGenre.map((genre, i) => {
                                const genToUp = genre.charAt(0).toUpperCase() + genre.slice(1);
                                return (
                                    <>
                                        {i + 1 !== local.favouriteGenre.length && (
                                            <span>{genToUp}, </span>
                                        )}
                                        {i + 1 === local.favouriteGenre.length && (
                                            <span>{genToUp}</span>
                                        )}

                                    </>
                                )
                            })}
                        </>
                    )}


                    <br />
                    {local.backline.length > 0 && (
                        <>
                            <span><b>Backline: </b></span>

                            {local.backline.map((instrument, i) => {
                                const insToUp = instrument.charAt(0).toUpperCase() + instrument.slice(1);
                                return (
                                    <>
                                        {i + 1 !== local.backline.length && (
                                            <span>{insToUp}, </span>
                                        )}
                                        {i + 1 === local.backline.length && (
                                            <span>{insToUp}</span>
                                        )}

                                    </>
                                )
                            })}

                        </>
                    )}


                </Card.Text>
                <Card.Text style={{ fontSize: '0.8rem' }}>
                    <em>
                        <div>{local.region}</div>
                        <div>{local.city}</div>
                        <div>{local.address}</div>
                    </em>
                </Card.Text>
                <Button
                    style={{ position: 'absolute', bottom: '15px', right: '25px'}}
                    as={Link}
                    to={`/singleLocalPage/${local._id}`}
                >
                    Dettagli
                </Button>

            </Card.Body>
        </Card>
    );
}

export default SingleLocalCard;
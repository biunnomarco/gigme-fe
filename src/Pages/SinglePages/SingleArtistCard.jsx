import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './SingleArtist.css'

function SingleArtistCard(artist) {
    artist = artist.artist

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
            <Card.Img style={{ width: '100%', height: '40%', objectFit: 'cover' }} variant="top" src={artist.proPic} />
            <Card.Body>
                <Card.Title style={{ fontSize: '1.5rem' }}> <b>{artist.name}</b> </Card.Title>
                <Card.Text>
                    {artist.members === '' && ('')}
                    {artist.members === '1' && (<span><b>Solo</b></span>)}
                    {artist.members > '1' && (<span><b>Band:</b> {artist.members} components</span>)}
                    <br />
                    {artist.genre.length > 0 && (
                        <>
                            <span><b>Genre: </b></span>
                            {artist.genre.map((genre, i) => {
                                const genToUp = genre.charAt(0).toUpperCase() + genre.slice(1);
                                return (
                                    <>
                                        {i + 1 !== artist.genre.length && (
                                            <span>{genToUp}, </span>
                                        )}
                                        {i + 1 === artist.genre.length && (
                                            <span>{genToUp}</span>
                                        )}

                                    </>
                                )
                            })}
                        </>
                    )}


                    <br />
                    {artist.instruments.length > 0 && (
                        <>
                            <span><b>Instruments: </b></span>

                            {artist.instruments.map((instrument, i) => {
                                const insToUp = instrument.charAt(0).toUpperCase() + instrument.slice(1);
                                return (
                                    <>
                                        {i + 1 !== artist.instruments.length && (
                                            <span>{insToUp}, </span>
                                        )}
                                        {i + 1 === artist.instruments.length && (
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
                        <div>{artist.region}</div>
                        <div>{artist.city}</div>
                        <div>{artist.address}</div>
                    </em>
                </Card.Text>
                <Button
                    style={{ position: 'absolute', bottom: '15px', right: '25px', backgroundColor: '#FFD8E4', color: '#31111D' }}
                    as={Link}
                    to={`/singleArtistPage/${artist._id}`}
                >
                    Details
                </Button>

            </Card.Body>
        </Card>
    );
}

export default SingleArtistCard;
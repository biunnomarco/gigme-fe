import React, { useState } from 'react'
import { MDBRadio } from 'mdb-react-ui-kit';
import { FindCoordinates } from '../../Hooks/FindCoordinates';
import { nanoid } from 'nanoid';
import JoditEditor from 'jodit-react';
import { useDispatch } from 'react-redux';
import { type } from '@testing-library/user-event/dist/type';
import { postLocal } from '../../Store/localSlice';

const LocalRegistrationPage = () => {

    const dispatch = useDispatch()

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    //!SET GENRE
    const [localType, setLocalType] = useState([]);
    const handleAddType = () => {
        const type = [...localType, '']
        setLocalType(type)
    }
    const handleChangeType = (e, i) => {
        const inputdata = localType
        inputdata[i] = e.target.value;
        setLocalType(inputdata)
    }
    const handleRemoveType = (i) => {
        const delType = [...localType]
        delType.splice(i, 1)
        setGenre(delType)
    }
    //!SET GENRE
    const [genre, setGenre] = useState([]);
    const handleAddGenre = () => {
        const gen = [...genre, '']
        setGenre(gen)
    }
    const handleChangeGenre = (e, i) => {
        const inputdata = genre
        inputdata[i] = e.target.value;
        setGenre(inputdata)
    }
    const handleRemoveGenre = (i) => {
        const delGen = [...genre]
        delGen.splice(i, 1)
        setGenre(delGen)
    }
    //!SET GENRE
    const [backline, setBackline] = useState([]);
    const handleAddBackline = () => {
        const back = [...backline, '']
        setBackline(back)
    }
    const handleChangeBackline = (e, i) => {
        const inputdata = backline
        inputdata[i] = e.target.value;
        setBackline(inputdata)
    }
    const handleRemoveBackline = (i) => {
        const delBack = [...backline]
        delBack.splice(i, 1)
        setBackline(delBack)
    }


    const sendRegister = async () => {

        if (secondPassword === password) {
            const coordinates = await FindCoordinates(`${region} ${city} ${address}`)

            const registerForm = {
                email: mail,
                password: password,
                name: name,
                backline: backline,
                favouriteGenre: genre,
                region: region,
                city: city,
                address: address,
                localType: localType,
                lat: coordinates.lat,
                lon: coordinates.lon,
                description: description,
            }

            console.log(registerForm)
            dispatch(postLocal(registerForm))
            
        } else console.log("psw diverse")
    }

    return (
        <>
            <div>LocalRegistrationPage</div>
            <hr />

            <div className="mb-3">
                <label>Email</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Email"
                    onChange={(e) => setMail(e.target.value)}

                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}

                />
            </div>
            <div className="mb-3">
                <label>Repete Password</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Password"
                    onChange={(e) => setSecondPassword(e.target.value)}

                />
            </div>

            <div className="mb-3">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Solo or Band name"
                    onChange={(e) => setName(e.target.value)}

                />
            </div>
            <div className='bg-primary'>
                <div>Whera are you located?</div>
                <div className="mb-3">
                    <label>Region</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Region"
                        onChange={(e) => setRegion(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    <label>City</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Region"
                        onChange={(e) => setCity(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Region"
                        onChange={(e) => setAddress(e.target.value)}

                    />
                </div>
            </div>
        <hr />
            <div className='my-2'>
                <p>What kind of music do you usually play?</p>
                <button onClick={() => handleAddGenre()}>Add a Genre</button>
                {genre.map((data, i) => {
                    return (
                        <div key={nanoid()}>

                            <input
                                type="text"
                                placeholder={data}
                                onChange={(e) => handleChangeGenre(e, i)}
                            />
                            <button onClick={() => handleRemoveGenre(i)}>x</button>
                        </div>
                    )
                })}
            </div>
            <hr />
            <div  className='my-2'>
                <p>What kind of local do you have?</p>
                <p>You can choose more than one type Es. Pub, Restourant, Bar ecc</p>
                <button onClick={() => handleAddType()}>Add a Type</button>
                {localType.map((data, i) => {
                    return (
                        <div key={nanoid()}>

                            <input
                                type="text"
                                placeholder={data}
                                onChange={(e) => handleChangeType(e, i)}
                            />
                            <button onClick={() => handleRemoveType(i)}>x</button>
                        </div>
                    )
                })}
            </div>
            <hr />
            <div  className='my-2'>
                <p>What backline do you have?</p>
                <button onClick={() => handleAddBackline()}>Add an Instrument</button>
                {backline.map((data, i) => {
                    return (
                        <div key={nanoid()}>

                            <input
                                type="text"
                                placeholder={data}
                                onChange={(e) => handleChangeBackline(e, i)}
                            />
                            <button onClick={() => handleRemoveBackline(i)}>x</button>
                        </div>
                    )
                })}
            </div>
            <hr />
            <div className="mb-3">
                <label>Add a description</label>
                <JoditEditor
                    tabIndex={1}
                    onBlur={newDescription => setDescription(newDescription)}
                    onChange={newDescription => { }}
                />
            </div>

            <div className="d-grid mb-4">
                <button onClick={() => sendRegister()} className="btn btn-success">
                    Register
                </button>
            </div>



        </>
  )
}

export default LocalRegistrationPage
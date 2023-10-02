import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/artist`

const initialState = {
    artists: [],
    allGeners: [],
    artistById: [],
    status: 'idle'
}

const artistSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postArtist.fulfilled, (state, action) => {
                console.log('ok')
            })
            .addCase(getArtist.fulfilled, (state, action) => {
                state.artists = action.payload
            })
            .addCase(getAllArtist.fulfilled, (state, action) => {
                state.artists = action.payload
            })
            .addCase(getArtistById.fulfilled, (state, action) => {
                state.artistById = action.payload
            })
            .addCase(getAllGenres.fulfilled, (state, action) => {
                state.allGeners = action.payload
            })

    }
})

export default artistSlice.reducer;

export const postArtist = createAsyncThunk('artist/post', async (postPayload) => {

     const data = new FormData()
     data.append('email', postPayload.email)
     data.append('password', postPayload.password)
     data.append('members', postPayload.members)
     data.append('name', postPayload.name)
     data.append('genre', postPayload.genre)
     data.append('region', postPayload.region)
     data.append('city', postPayload.city)
     data.append('address', postPayload.address)
     data.append('instruments', postPayload.instruments)
     data.append('lat', postPayload.lat)
     data.append('lon', postPayload.lon)
     data.append('description', postPayload.description)
     data.append('proPic', postPayload.proPic)
     data.append('instagram', postPayload.instagram)
     data.append('facebook', postPayload.facebook)

    console.log(postPayload)


    const postRes = await fetch(`${endpoint}/register`, {
        method: "POST",
        body: data,
        /* headers: {
            'Content-Type': 'application/json'
        } */
    });
    const res = await postRes.json()
})

//!CHANGE PROPIC
export const changeProPic = createAsyncThunk('artist/patch/proPic', async (patchData) => {
    console.log(patchData)
    const form = new FormData()
    form.append('proPic', patchData.proPic)

    const res = await fetch(`${endpoint}/changeProPic/${patchData.id}`,
        {
            method: 'PATCH',
            body: form,
            headers: {}
        })
    const data = await res.json()
})

//!GET WITH FILTERS
export const getArtist = createAsyncThunk('artist/get/filter', async (url) => {
    try {
        const data = await fetch(`${endpoint}/filter?${url}`)
        const res = await data.json()
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
})

//!GET ALL
export const getAllArtist = createAsyncThunk('artist/get', async (url) => {
    try {
        const data = await fetch(`${endpoint}/all`)
        const res = await data.json()
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
})

//! GET BY ID
export const getArtistById = createAsyncThunk('artist/get/id', async (id) => {
    try {
        const data = await fetch(`${endpoint}/byId/${id}`)
        const res = await data.json()
        return res
    } catch (error) {
        console.log(error)
    }
})

//!GET ALL GENRES 
export const getAllGenres = createAsyncThunk('artist/get/genres', async ()=> {
    try {
        const data = await fetch(`${endpoint}/allGenres`)
        const res = await data.json()
        return res
    } catch (error) {
        console.log(error)
    }
})
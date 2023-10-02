import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Form } from "react-router-dom";

const endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/local`;

const initialState = {
    locals: [],
    loggedLocal: null,
    status: 'idle',
}

const localSlice = createSlice({
    name: 'locals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postLocal.fulfilled, (state, action) => {
                state.status = 'idle'
            })
            .addCase(postLocal.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(postLocal.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(getLocal.fulfilled, (state, action) => {
                state.locals = action.payload
                state.status = 'idle'
            })
            .addCase(getLocal.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getLocalById.fulfilled, (state, action) => {
                state.loggedLocal = action.payload
                state.status = 'idle'
            })
            .addCase(getLocalById.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getAllLocal.fulfilled, (state, action) => {
                state.locals = action.payload
                state.status = 'idle'
            })
            .addCase(getAllLocal.pending, (state, action) => {
                state.status = 'pending'
            })
    }
})

export default localSlice.reducer

export const postLocal = createAsyncThunk('local/post', async (postPayload) => {
    console.log(postPayload)
    const favouriteGenre = postPayload.favouriteGenre
    const backline = postPayload.backline
    const localType = postPayload.localType

    const data = new FormData()
    data.append('email', postPayload.email)
    data.append('password', postPayload.password)
    data.append('name', postPayload.name)
    for (let i = 0; i < favouriteGenre.length; i++) {
        data.append('favouriteGenre', favouriteGenre[i])
    }
    data.append('region', postPayload.region)
    data.append('city', postPayload.city)
    for (let i = 0; i < localType.length; i++) {
        data.append('localType', localType[i])
        
    }
    data.append('address', postPayload.address)
    for (let i = 0; i < backline.length; i++) {
        data.append('backline', backline[i]) 
    }
    data.append('lat', postPayload.lat)
    data.append('lon', postPayload.lon)
    data.append('description', postPayload.description)
    data.append('proPic', postPayload.proPic)
    data.append('instagram', postPayload.instagram)
    data.append('facebook', postPayload.facebook)



    const postRes = await fetch(`${endpoint}/register`, {
        method: "POST",
        body: data,
        /* headers: {
            'Content-Type': 'application/json'
        } */
    })
    const res = await postRes.json()
})

//!CHANGE PROPIC
export const changeLocalProPic = createAsyncThunk('local/patch/proPic', async (patchData) => {
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

//! GET BY ID
export const getLocalById = createAsyncThunk('local/get/id', async(id) => {
    try {
        const data = await fetch(`${endpoint}/byId/${id}`)
        const res = await data.json()
        return res
    } catch (error) {
        console.log(error)
    }
    
})

//!GET WITH FILTERS
export const getLocal = createAsyncThunk('local/get/filter', async (url) => {
    try {
        const data = await fetch(`${endpoint}/filter?${url}`)
        const res = await data.json()
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
})

//! GET ALL LOCALS
export const getAllLocal = createAsyncThunk('local/get', async () => {
    try {
        const data = await fetch(`${endpoint}/all`)
        const res = await data.json()
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
})
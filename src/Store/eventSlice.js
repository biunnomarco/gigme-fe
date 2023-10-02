import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify";

const endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/event`;

const initialState = {
    events: [],
    eventById: [],
    status: 'idle',
    candidatures: [],
    refresh: false,
}

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        refresh(state, action) {
            state.refresh = !state.refresh
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.fulfilled, (state, action) => {
                state.events = action.payload
                state.status = 'idle'
            })
            .addCase(getAllEvents.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getEventById.fulfilled, (state, action) => {
                state.eventById = action.payload
                state.status = 'idle'
            })
            .addCase(getEventById.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(allArtistCandidatures.fulfilled, (state, action) =>{
                state.candidatures = action.payload
            })
            .addCase(allArtistCandidatures.pending, (state, action) =>{
                state.status = 'pending'
            })
    }
})

export default eventSlice.reducer;
export const {refresh} = eventSlice.actions

export const getAllEvents = createAsyncThunk('event/get/all', async () => {
    try {
        const data = await fetch(`${endpoint}/allEvents`)
        const res = await data.json()
        return res
    } catch (error) {
        console.log(error)
    }
})

export const postEvent = createAsyncThunk('event/post', async (postPayload) => {
    try {
        const postRes = await fetch(`${endpoint}/newEvent`, {
            method: "POST",
            body: JSON.stringify(postPayload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await postRes.json()
    } catch (error) {
        console.log(error)
    }
})


export const candidateToEvent = createAsyncThunk('event/candidate', async(data) =>{
    console.log(data)
    try {
        const postRes = await fetch(`${endpoint}/candidate?eventId=${data.eventId}&artistId=${data.artistId}`, {
            method: "POST",
            body: JSON.stringify(data.postPayload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await postRes.json()
        toast('Candidatura effettuata con successo', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    } catch (error) {
        console.log(error)
    }
})

export const getEventById = createAsyncThunk('eventById/get', async(id)=> {
    try {
        const data = await fetch(`${endpoint}/eventById/${id}`)
        const res = await data.json()
        return res
    } catch (error) {
        console.log(error)
    }
})

export const allArtistCandidatures = createAsyncThunk('candidatures/artistId', async(id)=> {
    try {
        const data = await fetch(`${endpoint}/artistCandidature/${id}`)
        const res = await data.json()
        return res
    } catch (error) {
        console.log(error)
    }
})

export const removeCandidature = createAsyncThunk('candidature/remove', async(allData) =>{
    try {
        const res = await fetch(`${endpoint}/removeCandidature/${allData.event}/${allData.candidature}`, {
        method: "DELETE"    
        })
        const data = await res.json()
        toast('Candidatura rimossa', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    } catch (error) {
        console.log(error)
    }
})
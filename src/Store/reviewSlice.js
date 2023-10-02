import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/review`

const initialState = {
    res: {},
}

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postReview.fulfilled, (action, sate) => {

            })
    }
})

export default reviewSlice.reducer;

export const postReview = createAsyncThunk('review/post', async (allData) => {
    console.log(allData)
    const data = await fetch(`${endpoint}/${allData.dest}`, {
        method: "POST",
        body: JSON.stringify(allData.postPayload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const res = await data.json()
})